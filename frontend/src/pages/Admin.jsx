import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import {
  IconShield,
  IconUpload,
  IconFileText,
  IconCheck,
  IndianFlag,
  IconSchemes,
  IconExternalLink,
} from "../components/Icons";

export default function Admin() {
  const { isLoggedIn, isAdmin } = useAuth();
  const fileInputRef = useRef(null);

  const [pdfFile, setPdfFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [schemes, setSchemes] = useState([]);
  const [loadingSchemes, setLoadingSchemes] = useState(true);

  const MAX_SIZE = 10 * 1024 * 1024; // 10 MB

  const fetchSchemes = async () => {
    try {
      const res = await api.get("/api/schemes/");
      setSchemes(res.data || []);
    } catch {
      // Ignore background scheme list error
    } finally {
      setLoadingSchemes(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && isAdmin) {
      fetchSchemes();
    }
  }, [isLoggedIn, isAdmin]);

  const validateFile = (file) => {
    setError("");
    setMessage("");
    if (!file) return false;
    if (file.type !== "application/pdf") {
      setError("Only official PDF policy documents are allowed.");
      return false;
    }
    if (file.size > MAX_SIZE) {
      setError("PDF document size must be under 10 MB.");
      return false;
    }
    return true;
  };

  const selectFile = (file) => {
    if (validateFile(file)) setPdfFile(file);
  };

  const handleFileChange = (e) => selectFile(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    selectFile(e.dataTransfer.files?.[0]);
  };

  const removeFile = () => {
    setPdfFile(null);
    setMessage("");
    setError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!pdfFile || uploading) {
      setError("Please select a PDF file first.");
      return;
    }
    setError("");
    setMessage("Analyzing document structure, extracting text chunks & generating embeddings...");
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", pdfFile);
      const { data } = await api.post("/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setMessage(
        `Document "${data.filename}" successfully indexed! Processed ${data.pages_extracted} pages into ${data.chunks_indexed} vector embeddings for citizen search.`
      );
      setPdfFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchSchemes();
    } catch (err) {
      if (err.response?.status === 403) {
        setError("Admin privileges required to upload and index official schemes.");
      } else if (err.response?.status === 401) {
        setError("Your session expired. Please sign in again.");
      } else {
        setError(err.response?.data?.detail || "Failed to process PDF document. Please verify the file and retry.");
      }
      setMessage("");
    } finally {
      setUploading(false);
    }
  };

  // --- Access gate ---
  if (!isLoggedIn) {
    return (
      <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem", textAlign: "center", maxWidth: 520 }}>
        <div className="card" style={{ padding: "3rem 2rem" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#EEF2FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <IconShield size={28} color="#2563EB" />
          </div>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem", color: "#0F172A" }}>
            Admin Authentication Required
          </h2>
          <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
            You need to be logged into an authorized government administrator account to access document ingestion and indexing controls.
          </p>
          <Link to="/login" className="btn-primary" style={{ width: "100%", padding: "0.75rem" }}>
            Sign In to Admin Portal
          </Link>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="container" style={{ paddingTop: "5rem", paddingBottom: "5rem", textAlign: "center", maxWidth: 520 }}>
        <div className="card" style={{ padding: "3rem 2rem", border: "1px solid #FECACA" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "#FEF2F2",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1.5rem",
            }}
          >
            <IconShield size={28} color="#DC2626" />
          </div>
          <h2 style={{ fontSize: "1.6rem", marginBottom: "0.5rem", color: "#991B1B" }}>
            Access Restricted
          </h2>
          <p style={{ color: "#64748B", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
            This portal is restricted to authorized ministry and nodal administrative officers. Your citizen profile does not have administrative rights.
          </p>
          <Link to="/" className="btn-secondary" style={{ width: "100%", padding: "0.75rem" }}>
            Return to Citizen Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ paddingTop: "2.5rem", paddingBottom: "4rem", maxWidth: "980px" }}>
      {/* Top Header Banner */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.35rem" }}>
            <IndianFlag width={20} height={14} />
            <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#1E3A8A", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Official Administration Console
            </span>
          </div>
          <h1 style={{ fontSize: "1.9rem", color: "#0F172A", fontWeight: 800 }}>
            Scheme Ingestion &amp; RAG Vector Hub
          </h1>
          <p style={{ color: "#64748B", fontSize: "0.95rem", marginTop: "0.25rem" }}>
            Upload government gazettes and policy PDFs to automatically chunk, embed, and index them into Qdrant for real-time citizen RAG queries.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <span
            style={{
              padding: "0.35rem 0.8rem",
              borderRadius: "999px",
              background: "#ECFDF5",
              color: "#065F46",
              border: "1px solid #A7F3D0",
              fontSize: "0.8rem",
              fontWeight: 700,
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
            }}
          >
            <span style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#10B981" }} />
            Qdrant Vector DB Active
          </span>
        </div>
      </div>

      {/* Grid: Upload Box + System Overview */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.75rem", marginBottom: "2.5rem" }}>
        
        {/* Document Upload Card */}
        <div className="card" style={{ padding: "2rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <IconUpload size={20} color="#2563EB" />
            </div>
            <div>
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0F172A", margin: 0 }}>
                Upload Scheme Document
              </h2>
              <span style={{ fontSize: "0.78rem", color: "#64748B" }}>PDF guidelines, gazettes &amp; eligibility rules</span>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf,.pdf"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          {!pdfFile ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              style={{
                border: "2px dashed",
                borderColor: isDragging ? "#2563EB" : "#CBD5E1",
                borderRadius: "14px",
                padding: "2.5rem 1.5rem",
                textAlign: "center",
                background: isDragging ? "#EFF6FF" : "#F8FAFC",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "12px",
                  background: "#FFFFFF",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1rem",
                }}
              >
                <IconUpload size={24} color="#3B82F6" />
              </div>
              <p style={{ margin: "0 0 0.35rem", fontWeight: 700, color: "#1E293B", fontSize: "0.95rem" }}>
                Click to browse or drop official PDF here
              </p>
              <p style={{ margin: 0, color: "#64748B", fontSize: "0.82rem" }}>
                Single PDF file • Maximum 10 MB
              </p>
            </div>
          ) : (
            <div
              style={{
                border: "1px solid #BFDBFE",
                background: "#EFF6FF",
                borderRadius: "12px",
                padding: "1.2rem 1.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#DBEAFE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <IconFileText size={22} color="#1D4ED8" />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 700, color: "#1E3A8A", fontSize: "0.92rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {pdfFile.name}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: "#3B82F6", marginTop: "2px" }}>
                      {(pdfFile.size / 1024 / 1024).toFixed(2)} MB • Ready to Index
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#DC2626",
                    fontWeight: 600,
                    fontSize: "0.82rem",
                    cursor: "pointer",
                    padding: "0.3rem 0.6rem",
                    borderRadius: "6px",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.background = "#FEE2E2")}
                  onMouseOut={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  Remove
                </button>
              </div>

              <button
                type="button"
                onClick={handleUpload}
                disabled={uploading}
                className="btn-primary"
                style={{
                  width: "100%",
                  marginTop: "1.2rem",
                  padding: "0.75rem",
                  opacity: uploading ? 0.75 : 1,
                  cursor: uploading ? "not-allowed" : "pointer",
                }}
              >
                {uploading ? (
                  <span>Embedding &amp; Indexing into Vector Store...</span>
                ) : (
                  <span>Ingest &amp; Index Document</span>
                )}
              </button>
            </div>
          )}

          {message && (
            <div
              style={{
                marginTop: "1.2rem",
                padding: "0.9rem 1rem",
                borderRadius: "10px",
                background: "#ECFDF5",
                border: "1px solid #A7F3D0",
                color: "#065F46",
                fontSize: "0.88rem",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.5rem",
              }}
            >
              <IconCheck size={18} color="#059669" />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div
              style={{
                marginTop: "1.2rem",
                padding: "0.9rem 1rem",
                borderRadius: "10px",
                background: "#FEF2F2",
                border: "1px solid #FECACA",
                color: "#B91C1C",
                fontSize: "0.88rem",
              }}
            >
              ✕ {error}
            </div>
          )}
        </div>

        {/* Indexing Guidelines & Stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          
          <div className="card" style={{ padding: "1.75rem" }}>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#0F172A", marginBottom: "0.85rem" }}>
              Ingestion Architecture
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.88rem", color: "#475569" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <span style={{ color: "#2563EB", fontWeight: 700 }}>1.</span>
                <span><strong>PyMuPDF</strong> extracts full textual content and structural page-level metadata.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <span style={{ color: "#2563EB", fontWeight: 700 }}>2.</span>
                <span><strong>Chunker</strong> creates semantic passages (700 characters with 100 character overlap).</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <span style={{ color: "#2563EB", fontWeight: 700 }}>3.</span>
                <span><strong>Gemini / Local Embeddings</strong> produces 768-dimensional dense vectors.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.6rem" }}>
                <span style={{ color: "#2563EB", fontWeight: 700 }}>4.</span>
                <span><strong>Qdrant Vector DB</strong> indexes chunks with Cosine similarity for real-time citations.</span>
              </li>
            </ul>
          </div>

          <div className="card" style={{ padding: "1.5rem", background: "linear-gradient(135deg, #1E3A8A 0%, #0F172A 100%)", color: "#FFFFFF" }}>
            <div style={{ fontSize: "0.8rem", color: "#93C5FD", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Active Database Registry
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, margin: "0.35rem 0", color: "#FFFFFF" }}>
              {schemes.length} Schemes
            </div>
            <p style={{ fontSize: "0.85rem", color: "#CBD5E1", lineHeight: 1.5, margin: 0 }}>
              Live welfare initiatives available for multi-lingual citizen inquiries, comparison, and eligibility calculations.
            </p>
          </div>

        </div>

      </div>

      {/* Currently Indexed Schemes Table */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.25rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <div>
            <h2 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0F172A" }}>
              Cataloged Welfare Schemes
            </h2>
            <span style={{ fontSize: "0.82rem", color: "#64748B" }}>
              Active database records linked with retrieval-augmented guidelines
            </span>
          </div>
          <Link to="/explorer" className="btn-secondary btn-sm">
            View in Public Explorer ↗
          </Link>
        </div>

        {loadingSchemes ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "#64748B" }}>Loading scheme registry...</div>
        ) : schemes.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem", color: "#64748B" }}>
            No schemes in database. Use seed script or upload a policy document above.
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #E2E8F0", color: "#475569" }}>
                  <th style={{ padding: "0.75rem 0.5rem", fontWeight: 700 }}>ID</th>
                  <th style={{ padding: "0.75rem 0.75rem", fontWeight: 700 }}>Scheme Name</th>
                  <th style={{ padding: "0.75rem 0.75rem", fontWeight: 700 }}>Category</th>
                  <th style={{ padding: "0.75rem 0.75rem", fontWeight: 700 }}>Jurisdiction</th>
                  <th style={{ padding: "0.75rem 0.75rem", fontWeight: 700 }}>Official Link</th>
                </tr>
              </thead>
              <tbody>
                {schemes.map((s) => (
                  <tr key={s.id} style={{ borderBottom: "1px solid #F1F5F9" }}>
                    <td style={{ padding: "0.85rem 0.5rem", color: "#64748B", fontWeight: 600 }}>#{s.id}</td>
                    <td style={{ padding: "0.85rem 0.75rem", fontWeight: 700, color: "#0F172A" }}>
                      <Link to={`/schemes/${s.id}`} style={{ color: "#1D4ED8", textDecoration: "none" }}>
                        {s.scheme_name}
                      </Link>
                    </td>
                    <td style={{ padding: "0.85rem 0.75rem" }}>
                      <span className={`badge badge-${s.category || "all"}`}>{s.category}</span>
                    </td>
                    <td style={{ padding: "0.85rem 0.75rem", color: "#475569" }}>{s.state || "All India"}</td>
                    <td style={{ padding: "0.85rem 0.75rem" }}>
                      {s.official_url ? (
                        <a
                          href={s.official_url}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "#2563EB", display: "inline-flex", alignItems: "center", gap: "3px" }}
                        >
                          <span>Portal</span>
                          <IconExternalLink size={13} />
                        </a>
                      ) : (
                        <span style={{ color: "#94A3B8" }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

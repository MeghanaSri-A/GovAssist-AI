import { useState } from "react";
import api from "../services/api";

export default function Admin() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setStatus("Uploading and indexing...");
    const formData = new FormData();
    formData.append("file", file);
    try {
      const { data } = await api.post("/api/upload/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatus(`Indexed "${data.filename}": ${data.pages_extracted} pages, ${data.chunks_indexed} chunks.`);
    } catch (err) {
      setStatus(err?.response?.data?.detail || "Upload failed. Admin access required.");
    }
  };

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem", maxWidth: 600 }}>
      <h2>Admin Dashboard</h2>
      <div className="card">
        <h3>Upload Scheme PDF</h3>
        <form onSubmit={handleUpload} style={{ display: "flex", gap: "0.5rem" }}>
          <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit" className="btn-primary">
            Upload & Index
          </button>
        </form>
        {status && <p style={{ marginTop: "0.75rem", color: "var(--color-muted)" }}>{status}</p>}
      </div>
    </div>
  );
}

export default function LoadingAnimation({ label = "Thinking..." }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.75rem",
        color: "#475569",
        fontSize: "0.9rem",
        fontWeight: 500,
        padding: "0.4rem 0.2rem",
      }}
    >
      <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
        <span className="ga-dot ga-dot-1" />
        <span className="ga-dot ga-dot-2" />
        <span className="ga-dot ga-dot-3" />
      </div>
      <span>{label}</span>

      <style>{`
        .ga-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2541B2;
          display: inline-block;
          animation: gaBounce 1.4s infinite ease-in-out both;
        }
        .ga-dot-1 { animation-delay: -0.32s; }
        .ga-dot-2 { animation-delay: -0.16s; }
        .ga-dot-3 { animation-delay: 0s; }

        @keyframes gaBounce {
          0%, 80%, 100% {
            transform: scale(0.6);
            opacity: 0.4;
          }
          40% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

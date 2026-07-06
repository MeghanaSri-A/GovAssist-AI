export default function LoadingAnimation({ label = "Thinking..." }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-muted)" }}>
      <span className="dot-pulse" />
      {label}
      <style>{`
        .dot-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--color-primary);
          animation: pulse 1s infinite ease-in-out;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}

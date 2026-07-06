export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--color-border)", marginTop: "3rem" }}>
      <div className="container" style={{ padding: "1.5rem", color: "var(--color-muted)", fontSize: "0.9rem" }}>
        © {new Date().getFullYear()} GovAssist AI — Find, Compare & Understand Government Schemes with AI.
      </div>
    </footer>
  );
}

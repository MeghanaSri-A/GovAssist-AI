export default function CitationCard({ source }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.4rem",
        fontSize: "0.8rem",
        background: "#EFF6FF",
        color: "var(--color-primary)",
        padding: "0.3rem 0.6rem",
        borderRadius: 8,
        marginRight: "0.4rem",
        marginTop: "0.4rem",
      }}
      title={source.snippet}
    >
      📄 {source.pdf_name} · p.{source.page}
    </div>
  );
}

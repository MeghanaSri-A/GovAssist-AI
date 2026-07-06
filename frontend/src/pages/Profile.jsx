import { useEffect, useState } from "react";
import { getChatHistory } from "../services/rag";

export default function Profile() {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    getChatHistory().then(setChats).catch(() => setChats([]));
  }, []);

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "3rem", maxWidth: 700 }}>
      <h2>Profile</h2>
      <h3>Recent Searches</h3>
      {chats.length === 0 && <p style={{ color: "var(--color-muted)" }}>No chat history yet.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        {chats.map((c) => (
          <div key={c.id} className="card">
            <strong>{c.question}</strong>
            <p style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>{c.answer.slice(0, 200)}...</p>
          </div>
        ))}
      </div>
    </div>
  );
}

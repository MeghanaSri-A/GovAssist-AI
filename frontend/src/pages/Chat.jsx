import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";
import { askQuestion } from "../services/rag";
import { useAuth } from "../context/AuthContext";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const hasSentInitial = useRef(false);

  const sendMessage = async (text) => {
    const userMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    try {
      const history = messages
        .filter((m) => m.role === "user")
        .map((m, i) => ({ question: m.content, answer: messages[i * 2 + 1]?.content || "" }));
      const result = await askQuestion(text, history);
      setMessages((prev) => [...prev, { role: "assistant", content: result.answer, sources: result.sources }]);
    } catch (err) {
      const msg = err?.response?.status === 401
        ? "Please log in to chat with GovAssist AI."
        : "Something went wrong. Please try again.";
      setMessages((prev) => [...prev, { role: "assistant", content: msg }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (location.state?.initialQuestion && !hasSentInitial.current) {
      hasSentInitial.current = true;
      sendMessage(location.state.initialQuestion);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return (
    <div className="container" style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 140px)", paddingTop: "1.5rem" }}>
      <h2 style={{ marginBottom: "0.5rem" }}>AI Chat</h2>
      {!isLoggedIn && (
        <p style={{ color: "var(--color-accent)", fontSize: "0.9rem" }}>
          You can preview the chat, but you'll need to log in to send messages.
        </p>
      )}
      <div className="card" style={{ flex: 1, display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}>
        <ChatBox messages={messages} isLoading={isLoading} />
        <ChatInput onSend={sendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

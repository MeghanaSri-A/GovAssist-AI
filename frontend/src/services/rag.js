import api from "./api";

export async function askQuestion(question, chatHistory = []) {
  const { data } = await api.post("/api/chat/", { question, chat_history: chatHistory });
  return data; // { answer, sources }
}

export async function getChatHistory() {
  const { data } = await api.get("/api/chat/history");
  return data;
}

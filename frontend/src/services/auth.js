import api from "./api";

export async function register(name, email, password) {
  const { data } = await api.post("/api/auth/register", { name, email, password });
  return data;
}

export async function login(email, password) {
  const { data } = await api.post("/api/auth/login", { email, password });
  localStorage.setItem("govassist_token", data.access_token);
  return data;
}

export function logout() {
  localStorage.removeItem("govassist_token");
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem("govassist_token"));
}

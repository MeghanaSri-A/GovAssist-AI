import { createContext, useContext, useState } from "react";
import * as authService from "../services/auth";

const AuthContext = createContext(null);

// Decodes a JWT payload without any extra library (base64url -> JSON)
function decodeToken(token) {
  try {
    const payload = token.split(".")[1];
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + c.charCodeAt(0).toString(16).padStart(2, "0"))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function getUserFromStorage() {
  const token = localStorage.getItem("govassist_token");
  if (!token) return null;
  return decodeToken(token);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUserFromStorage());

  const isLoggedIn = Boolean(user);
  const isAdmin = Boolean(user?.is_admin);

  const login = async (email, password) => {
    await authService.login(email, password);
    setUser(getUserFromStorage());
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

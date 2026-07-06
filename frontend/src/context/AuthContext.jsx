import { createContext, useContext, useState } from "react";
import * as authService from "../services/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(authService.isAuthenticated());

  const login = async (email, password) => {
    await authService.login(email, password);
    setIsLoggedIn(true);
  };

  const logout = () => {
    authService.logout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

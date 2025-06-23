import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("jwt") || null);
  const [sellerId, setSellerId] = useState(localStorage.getItem("sellerId") || null);
  

  const login = (newToken, newSellerId) => {
    setToken(newToken);
    setSellerId(newSellerId);
    localStorage.setItem("jwt", newToken);
    localStorage.setItem("sellerId", newSellerId);
  };

  const logout = () => {
    setToken(null);
    setSellerId(null);
    localStorage.removeItem("jwt");
    localStorage.removeItem("sellerId");
  };

  const isLoggedIn = !!token;

  return (
    <AuthContext.Provider value={{ token, sellerId, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
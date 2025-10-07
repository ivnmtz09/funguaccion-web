import { createContext, useEffect, useState } from "react";
import api, { getAccessToken, getRefreshToken, saveTokens, clearTokens } from "../utils/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================================================
  // Cargar usuario desde localStorage
  // =========================================================
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // =========================================================
  // Login con email y password
  // =========================================================
  const login = async (email, password) => {
    try {
      const { data } = await api.post("/users/login/", { email, password });
      saveTokens(data.access, data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Error en login:", error);
      return { success: false, message: "Credenciales inválidas o error del servidor." };
    }
  };

  // =========================================================
  // Login con Google (desde Allauth backend)
  // =========================================================
  const loginWithGoogle = async (accessToken) => {
    try {
      const { data } = await api.post("/users/google/login/", {
        access_token: accessToken,
      });
      saveTokens(data.access, data.refresh);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      return { success: true };
    } catch (error) {
      console.error("Error en login con Google:", error);
      return { success: false, message: "No se pudo iniciar sesión con Google." };
    }
  };

  // =========================================================
  // Logout
  // =========================================================
  const logout = async () => {
    try {
      const refresh = getRefreshToken();
      if (refresh) await api.post("/users/logout/", { refresh });
    } catch (err) {
      console.warn("Error cerrando sesión:", err);
    } finally {
      clearTokens();
      localStorage.removeItem("user");
      setUser(null);
    }
  };

  // =========================================================
  // Auto refresh de token cada 25 minutos (si el user está activo)
  // =========================================================
  useEffect(() => {
    const interval = setInterval(async () => {
      const refresh = getRefreshToken();
      if (refresh) {
        try {
          const { data } = await api.post("/users/token/refresh/", { refresh });
          saveTokens(data.access, refresh);
        } catch {
          console.warn("No se pudo refrescar el token.");
          logout();
        }
      }
    }, 25 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const value = {
    user,
    loading,
    login,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user,
    role: user?.role?.name || "visitante",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

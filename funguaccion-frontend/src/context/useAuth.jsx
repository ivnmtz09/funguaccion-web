"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

// Crear contexto
const AuthContext = createContext();

// Proveedor
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  // Inicialización del estado de autenticación
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("AuthContext: Iniciando inicialización...");
      const token = localStorage.getItem("access");

      if (!token) {
        console.log("AuthContext: No hay token de acceso. Usuario no autenticado.");
        setUser(null);
        setLoading(false);
        setIsInitialized(true);
        return;
      }

      try {
        const res = await api.get("/users/me/");
        setUser(res.data);
        console.log("AuthContext: Usuario autenticado:", res.data);
      } catch (err) {
        console.error("Error al obtener usuario:", err);
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setUser(null);
      } finally {
        setLoading(false);
        setIsInitialized(true);
      }
    };

    initializeAuth();
  }, []);

  // === LOGIN ===
  const login = async (credentials) => {
    try {
      const res = await api.post("/users/login/", credentials);
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);

      const userRes = await api.get("/users/me/");
      setUser(userRes.data);

      return { success: true, user: userRes.data };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error: error.response?.data?.detail || "Error al iniciar sesión",
      };
    }
  };

  // === REGISTER ===
  const register = async (data) => {
    try {
      const res = await api.post("/users/register/", data);

      // Si el backend devuelve los tokens al registrarse:
      if (res.data.access && res.data.refresh) {
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        const userRes = await api.get("/users/me/");
        setUser(userRes.data);

        return { success: true, user: userRes.data };
      }

      // Si el backend solo crea el usuario (sin tokens)
      return { success: true };
    } catch (error) {
      console.error("Error al registrar:", error);
      return {
        success: false,
        error:
          error.response?.data?.detail ||
          "Error al registrar usuario. Revisa los datos e intenta nuevamente.",
      };
    }
  };

  // === LOGOUT ===
  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refresh");
      if (refresh) {
        await api.post("/users/logout/", { refresh });
      }
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      setUser(null);
    }
  };

  // === UPDATE PROFILE ===
  const updateProfile = async (data) => {
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value);
        }
      });

      const res = await api.put("/users/me/update/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setUser(res.data);
      return { success: true, user: res.data };
    } catch (error) {
      return { success: false, error: "Error al actualizar perfil" };
    }
  };

  // === Verificación rápida de sesión ===
  const isAuthenticated = () =>
    user !== null && localStorage.getItem("access") !== null;

  const value = {
    user,
    setUser,
    login,
    register,
    logout,
    updateProfile,
    loading,
    isInitialized,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

// Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  return context;
}

export default useAuth;

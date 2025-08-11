"use client"

import { createContext, useContext, useState, useEffect } from "react"
import api from "../api"

// Creamos el contexto
const AuthContext = createContext()

// Proveedor del contexto
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)

  // Verificar si hay sesión al cargar la app
  useEffect(() => {
    const initializeAuth = async () => {
      console.log("AuthContext: Iniciando inicialización...")
      const token = localStorage.getItem("access")

      if (!token) {
        console.log("AuthContext: No se encontró token de acceso. Usuario no autenticado.")
        setUser(null)
        setLoading(false)
        setIsInitialized(true) // <-- Se establece a true aquí
        console.log("AuthContext: Inicialización completada (sin token). isInitialized:", true)
        return
      }

      try {
        console.log("AuthContext: Token encontrado, intentando obtener datos del usuario...")
        const res = await api.get("/users/me/")
        setUser(res.data)
        console.log("AuthContext: Datos de usuario obtenidos:", res.data)
      } catch (err) {
        console.error("AuthContext: Error al obtener usuario:", err)
        // Limpiar tokens si la petición falla (ej. token inválido/expirado)
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        setUser(null)
        console.log("AuthContext: Tokens limpiados. Usuario establecido a null.")
      } finally {
        setLoading(false)
        setIsInitialized(true) // <-- Se establece a true aquí también
        console.log("AuthContext: Proceso de inicialización finalizado. isInitialized:", true)
      }
    }

    initializeAuth()
  }, []) // El array vacío asegura que se ejecute solo una vez al montar

  const login = async (credentials) => {
    try {
      const res = await api.post("/users/login/", credentials)
      localStorage.setItem("access", res.data.access)
      localStorage.setItem("refresh", res.data.refresh)
      // Fetch datos completos del usuario después de login
      const access = res.data.access;
      const userRes = await api.get("/users/me/", {
        headers: { Authorization: `Bearer ${access}` }
      });
      setUser(userRes.data)
      return { success: true, user: userRes.data }
    } catch (error) {
      console.error("Login error:", error)
      return {
        success: false,
        error: error.response?.data?.message || "Error al iniciar sesión",
      }
    }
  }

  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refresh")
      if (refresh) {
        await api.post("/users/logout/", { refresh })
      }
    } catch (err) {
      console.error("Logout error:", err)
    } finally {
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      setUser(null)
    }
  }

  const updateProfile = async (data) => {
    try {
      const res = await api.put("/users/me/update/", data)
      setUser(res.data)
      return { success: true, user: res.data }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || "Error al actualizar perfil",
      }
    }
  }

  const isAuthenticated = () => {
    return user !== null && localStorage.getItem("access") !== null
  }

  const value = {
    user,
    login,
    logout,
    updateProfile,
    loading,
    isInitialized,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook para usar el contexto
export default function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

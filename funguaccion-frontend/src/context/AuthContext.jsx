"use client"

import { createContext, useState, useEffect } from "react"
import api from "../api"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Verificar si hay un usuario autenticado al cargar la app
  useEffect(() => {
    const checkAuth = async () => {
      const access = localStorage.getItem("access")
      if (access) {
        try {
          const response = await api.get("/users/me/")
          setUser(response.data)
          setIsAuthenticated(true)
        } catch (error) {
          console.error("Error verificando autenticación:", error)
          // Si hay error, limpiar tokens
          localStorage.removeItem("access")
          localStorage.removeItem("refresh")
        }
      }
      setLoading(false)
      setIsInitialized(true)
    }

    checkAuth()
  }, [])

  const login = async (email, password) => {
    try {
      const response = await api.post("/users/login/", {
        email,
        password,
      })

      const { access, refresh, user: userData } = response.data

      // Guardar tokens
      localStorage.setItem("access", access)
      localStorage.setItem("refresh", refresh)

      // Establecer usuario
      setUser(userData)
      setIsAuthenticated(true)

      return { success: true, data: response.data }
    } catch (error) {
      console.error("Error en login:", error)
      return {
        success: false,
        error: error.response?.data?.detail || "Error al iniciar sesión",
      }
    }
  }

  const register = async (userData) => {
    try {
      const response = await api.post("/users/register/", userData)
      return { success: true, data: response.data }
    } catch (error) {
      console.error("Error en registro:", error)
      return {
        success: false,
        error: error.response?.data || "Error al registrarse",
      }
    }
  }

  const logout = async () => {
    try {
      const refresh = localStorage.getItem("refresh")
      if (refresh) {
        await api.post("/users/logout/", { refresh })
      }
    } catch (error) {
      console.error("Error en logout:", error)
    } finally {
      // Limpiar tokens y usuario
      localStorage.removeItem("access")
      localStorage.removeItem("refresh")
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  const updateProfile = async (profileData) => {
    try {
      const access = localStorage.getItem("access")
      const response = await api.put("/users/me/", profileData, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      setUser(response.data)
      return { success: true, data: response.data }
    } catch (error) {
      console.error("Error en updateProfile:", error)
      return {
        success: false,
        error: error.response?.data?.detail || "Error al actualizar el perfil",
      }
    }
  }

  const value = {
    user,
    setUser,
    login,
    logout,
    updateProfile,
    loading,
    isInitialized,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext

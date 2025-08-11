"use client"

import { Navigate, useLocation } from "react-router-dom"
import useAuth from "../../context/useAuth.jsx" // <--- ¡Ruta corregida aquí!

export default function ProtectedRoute({ children }) {
  const { user, loading, isInitialized } = useAuth()
  const location = useLocation()

  // Mostrar loading mientras se inicializa la autenticación
  if (!isInitialized || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando autenticación...</p>
        </div>
      </div>
    )
  }

  // Si no hay usuario, redirigir a login con la ubicación actual
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Usuario autenticado, mostrar el componente
  return children
}

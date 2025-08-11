"use client"

import logo from "../../assets/logo.png"

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100">
      <div className="text-center">
        <img src={logo || "/placeholder.svg"} alt="Logo Fundación" className="w-32 mx-auto mb-6 animate-float" />
        <div className="loading-spinner mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold gradient-text mb-2">Fundación Guajira en Acción</h2>
        <p className="text-gray-600">Cargando aplicación...</p>
      </div>
    </div>
  )
}

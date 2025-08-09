"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, CheckCircle, Shield } from "lucide-react"
import api from "../api"
import logo from "../assets/logo.png"

export default function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      await api.post("users/register/", formData)
      setSuccess(true)
      setTimeout(() => navigate("/login"), 2000)
    } catch (err) {
      setError("Error al registrarse. Verifica que todos los campos estén correctos.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card w-full max-w-md text-center animate-fade-in">
          <div className="mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-900 mb-2">¡Registro Exitoso!</h2>
            <p className="text-gray-600">Tu cuenta ha sido creada correctamente. Serás redirigido al login...</p>
          </div>
          <div className="loading-spinner mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Elementos decorativos */}
      <div className="blob-decoration w-72 h-72 bg-green-300 top-10 -left-20"></div>
      <div className="blob-decoration w-72 h-72 bg-green-200 top-20 -right-20 animation-delay-2000"></div>
      <div className="blob-decoration w-72 h-72 bg-green-100 -bottom-10 left-20 animation-delay-4000"></div>

      <div className="card w-full max-w-lg relative z-10 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-8">
          <img
            src={logo || "/placeholder.svg"}
            alt="Logo Fundación"
            className="w-28 sm:w-32 mx-auto mb-4 animate-float"
          />
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Crear Cuenta</h2>
          <p className="text-gray-600 text-sm">Únete a la Fundación Guajira en Acción</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-slide-up">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nombre</label>
              <input
                name="first_name"
                type="text"
                placeholder="Tu nombre"
                className="input-field"
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Apellido</label>
              <input
                name="last_name"
                type="text"
                placeholder="Tu apellido"
                className="input-field"
                onChange={handleChange}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
            <input
              name="username"
              type="text"
              placeholder="Elige un nombre de usuario"
              className="input-field"
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Correo Electrónico</label>
            <input
              name="email"
              type="email"
              placeholder="tu@email.com"
              className="input-field"
              onChange={handleChange}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contraseña</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Crea una contraseña segura"
                className="input-field pr-16"
                onChange={handleChange}
                required
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle flex items-center space-x-1"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                <span>{showPassword ? "Ocultar" : "Ver"}</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex items-center justify-center space-x-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="loading-spinner"></div>
                <span>Creando cuenta...</span>
              </>
            ) : (
              <span>Registrar</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/login"
              className="text-green-600 hover:text-green-500 font-semibold hover:underline transition-colors duration-200"
            >
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* Indicador de seguridad */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500">
          <Shield size={12} className="text-green-500" />
          <span>Tus datos están protegidos</span>
        </div>
      </div>
    </div>
  )
}

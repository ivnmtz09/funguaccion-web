"use client"

import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Eye, EyeOff, Shield, ArrowLeft } from "lucide-react"
import useAuth from "../context/useAuth.jsx"
import logo from "../assets/logo.png"

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, user, isInitialized } = useAuth()

  const [formData, setFormData] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  // Redirigir si ya está autenticado
  useEffect(() => {
    if (isInitialized && user) {
      const from = location.state?.from?.pathname || "/me"
      navigate(from, { replace: true })
    }
  }, [user, isInitialized, navigate, location])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await login(formData)

      if (result.success) {
        // Redirigir a la página de origen o al perfil
        const from = location.state?.from?.pathname || "/me"
        navigate(from, { replace: true })
      } else {
        setError(result.error || "Usuario o contraseña incorrectos")
      }
    } catch (err) {
      setError("Error de conexión. Intenta nuevamente.")
    } finally {
      setIsLoading(false)
    }
  }

  // No renderizar si ya está autenticado (evita flash)
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Elementos decorativos */}
      <div className="blob-decoration w-72 h-72 bg-green-300 top-10 -left-20"></div>
      <div className="blob-decoration w-72 h-72 bg-green-200 top-20 -right-20 animation-delay-2000"></div>
      <div className="blob-decoration w-72 h-72 bg-green-100 -bottom-10 left-20 animation-delay-4000"></div>

      <div className="card w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo y título mejorados */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block hover:scale-105 transition-transform duration-300">
            <img
              src={logo || "/placeholder.svg"}
              alt="Logo Fundación"
              className="w-32 sm:w-40 mx-auto mb-4 animate-float drop-shadow-lg"
            />
          </Link>
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Bienvenido de Nuevo</h2>
          <p className="text-gray-600 text-sm">Accede a tu cuenta de la Fundación Guajira en Acción</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-slide-up">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Usuario</label>
              <input
                name="username"
                type="text"
                placeholder="Ingresa tu usuario"
                className="input-field"
                value={formData.username}
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
                  placeholder="Ingresa tu contraseña"
                  className="input-field pr-12"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-500 cursor-pointer transition-colors duration-200 p-2 rounded-full hover:bg-green-50"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
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
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <span>Entrar</span>
            )}
          </button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-green-600 hover:text-green-500 font-semibold hover:underline transition-colors duration-200"
            >
              Regístrate aquí
            </Link>
          </p>

          <div className="pt-4 border-t border-gray-200">
            <Link
              to="/"
              className="text-green-700 hover:text-green-600 font-medium text-sm hover:underline transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explorar la fundación sin registrarse</span>
            </Link>
          </div>
        </div>

        {/* Indicador de seguridad */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500">
          <Shield size={12} className="text-green-500" />
          <span>Conexión segura</span>
        </div>
      </div>
    </div>
  )
}

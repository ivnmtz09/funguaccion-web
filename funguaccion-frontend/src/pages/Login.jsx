"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Shield } from "lucide-react"
import api from "../api"
import useAuth from "../context/useAuth"
import logo from "../assets/logo.png"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [formData, setFormData] = useState({ username: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError("")
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const res = await api.post("users/login/", formData)
      login(res.data)
      navigate("/me")
    } catch {
      setError("Usuario o contraseña incorrectos")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
      {/* Elementos decorativos */}
      <div className="blob-decoration w-72 h-72 bg-green-300 top-10 -left-20"></div>
      <div className="blob-decoration w-72 h-72 bg-green-200 top-20 -right-20 animation-delay-2000"></div>
      <div className="blob-decoration w-72 h-72 bg-green-100 -bottom-10 left-20 animation-delay-4000"></div>

      <div className="card w-full max-w-md relative z-10 animate-fade-in">
        {/* Logo con animación */}
        <div className="text-center mb-8">
          <img
            src={logo || "/placeholder.svg"}
            alt="Logo Fundación"
            className="w-32 sm:w-40 mx-auto mb-4 animate-float"
          />
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Iniciar Sesión</h2>
          <p className="text-gray-600 text-sm">Accede a tu cuenta de la Fundación</p>
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
                  className="input-field pr-16"
                  value={formData.password}
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

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-green-600 hover:text-green-500 font-semibold hover:underline transition-colors duration-200"
            >
              Regístrate aquí
            </Link>
          </p>
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

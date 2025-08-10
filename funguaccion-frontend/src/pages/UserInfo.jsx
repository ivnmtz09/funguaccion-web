"use client"

import { useNavigate } from "react-router-dom"
import { LogOut, User, UserCheck, AlertTriangle, Home, Edit } from "lucide-react"
import useAuth from "../context/useAuth"
import logo from "../assets/logo.png"

export default function UserInfo() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 py-8">
      {/* Elementos decorativos */}
      <div className="blob-decoration w-72 h-72 bg-green-200 top-10 -left-20"></div>
      <div className="blob-decoration w-72 h-72 bg-green-100 top-20 -right-20 animation-delay-2000"></div>
      <div className="blob-decoration w-72 h-72 bg-green-300 -bottom-10 left-20 animation-delay-4000"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="card animate-fade-in">
          {/* Header mejorado */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <img
                src={logo || "/placeholder.svg"}
                alt="Logo Fundación"
                className="w-16 h-16 object-contain animate-float"
              />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold gradient-text">Perfil del Usuario</h1>
                <p className="text-gray-600 text-sm mt-1">Información personal y roles asignados</p>
              </div>
            </div>
            <button onClick={handleLogout} className="btn-danger flex items-center space-x-2">
              <LogOut size={16} />
              <span>Cerrar sesión</span>
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Datos Personales */}
            <div className="space-y-6">
              <div>
                <h2 className="font-semibold text-xl text-green-800 mb-4 flex items-center space-x-2">
                  <User size={20} />
                  <span>Datos Personales</span>
                </h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="text-sm font-medium text-gray-600">Nombre completo</label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">
                      {user.first_name} {user.last_name}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="text-sm font-medium text-gray-600">Usuario</label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{user.username}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <label className="text-sm font-medium text-gray-600">Correo electrónico</label>
                    <p className="text-lg font-semibold text-gray-900 mt-1">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Roles */}
            <div className="space-y-6">
              <div>
                <h2 className="font-semibold text-xl text-green-800 mb-4 flex items-center space-x-2">
                  <UserCheck size={20} />
                  <span>Roles Asignados</span>
                </h2>
                {user.roles?.length > 0 ? (
                  <div className="space-y-3">
                    {user.roles.map((rol, index) => (
                      <div key={index} className="role-badge">
                        <div className="flex items-start space-x-3">
                          <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-green-900 text-lg">{rol.title}</h3>
                            <p className="text-gray-700 mt-1">{rol.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertTriangle className="w-8 h-8 text-yellow-600" />
                    </div>
                    <p className="text-yellow-700 font-medium">Este usuario no tiene roles asignados</p>
                    <p className="text-yellow-600 text-sm mt-1">Contacta al administrador para obtener permisos</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Acciones adicionales */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => navigate("/")} className="btn-primary flex items-center justify-center space-x-2">
                <Home size={16} />
                <span>Ir al inicio</span>
              </button>
              <button
                onClick={() => navigate("/edit-profile")}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <Edit size={16} />
                <span>Editar perfil</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

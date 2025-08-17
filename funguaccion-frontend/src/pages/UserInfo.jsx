"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, User, UserCheck, AlertTriangle, Home, Edit, Phone, MapPin, BookOpen, Heart } from "lucide-react"
import useAuth from "../context/useAuth.jsx"
import Navigation from "../components/Navigation.jsx"
import { API_BASE } from "../api.js"
import { hasRole } from "../utils/roles.js"
import DashboardCard from "../components/DashboardCard.jsx"
import Avatar from "../components/Avatar.jsx"


export default function UserInfo() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [imgError, setImgError] = useState(false);

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

const avatarUrl = user?.profile_image
  ? (user.profile_image.startsWith("http")
      ? user.profile_image
      : `${API_BASE}${user.profile_image}`)
  : null;

const showAvatarImage = Boolean(avatarUrl && !imgError);

  // Si el usuario no está cargado o no está autenticado, puedes mostrar un loading o redirigir
  if (!user) {
    // Esto debería ser manejado por ProtectedRoute, pero es una buena práctica defensiva
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
        <p className="ml-4 text-gray-600">Cargando información del usuario...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Navigation currentPage="user-info" />

      <div className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="card animate-fade-in">
            {/* Header mejorado */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 pb-6 border-b border-gray-200">
              <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                <Avatar src={avatarUrl} size={64} className="mr-4" />
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

                    {/* Nuevos campos extra */}
                    {user.telefono && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center space-x-2">
                        <Phone size={16} className="text-gray-500" />
                        <div>
                          <label className="text-sm font-medium text-gray-600">Teléfono</label>
                          <p className="text-lg font-semibold text-gray-900 mt-1">{user.telefono}</p>
                        </div>
                      </div>
                    )}
                    {user.ubicacion && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center space-x-2">
                        <MapPin size={16} className="text-gray-500" />
                        <div>
                          <label className="text-sm font-medium text-gray-600">Ubicación</label>
                          <p className="text-lg font-semibold text-gray-900 mt-1">{user.ubicacion}</p>
                        </div>
                      </div>
                    )}
                    {user.biografia && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center space-x-2">
                        <BookOpen size={16} className="text-gray-500" />
                        <div>
                          <label className="text-sm font-medium text-gray-600">Biografía</label>
                          <p className="text-lg font-semibold text-gray-900 mt-1">{user.biografia}</p>
                        </div>
                      </div>
                    )}
                    {user.intereses && (
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center space-x-2">
                        <Heart size={16} className="text-gray-500" />
                        <div>
                          <label className="text-sm font-medium text-gray-600">Intereses</label>
                          <p className="text-lg font-semibold text-gray-900 mt-1">{user.intereses}</p>
                        </div>
                      </div>
                    )}
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

                <div className="mt-8 grid md:grid-cols-1 gap-6">

                  {hasRole(user, "admin") && (
                    <DashboardCard
                      title="Panel de Administrador"
                      description="Gestiona usuarios, roles y contenido."
                      color="red"
                      actions={[
                        { label: "Ir al Panel", primary: true, onClick: () => navigate("/admin-dashboard") },
                        { label: "Ver Posts", onClick: () => navigate("/posts") }
                      ]}
                    />
                  )}

                  {hasRole(user, "editor") && (
                    <DashboardCard
                      title="Panel de Editor"
                      description="Crea y publica Noticias, Blogs y Eventos."
                      color="blue"
                      actions={[
                        { label: "Crear contenido", primary: true, onClick: () => navigate("/posts/create") },
                        { label: "Ver publicaciones", onClick: () => navigate("/posts") }
                      ]}
                    />
                  )}

                  {hasRole(user, "colaborador") && (
                    <DashboardCard
                      title="Área de Colaborador"
                      description="Propón borradores y sube documentos."
                      color="green"
                      actions={[
                        { label: "Crear borrador", primary: true, onClick: () => navigate("/posts/create") },
                        { label: "Subir documento", onClick: () => navigate("/documents/upload") }
                      ]}
                    />
                  )}

                  {hasRole(user, "voluntario") && (
                    <DashboardCard
                      title="Zona de Voluntariado"
                      description="Calendario y materiales internos."
                      color="emerald"
                      actions={[
                        { label: "Ver calendario", primary: true, onClick: () => navigate("/volunteer") }
                      ]}
                    />
                  )}

                  {hasRole(user, "visitante") && (
                    <DashboardCard
                      title="Visitante"
                      description="Explora el contenido público."
                      color="yellow"
                      actions={[
                        { label: "Zona de Visitante", primary: true, onClick: () => navigate("/visitante-dashboard") }
                      ]}
                    />
                  )}

                </div>

                </div>
              </div>
            </div>

            {/* Acciones adicionales */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="btn-primary flex items-center justify-center space-x-2"
                >
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
    </div>
  )
}

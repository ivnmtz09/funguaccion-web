"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Users, Target, Mail, Menu, X, LogOut, Settings, Bell, User, Shield, FileText, Lightbulb } from "lucide-react"
import useAuth from "../context/useAuth.jsx"
import logo from "../assets/logo.png"

export default function Navigation({ currentPage = "" }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  // Cerrar menú móvil al cambiar el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [mobileMenuOpen])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    closeMobileMenu()
  }

  // Definir las páginas de navegación
  const navigationPages = [
    { name: "inicio", path: "/", label: "Inicio", icon: <div className="w-2 h-2 bg-green-600 rounded-full"></div> },
    { name: "nosotros", path: "/nosotros", label: "Nosotros", icon: <Users className="w-4 h-4 text-green-600" /> },
    { name: "programas", path: "/programas", label: "Programas", icon: <Target className="w-4 h-4 text-green-600" /> },
    { name: "posts", path: "/posts", label: "Noticias", icon: <div className="w-2 h-2 bg-blue-600 rounded-full"></div> },
    { name: "contacto", path: "/contacto", label: "Contacto", icon: <Mail className="w-4 h-4 text-green-600" /> },
  ]

  // Filtrar páginas para no mostrar la página actual
  const filteredPages = navigationPages.filter((page) => page.name !== currentPage)

  return (
    <header className="glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo mejorado - siempre a la izquierda */}
          <Link to="/" className="flex items-center space-x-3 animate-fade-in" onClick={closeMobileMenu}>
            <img
              src={logo || "/placeholder.svg"}
              alt="Logo Fundación"
              className="h-10 sm:h-12 object-contain hover:scale-105 transition-transform duration-300"
            />
            <div className="hidden sm:block">
              <span className="font-bold gradient-text text-lg sm:text-xl">Fundación Guajira en Acción</span>
              <p className="text-xs text-gray-600 -mt-1">Transformando vidas</p>
            </div>
          </Link>

          {/* Menú desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {filteredPages.map((page) => (
              <Link key={page.name} to={page.path} className="nav-link">
                {page.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-lg hover:bg-green-50 transition-colors duration-200 relative">
                  <Bell size={20} className="text-green-700" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
                </button>
                <Link to="/me" className="btn-primary flex items-center space-x-2">
                  <User size={16} />
                  <span>Mi Perfil</span>
                </Link>
              </div>
            ) : (
              <Link to="/login" className="btn-primary">
                Ingresar / Registrarse
              </Link>
            )}
          </nav>

          {/* Botón menú móvil mejorado */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-green-50 transition-all duration-200 relative z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            <div className="w-6 h-6 flex items-center justify-center">
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-green-800 transition-transform duration-300" />
              ) : (
                <Menu className="w-6 h-6 text-green-800 transition-transform duration-300" />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Menú móvil optimizado */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          mobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Overlay completamente opaco */}
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-label="Cerrar menú"
        ></div>

        {/* Contenido del menú con fondo completamente opaco */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Header del menú móvil con fondo sólido */}
          <div className="p-6 border-b border-gray-200 bg-white relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src={logo || "/placeholder.svg"} alt="Logo" className="h-10 object-contain" />
                <div>
                  <h3 className="font-bold text-green-900 text-sm">Fundación Guajira</h3>
                  <p className="text-xs text-green-700">en Acción</p>
                </div>
              </div>
              {/* Botón de cierre mejorado */}
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
                aria-label="Cerrar menú"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Información del usuario con fondo sólido */}
          {user && (
            <div className="p-6 border-b border-gray-200 bg-white">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  to="/me"
                  className="flex-1 bg-green-600 text-white text-center py-2 px-3 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors duration-200"
                  onClick={closeMobileMenu}
                >
                  Ver Perfil
                </Link>
                <button className="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors duration-200 relative">
                  <Bell size={16} className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </div>
          )}

          {/* Enlaces de navegación con fondo sólido */}
          <div className="flex-1 overflow-y-auto bg-white">
            <nav className="p-6 space-y-2">
              {filteredPages.map((page) => (
                <Link
                  key={page.name}
                  to={page.path}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 text-gray-700 hover:text-green-700"
                  onClick={closeMobileMenu}
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">{page.icon}</div>
                  <span className="font-medium">{page.label}</span>
                </Link>
              ))}

                             {user && (
                 <>
                   <div className="border-t border-gray-200 my-4"></div>
                   {user.roles && user.roles.some(role => role.name === "admin") && (
                     <Link
                       to="/admin-dashboard"
                       className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 text-gray-700 hover:text-green-700"
                       onClick={closeMobileMenu}
                     >
                       <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                         <Shield className="w-4 h-4 text-red-600" />
                       </div>
                       <span className="font-medium">Admin Dashboard</span>
                     </Link>
                   )}
                   {user.roles && user.roles.some(role => role.name === "editor") && (
                     <Link
                       to="/editor-dashboard"
                       className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 text-gray-700 hover:text-green-700"
                       onClick={closeMobileMenu}
                     >
                       <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                         <FileText className="w-4 h-4 text-blue-600" />
                       </div>
                       <span className="font-medium">Editor Dashboard</span>
                     </Link>
                   )}
                   {user.roles && user.roles.some(role => role.name === "colaborador") && (
                     <Link
                       to="/colaborador-dashboard"
                       className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 text-gray-700 hover:text-green-700"
                       onClick={closeMobileMenu}
                     >
                       <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                         <Lightbulb className="w-4 h-4 text-orange-600" />
                       </div>
                       <span className="font-medium">Colaborador Dashboard</span>
                     </Link>
                   )}
                   <Link
                     to="/dashboard"
                     className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 text-gray-700 hover:text-green-700"
                     onClick={closeMobileMenu}
                   >
                     <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                       <Settings className="w-4 h-4 text-green-600" />
                     </div>
                     <span className="font-medium">Dashboard</span>
                   </Link>
                 </>
               )}
            </nav>
          </div>

          {/* Footer del menú móvil con fondo sólido */}
          <div className="p-6 border-t border-gray-200 bg-white">
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center space-x-2 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
              >
                <LogOut size={16} />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            ) : (
              <div className="space-y-3">
                <Link
                  to="/login"
                  className="w-full flex items-center justify-center p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                  onClick={closeMobileMenu}
                >
                  Iniciar Sesión
                </Link>
                <Link
                  to="/register"
                  className="w-full flex items-center justify-center p-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors duration-200 font-medium"
                  onClick={closeMobileMenu}
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

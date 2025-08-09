"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Users, Heart, Sprout, User } from "lucide-react"
import useAuth from "../context/useAuth"
import logo from "../assets/logo.png"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="blob-decoration w-96 h-96 bg-green-200 -top-20 -left-20"></div>
      <div className="blob-decoration w-80 h-80 bg-green-100 top-40 -right-20 animation-delay-2000"></div>
      <div className="blob-decoration w-64 h-64 bg-green-300 bottom-20 left-1/4 animation-delay-4000"></div>

      {/* Navbar mejorada */}
      <header className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo mejorado */}
            <div className="flex items-center space-x-3 animate-fade-in">
              <img
                src={logo || "/placeholder.svg"}
                alt="Logo Fundación"
                className="h-10 sm:h-12 object-contain hover:scale-105 transition-transform duration-300"
              />
              <div className="hidden sm:block">
                <span className="font-bold gradient-text text-lg sm:text-xl">Fundación Guajira en Acción</span>
                <p className="text-xs text-gray-600 -mt-1">Transformando vidas</p>
              </div>
            </div>

            {/* Menú desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link">
                Inicio
              </Link>
              <Link to="/nosotros" className="nav-link">
                Nosotros
              </Link>
              <Link to="/programas" className="nav-link">
                Programas
              </Link>
              <Link to="/contacto" className="nav-link">
                Contacto
              </Link>
              {user ? (
                <Link to="/me" className="btn-primary flex items-center space-x-2">
                  <User size={16} />
                  <span>Mi Perfil</span>
                </Link>
              ) : (
                <Link to="/login" className="btn-primary">
                  Ingresar / Registrarse
                </Link>
              )}
            </nav>

            {/* Botón menú móvil */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-green-50 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div
                  className={`w-full h-0.5 bg-green-800 transition-all duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-1" : ""}`}
                ></div>
                <div
                  className={`w-full h-0.5 bg-green-800 transition-all duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`}
                ></div>
                <div
                  className={`w-full h-0.5 bg-green-800 transition-all duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-1" : ""}`}
                ></div>
              </div>
            </button>
          </div>
        </div>

        {/* Menú móvil */}
        {mobileMenuOpen && (
          <div className="mobile-menu" onClick={() => setMobileMenuOpen(false)}>
            <div className="mobile-menu-content" onClick={(e) => e.stopPropagation()}>
              <div className="flex flex-col space-y-4">
                <Link to="/" className="nav-link text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                  Inicio
                </Link>
                <Link to="/nosotros" className="nav-link text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                  Nosotros
                </Link>
                <Link to="/programas" className="nav-link text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                  Programas
                </Link>
                <Link to="/contacto" className="nav-link text-lg py-2" onClick={() => setMobileMenuOpen(false)}>
                  Contacto
                </Link>
                {user ? (
                  <Link
                    to="/me"
                    className="btn-primary text-center flex items-center justify-center space-x-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>Mi Perfil</span>
                  </Link>
                ) : (
                  <Link to="/login" className="btn-primary text-center" onClick={() => setMobileMenuOpen(false)}>
                    Ingresar / Registrarse
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section mejorada */}
      <section className="flex flex-col items-center text-center py-16 sm:py-24 px-6 flex-grow relative z-10">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Trabajando juntos por una <span className="gradient-text">Guajira mejor</span>
          </h1>

          <p className="text-gray-700 max-w-3xl mx-auto mb-8 text-lg sm:text-xl leading-relaxed">
            Nuestra misión es transformar vidas a través de programas sociales, educativos y culturales para el
            bienestar de nuestras comunidades.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link to="/nosotros" className="btn-primary text-lg px-8 py-4">
              Conoce más sobre nosotros
            </Link>
            <Link
              to="/programas"
              className="text-green-700 hover:text-green-600 font-semibold text-lg hover:underline transition-colors duration-200"
            >
              Ver nuestros programas →
            </Link>
          </div>

          {/* Stats section */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16">
            <div className="text-center animate-slide-up">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">500+</div>
              <p className="text-gray-600">Familias beneficiadas</p>
            </div>
            <div className="text-center animate-slide-up animation-delay-2000">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">15</div>
              <p className="text-gray-600">Programas activos</p>
            </div>
            <div className="text-center animate-slide-up animation-delay-4000">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">8</div>
              <p className="text-gray-600">Años de experiencia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de valores */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center gradient-text mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-3">Solidaridad</h3>
              <p className="text-gray-600">Trabajamos unidos por el bienestar de nuestra comunidad.</p>
            </div>
            <div className="card text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-3">Compromiso</h3>
              <p className="text-gray-600">Dedicados a generar un impacto positivo y duradero.</p>
            </div>
            <div className="card text-center hover:scale-105 transition-transform duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-green-900 mb-3">Crecimiento</h3>
              <p className="text-gray-600">Fomentamos el desarrollo integral de las personas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer mejorado */}
      <footer className="glass border-t border-white/20 py-8 mt-auto relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <img src={logo || "/placeholder.svg"} alt="Logo Fundación" className="h-8 object-contain" />
              <span className="text-sm text-gray-600">© {new Date().getFullYear()} Fundación Guajira en Acción</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-600">
              <Link to="/privacidad" className="hover:text-green-600 transition-colors duration-200">
                Privacidad
              </Link>
              <Link to="/terminos" className="hover:text-green-600 transition-colors duration-200">
                Términos
              </Link>
              <Link to="/contacto" className="hover:text-green-600 transition-colors duration-200">
                Contacto
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

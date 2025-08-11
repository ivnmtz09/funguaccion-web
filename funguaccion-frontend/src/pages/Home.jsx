"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Users,
  Heart,
  User,
  Music,
  Lightbulb,
  MapPin,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Target,
  Eye,
  Award,
  HandHeart,
  Building,
  Bike,
  Menu,
  X,
  LogOut,
  Settings,
  Bell,
} from "lucide-react"
import useAuth from "../context/useAuth.jsx"
import logo from "../assets/logo.png"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedSection, setExpandedSection] = useState(null)
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

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    closeMobileMenu()
  }

  const lineasAccion = [
    {
      id: "desarrollo-social",
      title: "Desarrollo Social, Económico y Comunitario",
      icon: <Users className="w-6 h-6" />,
      description: "Programas integrales para el fortalecimiento comunitario",
      items: [
        "Programas en educación (infraestructura, calidad educativa, transporte escolar)",
        "Proyectos en salud, nutrición, vivienda, agua potable y saneamiento básico",
        "Formación, capacitación y fortalecimiento institucional",
        "Obras de equipamiento territorial, vías rurales y desarrollo urbano",
        "Asesorías en consultorías, interventorías, gestión pública y planeación territorial",
      ],
    },
    {
      id: "musica",
      title: "Música para el Desarrollo Social",
      icon: <Music className="w-6 h-6" />,
      description: "Transformación social a través del arte y la música",
      items: [
        "Laboratorios de música y tecnología para exploración creativa",
        "Programas educativos musicales para niños y jóvenes",
        "Escuelas comunitarias de formación musical en barrios vulnerables",
        "Festivales, conciertos interactivos y experiencias inmersivas",
        "Programas de emprendimiento musical y apoyo a músicos locales",
        "Campañas sociales a través de la música (derechos humanos, medio ambiente, inclusión)",
      ],
    },
    {
      id: "innovacion",
      title: "Innovación y Tecnología para el Cambio Social",
      icon: <Lightbulb className="w-6 h-6" />,
      description: "Soluciones tecnológicas para el desarrollo territorial",
      items: [
        "Laboratorios de innovación social y programas de innovación juvenil",
        "Centros de tecnología comunitaria y escuelas de alfabetización digital",
        "Proyectos de energía solar y tecnologías sostenibles para comunidades",
        "Aplicaciones y plataformas digitales para fortalecer la participación ciudadana",
        "Apoyo a emprendimientos digitales, rurales y sociales",
      ],
    },
    {
      id: "movilidad",
      title: "Movilidad Sostenible y Economía Verde",
      icon: <Bike className="w-6 h-6" />,
      description: "Transporte ecológico y desarrollo sostenible",
      items: [
        "Triciclos eléctricos solares para transporte comunitario y rural",
        "Emprendimientos verdes y economía circular con vehículos solares",
        "Turismo sostenible en triciclos solares promoviendo cultura Wayuu",
        "Campañas de educación ambiental y transición energética",
        "Apoyo a municipios para integrar la movilidad sostenible en sus Planes de Desarrollo",
      ],
    },
    {
      id: "gestion",
      title: "Gestión del Conocimiento y Planeación Estratégica",
      icon: <Target className="w-6 h-6" />,
      description: "Fortalecimiento institucional y territorial",
      items: [
        "Elaboración de planes de desarrollo, POT, planes de acción climática",
        "Investigaciones, observatorios de innovación y sistematización de experiencias",
        "Publicación de materiales pedagógicos y documentación cultural de la región",
      ],
    },
  ]

  const formasAyudar = [
    {
      title: "Apadrinar un Niño",
      description: "Brinda apoyo mensual a niños en situación de vulnerabilidad",
      icon: <Heart className="w-8 h-8 text-green-600" />,
      benefits: [
        "Educación de calidad",
        "Alimentación balanceada",
        "Atención médica básica",
        "Espacios de recreación y desarrollo cultural",
      ],
    },
    {
      title: "Donar",
      description: "Cada aporte cuenta y se convierte en oportunidad",
      icon: <HandHeart className="w-8 h-8 text-green-600" />,
      benefits: [
        "Donaciones económicas únicas o periódicas",
        "Ropa, juguetes, útiles escolares",
        "Equipos tecnológicos para educación digital",
        "Transparencia total en el uso de recursos",
      ],
    },
    {
      title: "Compras Solidarias",
      description: "Compra con propósito, compra con corazón",
      icon: <Award className="w-8 h-8 text-green-600" />,
      benefits: [
        "Artesanías Wayuu auténticas",
        "Productos de mujeres emprendedoras",
        "Productos institucionales de la Fundación",
        "Apoyo directo a familias artesanas",
      ],
    },
    {
      title: "Alianzas Estratégicas",
      description: "Juntos llegamos más lejos",
      icon: <Building className="w-8 h-8 text-green-600" />,
      benefits: [
        "Programas de Responsabilidad Social Empresarial",
        "Proyectos de extensión social y voluntariado",
        "Financiamiento de programas específicos",
        "Voluntariado corporativo",
      ],
    },
  ]

  const valores = [
    { name: "Compromiso Social", icon: <Users className="w-6 h-6" /> },
    { name: "Servicio", icon: <HandHeart className="w-6 h-6" /> },
    { name: "Solidaridad", icon: <Heart className="w-6 h-6" /> },
    { name: "Honestidad", icon: <Award className="w-6 h-6" /> },
    { name: "Respeto", icon: <Users className="w-6 h-6" /> },
    { name: "Justicia y Equidad", icon: <Target className="w-6 h-6" /> },
    { name: "Transparencia", icon: <Eye className="w-6 h-6" /> },
    { name: "Calidad en el Servicio", icon: <Award className="w-6 h-6" /> },
    { name: "Responsabilidad", icon: <HandHeart className="w-6 h-6" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="blob-decoration w-96 h-96 bg-green-200 -top-20 -left-20"></div>
      <div className="blob-decoration w-80 h-80 bg-green-100 top-40 -right-20 animation-delay-2000"></div>
      <div className="blob-decoration w-64 h-64 bg-green-300 bottom-20 left-1/4 animation-delay-4000"></div>

      {/* Navbar optimizada */}
      <header className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo mejorado */}
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
                <Link
                  to="/"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 text-gray-700 hover:text-green-700"
                  onClick={closeMobileMenu}
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <span className="font-medium">Inicio</span>
                </Link>

                <Link
                  to="/nosotros"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 text-gray-700 hover:text-green-700"
                  onClick={closeMobileMenu}
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">Nosotros</span>
                </Link>

                <Link
                  to="/programas"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 text-gray-700 hover:text-green-700"
                  onClick={closeMobileMenu}
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">Programas</span>
                </Link>

                <Link
                  to="/contacto"
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-green-50 transition-colors duration-200 text-gray-700 hover:text-green-700"
                  onClick={closeMobileMenu}
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium">Contacto</span>
                </Link>

                {user && (
                  <>
                    <div className="border-t border-gray-200 my-4"></div>
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

      {/* Hero Section mejorada */}
      <section className="flex flex-col items-center text-center py-16 sm:py-24 px-6 relative z-10">
        <div className="max-w-6xl mx-auto animate-fade-in">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="gradient-text">Fundación Guajira en Acción</span>
            <br />
            <span className="text-3xl sm:text-4xl lg:text-5xl">Trabajando juntos por una Guajira mejor</span>
          </h1>

          <p className="text-gray-700 max-w-4xl mx-auto mb-8 text-lg sm:text-xl leading-relaxed">
            Somos una organización social comprometida con el desarrollo ambiental, económico, social, cultural y
            político de Colombia, especialmente de la Región Caribe y, de manera prioritaria, del Departamento de La
            Guajira y sus municipios.
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

          {/* Stats section mejorada */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mt-16">
            <div className="text-center animate-slide-up">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">500+</div>
              <p className="text-gray-600 text-sm sm:text-base">Familias beneficiadas</p>
            </div>
            <div className="text-center animate-slide-up animation-delay-2000">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">15</div>
              <p className="text-gray-600 text-sm sm:text-base">Programas activos</p>
            </div>
            <div className="text-center animate-slide-up animation-delay-4000">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">8</div>
              <p className="text-gray-600 text-sm sm:text-base">Años de experiencia</p>
            </div>
            <div className="text-center animate-slide-up">
              <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">25+</div>
              <p className="text-gray-600 text-sm sm:text-base">Municipios impactados</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Misión y Visión */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <Target className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl font-bold gradient-text">Nuestra Misión</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Promover el bien común y propiciar el desarrollo social del país en general, la Región Caribe y
                enfáticamente en el departamento de La Guajira, a través de programas tendientes al acrecentamiento y
                mejoramiento de la calidad de vida en el ámbito económico, social, cultural, político y ambiental de la
                comunidad en general, y en especial las clases menos favorecidas, poblaciones vulnerables, mujeres
                cabeza de familia, minorías étnicas, y adultos mayores.
              </p>
            </div>
            <div className="card hover:scale-105 transition-transform duration-300">
              <div className="flex items-center space-x-3 mb-6">
                <Eye className="w-8 h-8 text-green-600" />
                <h2 className="text-2xl font-bold gradient-text">Nuestra Visión</h2>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Ser para Colombia, la Región Caribe y La Guajira, una fundación del más alto nivel profesional,
                fundamentada en el sentido social, la sostenibilidad y transparencia, que articule las necesidades de
                las clases menos favorecidas y poblaciones vulnerables con los recursos disponibles, con enfoques
                creativos, alianzas estratégicas locales, nacionales e internacionales y trabajo en red.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Líneas de Acción */}
      <section className="py-16 px-6 bg-white/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center gradient-text mb-4">Nuestras Líneas de Acción</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Trabajamos en cinco líneas estratégicas para generar oportunidades reales de desarrollo e impulsar el bien
            común
          </p>

          <div className="space-y-6">
            {lineasAccion.map((linea, index) => (
              <div key={linea.id} className="card">
                <button
                  onClick={() => toggleSection(linea.id)}
                  className="w-full flex items-center justify-between text-left"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                      {linea.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-green-900">{linea.title}</h3>
                      <p className="text-gray-600 text-sm">{linea.description}</p>
                    </div>
                  </div>
                  {expandedSection === linea.id ? (
                    <ChevronUp className="w-6 h-6 text-green-600" />
                  ) : (
                    <ChevronDown className="w-6 h-6 text-green-600" />
                  )}
                </button>

                {expandedSection === linea.id && (
                  <div className="mt-6 pt-6 border-t border-gray-200 animate-slide-up">
                    <ul className="space-y-3">
                      {linea.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo Puedes Ayudar */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center gradient-text mb-4">¿Cómo Puedes Ayudar?</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Creemos que cada acción cuenta para construir un mundo más justo, solidario y sostenible. Únete a nuestra
            causa
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {formasAyudar.map((forma, index) => (
              <div key={index} className="card hover:scale-105 transition-transform duration-300">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {forma.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-green-900 mb-2">{forma.title}</h3>
                    <p className="text-gray-600">{forma.description}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {forma.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex} className="flex items-start space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-lg font-semibold gradient-text mb-4">"Sembramos hoy el futuro que soñamos"</p>
            <Link to="/contacto" className="btn-primary text-lg px-8 py-4">
              Únete a Nuestra Causa
            </Link>
          </div>
        </div>
      </section>

      {/* Valores Institucionales */}
      <section className="py-16 px-6 bg-white/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center gradient-text mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {valores.map((valor, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  {valor.icon}
                </div>
                <h3 className="text-lg font-semibold text-green-900">{valor.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold gradient-text mb-8">Contáctanos</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <MapPin className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-900 mb-2">Dirección</h3>
              <p className="text-gray-600 text-sm">
                Calle 21 No. 7-61
                <br />
                Barrio Luis Eduardo Cuellar
                <br />
                La Guajira, Colombia
              </p>
            </div>
            <div className="card text-center">
              <Phone className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-900 mb-2">Teléfonos</h3>
              <p className="text-gray-600 text-sm">
                3015078793
                <br />
                3013383289
                <br />
                3004178323
                <br />
                3148142037
              </p>
            </div>
            <div className="card text-center">
              <Mail className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold text-green-900 mb-2">Email</h3>
              <p className="text-gray-600 text-sm">funguaccion@gmail.com</p>
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
              <div className="text-center md:text-left">
                <span className="text-sm font-semibold text-gray-700">Fundación Guajira en Acción</span>
                <p className="text-xs text-gray-600">© {new Date().getFullYear()} Todos los derechos reservados</p>
              </div>
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

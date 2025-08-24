"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Users,
  Heart,
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
  Calendar,
  User,
  ArrowRight,
} from "lucide-react"
import Navigation from "../components/Navigation.jsx"
import logo from "../assets/logo.png"
import { postsAPI, categoriesAPI } from "../api"

export default function Home() {
  const [expandedSection, setExpandedSection] = useState(null)
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  // Cargar posts y categorías
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [postsData, categoriesData] = await Promise.all([
          postsAPI.getPublished({ ordering: "-created_at" }),
          categoriesAPI.getAll()
        ])
        setPosts(postsData.results || postsData)
        setCategories(categoriesData)
      } catch (err) {
        console.error("Error cargando posts:", err)
        setError("No se pudieron cargar las noticias")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  // Función para obtener nombre de categoría
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : "Sin categoría"
  }

  // Función para truncar texto
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
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

      <Navigation currentPage="inicio" />

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

      {/* Sección de Noticias y Posts Publicados */}
      <section className="py-16 px-6 bg-white/50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center gradient-text mb-4">Últimas Noticias</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Mantente informado sobre nuestros proyectos, logros y el impacto que generamos en La Guajira
          </p>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="text-gray-600 mt-2">Cargando noticias...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : posts && posts.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.slice(0, 3).map((post) => (
                  <article key={post.id} className="card hover:scale-105 transition-transform duration-300 group">
                    {post.cover && (
                      <div className="relative overflow-hidden rounded-t-lg mb-4">
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                            {getCategoryName(post.category)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(post.created_at)}</span>
                        {post.author && (
                          <>
                            <span className="mx-2">•</span>
                            <User className="w-4 h-4 mr-2" />
                            <span>{post.author}</span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {truncateText(post.content)}
                      </p>
                      
                      <Link
                        to={`/posts/${post.slug}`}
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group-hover:translate-x-1 transition-all duration-200"
                      >
                        Leer más
                        <ArrowRight className="w-4 h-5 ml-2" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              
              <div className="text-center">
                <Link
                  to="/posts"
                  className="btn-primary text-lg px-8 py-4 inline-flex items-center"
                >
                  Ver todas las noticias
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No hay noticias disponibles en este momento.</p>
            </div>
          )}
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

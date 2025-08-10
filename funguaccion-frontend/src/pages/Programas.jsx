"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Users, Music, Lightbulb, Bike, Target, Heart, Building, ChevronDown, ChevronUp } from "lucide-react"
import logo from "../assets/logo.png"

export default function Programas() {
  const [expandedProgram, setExpandedProgram] = useState(null)

  const toggleProgram = (programId) => {
    setExpandedProgram(expandedProgram === programId ? null : programId)
  }

  const programas = [
    {
      id: "desarrollo-social",
      title: "Desarrollo Social, Económico y Comunitario",
      icon: <Users className="w-8 h-8" />,
      color: "bg-blue-100 text-blue-600",
      description: "Programas integrales para el fortalecimiento comunitario y mejoramiento de la calidad de vida",
      objetivos: [
        "Mejorar la cobertura y calidad educativa en comunidades vulnerables",
        "Fortalecer los sistemas de salud y nutrición comunitaria",
        "Desarrollar infraestructura básica y servicios públicos",
        "Capacitar líderes comunitarios y fortalecer organizaciones locales",
      ],
      actividades: [
        "Construcción y dotación de escuelas rurales",
        "Programas de transporte escolar",
        "Restaurantes escolares y programas nutricionales",
        "Proyectos de agua potable y saneamiento básico",
        "Programas de vivienda de interés social",
        "Capacitaciones en liderazgo comunitario",
      ],
      beneficiarios: "Familias vulnerables, niños, jóvenes, mujeres cabeza de familia, adultos mayores",
      impacto: "200+ familias beneficiadas directamente, 15 escuelas mejoradas, 8 proyectos de infraestructura",
    },
    {
      id: "musica",
      title: "Música para el Desarrollo Social",
      icon: <Music className="w-8 h-8" />,
      color: "bg-purple-100 text-purple-600",
      description: "Transformación social a través del arte, la música y la cultura como herramientas de desarrollo",
      objetivos: [
        "Promover la inclusión social a través de la música",
        "Preservar y difundir la cultura musical regional",
        "Crear oportunidades de emprendimiento musical",
        "Usar la música como herramienta de educación y convivencia",
      ],
      actividades: [
        "Escuelas comunitarias de formación musical",
        "Laboratorios de música y tecnología",
        "Festivales y conciertos comunitarios",
        "Programas de emprendimiento musical",
        "Investigación de música tradicional Wayuu",
        "Campañas sociales a través de la música",
      ],
      beneficiarios: "Niños, jóvenes, músicos locales, comunidades indígenas",
      impacto: "5 escuelas de música, 100+ jóvenes formados, 12 eventos culturales anuales",
    },
    {
      id: "innovacion",
      title: "Innovación y Tecnología para el Cambio Social",
      icon: <Lightbulb className="w-8 h-8" />,
      color: "bg-yellow-100 text-yellow-600",
      description:
        "Soluciones tecnológicas innovadoras para resolver problemáticas locales y fortalecer el desarrollo territorial",
      objetivos: [
        "Reducir la brecha digital en comunidades rurales",
        "Implementar tecnologías apropiadas para el desarrollo",
        "Fomentar la innovación social y el emprendimiento",
        "Fortalecer la participación ciudadana digital",
      ],
      actividades: [
        "Centros comunitarios de innovación y TIC",
        "Programas de alfabetización digital",
        "Laboratorios de innovación social",
        "Proyectos de energía solar comunitaria",
        "Desarrollo de aplicaciones para participación ciudadana",
        "Incubación de emprendimientos tecnológicos",
      ],
      beneficiarios: "Jóvenes, emprendedores, comunidades rurales, gobiernos locales",
      impacto: "3 centros TIC, 300+ personas capacitadas, 20 proyectos de energía solar",
    },
    {
      id: "movilidad",
      title: "Movilidad Sostenible y Economía Verde",
      icon: <Bike className="w-8 h-8" />,
      color: "bg-green-100 text-green-600",
      description: "Promoción del transporte ecológico y desarrollo de la economía circular con enfoque ambiental",
      objetivos: [
        "Implementar sistemas de transporte sostenible",
        "Promover la economía circular y verde",
        "Reducir la huella de carbono en el transporte",
        "Generar oportunidades de emprendimiento verde",
      ],
      actividades: [
        "Fabricación y distribución de triciclos eléctricos solares",
        "Programas de transporte comunitario ecológico",
        "Emprendimientos verdes con vehículos solares",
        "Turismo sostenible en triciclos solares",
        "Campañas de educación ambiental",
        "Gestión de residuos sólidos con tecnología limpia",
      ],
      beneficiarios: "Comunidades rurales, emprendedores, turistas, recicladores",
      impacto: "50 triciclos solares distribuidos, 25 emprendimientos verdes, 10 rutas turísticas",
    },
    {
      id: "gestion",
      title: "Gestión del Conocimiento y Planeación Estratégica",
      icon: <Target className="w-8 h-8" />,
      color: "bg-red-100 text-red-600",
      description:
        "Fortalecimiento institucional y territorial a través de la planeación participativa y gestión del conocimiento",
      objetivos: [
        "Fortalecer la capacidad de planeación territorial",
        "Sistematizar experiencias y buenas prácticas",
        "Apoyar la formulación de políticas públicas",
        "Generar conocimiento aplicado al desarrollo local",
      ],
      actividades: [
        "Elaboración de Planes de Desarrollo Municipal",
        "Formulación de Planes de Ordenamiento Territorial (POT)",
        "Investigaciones aplicadas al desarrollo territorial",
        "Observatorios de innovación social",
        "Publicación de materiales pedagógicos",
        "Asesorías en gestión pública y planeación",
      ],
      beneficiarios: "Gobiernos locales, organizaciones sociales, academia, comunidades",
      impacto: "15 planes de desarrollo, 8 POT formulados, 25 investigaciones publicadas",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-3 text-green-700 hover:text-green-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver al inicio</span>
            </Link>
            <img src={logo || "/placeholder.svg"} alt="Logo Fundación" className="h-10 object-contain" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">Nuestros Programas</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Trabajamos en cinco líneas estratégicas para generar oportunidades reales de desarrollo, impulsar el bien
            común y construir una Guajira más inclusiva, sostenible y próspera.
          </p>
        </div>
      </section>

      {/* Programas */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-8">
          {programas.map((programa, index) => (
            <div key={programa.id} className="card">
              <button
                onClick={() => toggleProgram(programa.id)}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${programa.color}`}>
                    {programa.icon}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-green-900 mb-2">{programa.title}</h2>
                    <p className="text-gray-600">{programa.description}</p>
                  </div>
                </div>
                {expandedProgram === programa.id ? (
                  <ChevronUp className="w-6 h-6 text-green-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-green-600 flex-shrink-0" />
                )}
              </button>

              {expandedProgram === programa.id && (
                <div className="mt-8 pt-8 border-t border-gray-200 animate-slide-up">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center space-x-2">
                        <Target className="w-5 h-5" />
                        <span>Objetivos</span>
                      </h3>
                      <ul className="space-y-2">
                        {programa.objetivos.map((objetivo, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">{objetivo}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-green-900 mb-4 flex items-center space-x-2">
                        <Building className="w-5 h-5" />
                        <span>Actividades</span>
                      </h3>
                      <ul className="space-y-2">
                        {programa.actividades.map((actividad, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700 text-sm">{actividad}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 grid md:grid-cols-2 gap-8">
                    <div className="bg-green-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-green-900 mb-3 flex items-center space-x-2">
                        <Users className="w-5 h-5" />
                        <span>Beneficiarios</span>
                      </h3>
                      <p className="text-gray-700">{programa.beneficiarios}</p>
                    </div>

                    <div className="bg-blue-50 p-6 rounded-lg">
                      <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center space-x-2">
                        <Heart className="w-5 h-5" />
                        <span>Impacto Logrado</span>
                      </h3>
                      <p className="text-gray-700">{programa.impacto}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold gradient-text mb-6">¿Quieres Participar?</h2>
          <p className="text-xl text-gray-700 mb-8">
            Cada uno de nuestros programas está orientado a generar oportunidades reales de desarrollo. Únete y sé parte
            del cambio.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contacto" className="btn-primary text-lg px-8 py-4">
              Contáctanos
            </Link>
            <Link
              to="/nosotros"
              className="text-green-700 hover:text-green-600 font-semibold text-lg hover:underline transition-colors duration-200"
            >
              Conoce más sobre nosotros →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

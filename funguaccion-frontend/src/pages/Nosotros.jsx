"use client"

import { Link } from "react-router-dom"
import { Target, Eye, Calendar } from "lucide-react"
import Navigation from "../components/Navigation.jsx"

export default function Nosotros() {
  const historia = [
    {
      year: "2016",
      title: "Fundación de la Organización",
      description:
        "Nace la Fundación Guajira en Acción con el propósito de ser una voz activa en la visibilización y atención de los problemas que enfrentan nuestras comunidades.",
    },
    {
      year: "2018",
      title: "Primeros Programas Sociales",
      description:
        "Implementamos nuestros primeros programas de educación y nutrición infantil, beneficiando a más de 100 familias.",
    },
    {
      year: "2020",
      title: "Expansión Regional",
      description:
        "Ampliamos nuestro alcance a 15 municipios de La Guajira, consolidando alianzas estratégicas con entidades gubernamentales.",
    },
    {
      year: "2022",
      title: "Innovación Tecnológica",
      description:
        "Incorporamos tecnologías limpias y programas de alfabetización digital en nuestras líneas de acción.",
    },
    {
      year: "2024",
      title: "Presente",
      description:
        "Hoy beneficiamos a más de 500 familias con 15 programas activos y presencia en 25+ municipios de la región.",
    },
  ]

  const equipo = [
    {
      name: "María González",
      position: "Directora General",
      description: "Líder con más de 15 años de experiencia en desarrollo social y gestión de proyectos comunitarios.",
      image: "/professional-woman-director.png",
    },
    {
      name: "Carlos Rodríguez",
      position: "Coordinador de Programas",
      description:
        "Especialista en planeación territorial y desarrollo sostenible, coordinando nuestros proyectos estratégicos.",
      image: "/professional-man-coordinator.png",
    },
    {
      name: "Ana Martínez",
      position: "Responsable de Alianzas",
      description: "Gestora de relaciones institucionales y responsabilidad social empresarial.",
      image: "/professional-woman-partnerships.png",
    },
    {
      name: "Luis Pérez",
      position: "Coordinador de Voluntarios",
      description: "Encargado del reclutamiento, formación y retención de nuestros voluntarios comprometidos.",
      image: "/professional-man-volunteers.png",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Navigation currentPage="nosotros" />

      {/* Hero Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">¿Quiénes Somos?</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            En la Fundación Guajira en Acción somos una organización social comprometida con el desarrollo ambiental,
            económico, social, cultural y político de Colombia, especialmente de la Región Caribe y, de manera
            prioritaria, del Departamento de La Guajira y sus municipios.
          </p>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card">
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
            <div className="card">
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

      {/* Historia */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">Nuestra Historia</h2>
          <div className="space-y-8">
            {historia.map((evento, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-8 h-8 text-green-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="card">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-2xl font-bold text-green-600">{evento.year}</span>
                      <h3 className="text-xl font-semibold text-green-900">{evento.title}</h3>
                    </div>
                    <p className="text-gray-700">{evento.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">Nuestro Equipo</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {equipo.map((miembro, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform duration-300">
                <img
                  src={miembro.image || "/placeholder.svg"}
                  alt={miembro.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-green-900 mb-1">{miembro.name}</h3>
                <p className="text-green-600 font-medium mb-3">{miembro.position}</p>
                <p className="text-gray-600 text-sm">{miembro.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold gradient-text mb-6">Únete a Nuestra Causa</h2>
          <p className="text-xl text-gray-700 mb-8">
            Trabajamos por una Guajira más justa, próspera y solidaria. Tu apoyo hace la diferencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contacto" className="btn-primary text-lg px-8 py-4">
              Contáctanos
            </Link>
            <Link
              to="/programas"
              className="text-green-700 hover:text-green-600 font-semibold text-lg hover:underline transition-colors duration-200"
            >
              Ver nuestros programas →
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import logo from "../assets/logo.png"

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simular envío del formulario
    setTimeout(() => {
      alert("¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.")
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 2000)
  }

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Dirección",
      details: ["Calle 21 No. 7-61", "Barrio Luis Eduardo Cuellar", "La Guajira, Colombia"],
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Teléfonos",
      details: ["3015078793", "3013383289", "3004178323", "3148142037"],
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      details: ["funguaccion@gmail.com"],
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Horarios",
      details: ["Lunes a Viernes: 8:00 AM - 5:00 PM", "Sábados: 8:00 AM - 12:00 PM", "Domingos: Cerrado"],
    },
  ]

  const formasContacto = [
    {
      title: "Información General",
      description: "Para consultas generales sobre nuestros programas y servicios",
      action: "Escríbenos",
    },
    {
      title: "Voluntariado",
      description: "¿Quieres ser parte de nuestro equipo de voluntarios?",
      action: "Únete",
    },
    {
      title: "Donaciones",
      description: "Información sobre cómo realizar donaciones y apadrinamientos",
      action: "Donar",
    },
    {
      title: "Alianzas",
      description: "Para empresas e instituciones interesadas en alianzas estratégicas",
      action: "Colaborar",
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
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">Contáctanos</h1>
          <p className="text-xl text-gray-700 leading-relaxed">
            Estamos aquí para escucharte. Ponte en contacto con nosotros para cualquier consulta, sugerencia o para
            conocer cómo puedes ser parte del cambio.
          </p>
        </div>
      </section>

      {/* Información de Contacto */}
      <section className="py-16 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">Información de Contacto</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="card text-center hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                  {info.icon}
                </div>
                <h3 className="font-semibold text-green-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">
                      {detail}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Formulario */}
            <div className="card">
              <h2 className="text-2xl font-bold gradient-text mb-6">Envíanos un Mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre completo *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tu nombre completo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Asunto *</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-field"
                    required
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="informacion">Información General</option>
                    <option value="voluntariado">Voluntariado</option>
                    <option value="donaciones">Donaciones</option>
                    <option value="alianzas">Alianzas Estratégicas</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensaje *</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="input-field resize-none"
                    placeholder="Escribe tu mensaje aquí..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Mensaje</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Formas de Contacto */}
            <div>
              <h2 className="text-2xl font-bold gradient-text mb-6">¿Cómo Podemos Ayudarte?</h2>
              <div className="space-y-4">
                {formasContacto.map((forma, index) => (
                  <div key={index} className="card hover:scale-105 transition-transform duration-300">
                    <h3 className="font-semibold text-green-900 mb-2">{forma.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{forma.description}</p>
                    <button className="text-green-600 hover:text-green-500 font-medium text-sm hover:underline transition-colors duration-200">
                      {forma.action} →
                    </button>
                  </div>
                ))}
              </div>

              {/* Mapa placeholder */}
              <div className="mt-8 card">
                <h3 className="font-semibold text-green-900 mb-4">Nuestra Ubicación</h3>
                <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Mapa interactivo próximamente</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

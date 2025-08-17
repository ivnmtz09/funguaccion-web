"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, User, Save, Camera } from "lucide-react"
import useAuth from "../context/useAuth.jsx"
import api from "../api.js"
import { API_BASE } from "../api.js"
import logo from "../assets/logo.png"
import Avatar from "../components/Avatar.jsx"


export default function EditProfile() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [customLocation, setCustomLocation] = useState("")
  const [showCustomLocation, setShowCustomLocation] = useState(false)
  const [preview, setPreview] = useState(user?.profile_image || "")
  const [imageFile, setImageFile] = useState(null)

  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    telefono: user?.telefono || "",
    biografia: user?.biografia || "",
    ubicacion: user?.ubicacion || "",
    intereses: user?.intereses ? (Array.isArray(user.intereses) ? user.intereses : user.intereses.split(", ")) : [],
  })

  const interesesOpciones = [
    "Educación",
    "Medio Ambiente",
    "Música",
    "Tecnología",
    "Salud",
    "Emprendimiento",
    "Innovación",
    "Arte",
    "Deporte",
    "Inclusión",
    "Voluntariado",
    "Cultura",
  ]

  const ubicacionesOpciones = {
    "La Guajira": [
      "Albania",
      "Barrancas",
      "Dibulla",
      "Distracción",
      "El Molino",
      "Fonseca",
      "Hatonuevo",
      "La Jagua del Pilar",
      "Maicao",
      "Manaure",
      "Riohacha",
      "San Juan del Cesar",
      "Uribia",
      "Urumita",
      "Villanueva",
    ],
    Atlántico: ["Barranquilla", "Soledad", "Malambo", "Puerto Colombia", "Galapa"],
    Magdalena: ["Santa Marta", "Ciénaga", "Fundación", "Aracataca", "El Banco"],
    Cesar: ["Valledupar", "Aguachica", "Bosconia", "Codazzi", "La Paz"],
    Bolívar: ["Cartagena", "Magangué", "Turbaco", "Arjona", "El Carmen de Bolívar"],
    "Bogotá D.C.": ["Bogotá"],
    Antioquia: ["Medellín", "Bello", "Itagüí", "Envigado", "Rionegro"],
    "Valle del Cauca": ["Cali", "Palmira", "Buenaventura", "Tuluá", "Cartago"],
    Cundinamarca: ["Soacha", "Chía", "Zipaquirá", "Facatativá", "Fusagasugá"],
  }

  const handleImageChange = (e) => {
  const file = e.target.files[0]
  if (file) {
    setImageFile(file)
    setPreview(URL.createObjectURL(file))
    }
  }

  const avatarUrl = preview || (user?.profile_image?.startsWith("http")
  ? user.profile_image
  : user?.profile_image
    ? `${API_BASE}${user.profile_image}`
    : null);

  const handleChange = (e) => {
    const { name, value, options, type } = e.target
    if (name === "intereses") {
      // Para select múltiple
      const selected = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value)
      setFormData({ ...formData, intereses: selected })
    } else if (name === "ubicacion") {
      if (value === "custom") {
        setShowCustomLocation(true)
        setFormData({ ...formData, ubicacion: "" })
      } else {
        setShowCustomLocation(false)
        setCustomLocation("")
        setFormData({ ...formData, [name]: value })
      }
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleCustomLocationChange = (e) => {
    const value = e.target.value
    setCustomLocation(value)
    setFormData({ ...formData, ubicacion: value })
  }

  const handleInteresClick = (interes) => {
    // Fixed interests handling to properly add/remove interests
    let interesesActuales = Array.isArray(formData.intereses)
      ? [...formData.intereses]
      : typeof formData.intereses === "string"
        ? formData.intereses.split(", ").filter(Boolean)
        : []

    if (interesesActuales.includes(interes)) {
      // Remove if already selected
      interesesActuales = interesesActuales.filter((i) => i !== interes)
    } else {
      // Add if not selected
      interesesActuales.push(interes)
    }

    setFormData({ ...formData, intereses: interesesActuales })
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  setIsLoading(true)
  setError("")
  setSuccess("")

  try {
    const formDataToSend = new FormData()

    formDataToSend.append("first_name", formData.first_name || "")
    formDataToSend.append("last_name", formData.last_name || "")
    formDataToSend.append("email", formData.email || "")
    formDataToSend.append("telefono", formData.telefono || "")
    formDataToSend.append("biografia", formData.biografia || "")
    formDataToSend.append("ubicacion", formData.ubicacion || "")

    // Intereses en string separado por comas
    if (Array.isArray(formData.intereses)) {
      formDataToSend.append("intereses", formData.intereses.join(", "))
    } else {
      formDataToSend.append("intereses", formData.intereses || "")
    }

    // 👇 Aquí va la foto
    if (imageFile) {
      formDataToSend.append("profile_image", imageFile)
    }

    const res = await api.put("/users/me/update/", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })

    // Obtener datos actualizados
    const userResponse = await api.get("/users/me/")
    setUser(userResponse.data)

    setSuccess("¡Cambios guardados exitosamente!")
    setTimeout(() => {
      navigate("/me")
    }, 1200)
  } catch (err) {
    let errorMsg = "No se pudo actualizar el perfil. Intenta de nuevo."
    if (err.response?.data) {
      errorMsg = JSON.stringify(err.response.data)
    }
    setError(errorMsg)
    console.error("Error updating profile:", err)
  } finally {
    setIsLoading(false)
  }
}

  // Fixed interests display logic
  const isInteresSelected = (interes) => {
    const currentIntereses = Array.isArray(formData.intereses)
      ? formData.intereses
      : typeof formData.intereses === "string"
        ? formData.intereses.split(", ").filter(Boolean)
        : []
    return currentIntereses.includes(interes)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      {/* Header */}
      <header className="glass sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/me"
              className="flex items-center space-x-3 text-green-700 hover:text-green-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Volver al perfil</span>
            </Link>
            <img src={logo || "/placeholder.svg"} alt="Logo Fundación" className="h-10 object-contain" />
          </div>
        </div>
      </header>

      {/* Contenido Principal */}
      <div className="py-16 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold gradient-text mb-2">Editar Perfil</h1>
              <p className="text-gray-600">Actualiza tu información personal</p>
            </div>

            {/* Foto de Perfil */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
              <Avatar src={avatarUrl} size={64} className="mr-4" />
              <label className="absolute bottom-4 right-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-green-700">
                <Camera className="w-4 h-4" />
                <input type="file" className="hidden" onChange={handleImageChange} />
              </label>
            </div>
            <p className="text-sm text-gray-500">Haz clic para cambiar tu foto de perfil</p>
          </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                  {error}
                </div>
              )}
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
                  {success}
                </div>
              )}
              {/* Información Personal */}
              <div>
                <h2 className="text-lg font-semibold text-green-900 mb-4">Información Personal</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nombre *</label>
                    <input
                      type="text"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tu nombre"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Apellido *</label>
                    <input
                      type="text"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tu apellido"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Información de Contacto */}
              <div>
                <h2 className="text-lg font-semibold text-green-900 mb-4">Información de Contacto</h2>
                <div className="space-y-4">
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Tu número de teléfono"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ubicación</label>
                    <select
                      name="ubicacion"
                      value={showCustomLocation ? "custom" : formData.ubicacion}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Selecciona tu municipio</option>
                      {Object.entries(ubicacionesOpciones).map(([departamento, municipios]) => (
                        <optgroup key={departamento} label={departamento}>
                          {municipios.map((municipio) => (
                            <option key={municipio} value={municipio}>
                              {municipio}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                      <option value="custom">✏️ Escribir municipio manualmente</option>
                    </select>

                    {showCustomLocation && (
                      <div className="mt-2">
                        <input
                          type="text"
                          value={customLocation}
                          onChange={handleCustomLocationChange}
                          className="input-field"
                          placeholder="Escribe tu municipio"
                          autoFocus
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Escribe el nombre de tu municipio si no aparece en la lista
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Información Adicional */}
              <div>
                <h2 className="text-lg font-semibold text-green-900 mb-4">Información Adicional</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Biografía</label>
                    <textarea
                      name="biografia"
                      value={formData.biografia}
                      onChange={handleChange}
                      rows={4}
                      className="input-field resize-none"
                      placeholder="Cuéntanos un poco sobre ti..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Intereses</label>
                    <input
                      type="text"
                      name="intereses"
                      value={Array.isArray(formData.intereses) ? formData.intereses.join(", ") : formData.intereses}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Ejemplo: Educación, Medio Ambiente, Música, etc."
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {interesesOpciones.map((interes) => (
                        <button
                          type="button"
                          key={interes}
                          className={`px-3 py-1 rounded-full text-sm border transition-colors duration-200 ${
                            isInteresSelected(interes)
                              ? "bg-green-600 text-white border-green-600"
                              : "bg-gray-100 text-green-700 border-gray-300 hover:bg-green-50"
                          }`}
                          onClick={() => handleInteresClick(interes)}
                        >
                          {interes}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Haz clic en los intereses recomendados para agregarlos o quitarlos.
                    </p>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary flex items-center justify-center space-x-2 flex-1"
                >
                  {isLoading ? (
                    <>
                      <div className="loading-spinner"></div>
                      <span>Guardando...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      <span>Guardar Cambios</span>
                    </>
                  )}
                </button>
                <Link
                  to="/me"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200 text-center flex-1"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
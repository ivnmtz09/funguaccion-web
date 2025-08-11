"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, User, Save, Camera } from "lucide-react"
import useAuth from "../context/useAuth.jsx"
import logo from "../assets/logo.png"
import api from "../api"

export default function EditProfile() {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    telefono: user?.telefono || "",
    biografia: user?.biografia || "",
    ubicacion: user?.ubicacion || "",
    intereses: user?.intereses ? Array.isArray(user.intereses) ? user.intereses : user.intereses.split(", ") : [],
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
  ];

  const ubicacionesOpciones = [
    "Riohacha",
    "Maicao",
    "Bogotá",
    "Medellín",
    "Barranquilla",
    "Santa Marta",
    "Valledupar",
    "Cartagena",
    "Cali",
    "Otra",
  ];

  const handleChange = (e) => {
    const { name, value, options, type } = e.target;
    if (name === "intereses") {
      // Para select múltiple
      const selected = Array.from(options)
        .filter((opt) => opt.selected)
        .map((opt) => opt.value);
      setFormData({ ...formData, intereses: selected });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  const handleInteresClick = (interes) => {
    let interesesActuales = formData.intereses;
    if (typeof interesesActuales === "string") {
      interesesActuales = interesesActuales.split(", ").filter(Boolean);
    }
    if (!interesesActuales.includes(interes)) {
      const nuevosIntereses = [...interesesActuales, interes];
      setFormData({ ...formData, intereses: nuevosIntereses.join(", ") });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      const access = localStorage.getItem("access")
      // Enviar intereses como array
      let interesesArray = formData.intereses;
      if (typeof interesesArray === "string") {
        interesesArray = interesesArray.split(",").map(i => i.trim()).filter(Boolean);
      }
      // Si está vacío, enviar null
      const payload = {
        ...formData,
        biografia: formData.biografia?.trim() ? formData.biografia : null,
        telefono: formData.telefono?.trim() ? formData.telefono : null,
        ubicacion: formData.ubicacion?.trim() ? formData.ubicacion : null,
        intereses: interesesArray.length > 0 ? interesesArray : null,
      };
      const res = await api.put("/users/me/update/", payload, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      })
      setUser(res.data) // Actualiza el usuario en el contexto
      setSuccess("¡Cambios guardados exitosamente!")
      setTimeout(() => {
        navigate("/me")
      }, 1200)
    } catch (err) {
      // Mostrar el mensaje real del backend si existe
      let errorMsg = "No se pudo actualizar el perfil. Intenta de nuevo.";
      if (err.response?.data) {
        if (typeof err.response.data === "string") {
          errorMsg = err.response.data;
        } else if (err.response.data.detail) {
          errorMsg = err.response.data.detail;
        } else if (typeof err.response.data === "object") {
          errorMsg = Object.values(err.response.data).join(" ");
        }
      }
      setError(errorMsg);
    } finally {
      setIsLoading(false)
    }
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
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-green-600" />
                </div>
                <button className="absolute bottom-4 right-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition-colors duration-200">
                  <Camera className="w-4 h-4" />
                </button>
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
                      value={formData.ubicacion}
                      onChange={handleChange}
                      className="input-field"
                    >
                      <option value="">Selecciona tu ciudad</option>
                      {ubicacionesOpciones.map((ciudad) => (
                        <option key={ciudad} value={ciudad}>{ciudad}</option>
                      ))}
                    </select>
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
                      value={typeof formData.intereses === "string" ? formData.intereses : formData.intereses.join(", ")}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Ejemplo: Educación, Medio Ambiente, Música, etc."
                    />
                    <div className="flex flex-wrap gap-2 mt-2">
                      {interesesOpciones.map((interes) => (
                        <button
                          type="button"
                          key={interes}
                          className={`px-3 py-1 rounded-full text-sm border ${formData.intereses.includes(interes) ? "bg-green-600 text-white" : "bg-gray-100 text-green-700"}`}
                          onClick={() => handleInteresClick(interes)}
                        >
                          {interes}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Haz clic en los intereses recomendados para agregarlos automáticamente.</p>
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

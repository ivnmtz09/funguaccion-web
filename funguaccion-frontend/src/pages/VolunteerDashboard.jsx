"use client"
import { useState, useEffect } from "react"
import Navigation from "../components/Navigation.jsx"
import { postsAPI } from "../api.js"

export default function VolunteerDashboard() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("calendar")

  // Eventos de ejemplo
  const [events] = useState([
    { id: 1, title: "Jornada de Limpieza Comunitaria", date: "2025-01-15", time: "08:00 AM", location: "Barrio El Progreso", volunteers: 12, maxVolunteers: 20 },
    { id: 2, title: "Entrega de Alimentos", date: "2025-01-18", time: "10:00 AM", location: "Centro Comunitario", volunteers: 8, maxVolunteers: 15 },
    { id: 3, title: "Taller de Capacitación", date: "2025-01-22", time: "02:00 PM", location: "Sede Fundación", volunteers: 5, maxVolunteers: 10 }
  ])

  const [materials] = useState([
    { id: 1, title: "Manual del Voluntario", type: "PDF", description: "Guía completa para nuevos voluntarios", downloadUrl: "#" },
    { id: 2, title: "Protocolo de Seguridad", type: "PDF", description: "Medidas de seguridad en actividades", downloadUrl: "#" },
    { id: 3, title: "Lista de Contactos", type: "DOC", description: "Contactos importantes de la fundación", downloadUrl: "#" }
  ])

  useEffect(() => {
    loadVolunteerContent()
  }, [])

  const loadVolunteerContent = async () => {
    try {
      setLoading(true)
      const postsData = await postsAPI.getAll()
      setPosts(postsData || [])
    } catch (error) {
      console.error("Error loading volunteer content:", error)
    } finally {
      setLoading(false)
    }
  }

  const joinEvent = (eventId) => {
    alert(`Te has inscrito al evento ${eventId}. Recibirás más información por email.`)
  }

  return (
    <div className="min-h-screen bg-emerald-50" style={{ minHeight: "100dvh" }}>
      <Navigation currentPage="volunteer-dashboard" />

      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800 mb-2">Zona de Voluntariado</h1>
          <p className="text-emerald-700 text-sm sm:text-base">
            Accede al calendario de actividades y materiales internos para voluntarios.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 border-b border-emerald-200">
            {["calendar", "materials", "posts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 font-medium text-sm rounded-t-lg transition-colors ${
                  activeTab === tab
                    ? "bg-emerald-100 text-emerald-800 border-b-2 border-emerald-600"
                    : "text-emerald-600 hover:text-emerald-800"
                }`}
              >
                {tab === "calendar" ? "Calendario" : tab === "materials" ? "Materiales" : "Noticias Internas"}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
          </div>
        ) : (
          <div>
            {activeTab === "calendar" && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <div key={event.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <h3 className="font-semibold text-lg text-emerald-800 mb-2">{event.title}</h3>
                    <div className="space-y-2 text-sm text-gray-600 mb-4">
                      <p><span className="font-medium">Fecha:</span> {new Date(event.date).toLocaleDateString()}</p>
                      <p><span className="font-medium">Hora:</span> {event.time}</p>
                      <p><span className="font-medium">Lugar:</span> {event.location}</p>
                      <p><span className="font-medium">Voluntarios:</span> {event.volunteers}/{event.maxVolunteers}</p>
                    </div>
                    <button
                      onClick={() => joinEvent(event.id)}
                      disabled={event.volunteers >= event.maxVolunteers}
                      className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                        event.volunteers >= event.maxVolunteers
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                    >
                      {event.volunteers >= event.maxVolunteers ? "Completo" : "Inscribirse"}
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "materials" && (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {materials.map((material) => (
                  <div key={material.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-lg text-emerald-800">{material.title}</h3>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full">
                        {material.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{material.description}</p>
                    <button
                      onClick={() => window.open(material.downloadUrl, "_blank")}
                      className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                    >
                      Descargar
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "posts" && (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.length > 0 ? (
                  posts.slice(0, 6).map((post) => (
                    <div key={post.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                      <h3 className="font-semibold text-lg text-emerald-800 mb-2 line-clamp-2">{post.title}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.content}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Por: {post.author_name || "Fundación"}</span>
                        <span>{new Date(post.created_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-emerald-700 text-lg">No hay noticias internas disponibles.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

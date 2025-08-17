"use client"
import Navigation from "../components/Navigation.jsx"

export default function VisitanteDashboard() {
  return (
    <div className="min-h-screen bg-yellow-50">
      <Navigation currentPage="visitante-dashboard" />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-yellow-800 mb-4">Zona de Visitante</h1>
        <p className="text-yellow-700 mb-6">
          Explora el contenido público de la fundación.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-yellow-700">Publicaciones</h2>
            <p className="text-gray-600 text-sm">Consulta noticias y artículos disponibles públicamente.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-yellow-700">Solicitar Rol</h2>
            <p className="text-gray-600 text-sm">Envía una solicitud para obtener más permisos.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

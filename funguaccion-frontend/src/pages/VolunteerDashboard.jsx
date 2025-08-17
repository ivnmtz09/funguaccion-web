"use client"
import Navigation from "../components/Navigation.jsx"

export default function VolunteerDashboard() {
  return (
    <div className="min-h-screen bg-emerald-50">
      <Navigation currentPage="volunteer-dashboard" />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-emerald-800 mb-4">Zona de Voluntariado</h1>
        <p className="text-emerald-700 mb-6">
          Accede al calendario de actividades y materiales internos.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-emerald-700">Calendario</h2>
            <p className="text-gray-600 text-sm">Consulta las próximas actividades de voluntariado.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-emerald-700">Materiales</h2>
            <p className="text-gray-600 text-sm">Accede a guías y recursos internos para voluntarios.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

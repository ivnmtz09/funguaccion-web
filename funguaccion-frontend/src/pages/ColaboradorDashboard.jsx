"use client"
import Navigation from "../components/Navigation.jsx"

export default function ColaboradorDashboard() {
  return (
    <div className="min-h-screen bg-green-50">
      <Navigation currentPage="colaborador-dashboard" />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-green-800 mb-4">Área de Colaborador</h1>
        <p className="text-green-700 mb-6">
          Propón borradores, sube documentos y contribuye con tus ideas.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-green-700">Borradores</h2>
            <p className="text-gray-600 text-sm">Crea y guarda propuestas para revisión.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-green-700">Documentos</h2>
            <p className="text-gray-600 text-sm">Sube archivos e informes relacionados con proyectos.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

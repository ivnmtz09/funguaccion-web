"use client"
import Navigation from "../components/Navigation.jsx"

export default function EditorDashboard() {
  return (
    <div className="min-h-screen bg-blue-50">
      <Navigation currentPage="editor-dashboard" />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">Panel de Editor</h1>
        <p className="text-blue-700 mb-6">
          Crea, edita y publica Noticias, Blogs y Eventos.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-blue-700">Noticias</h2>
            <p className="text-gray-600 text-sm">Publica y organiza las noticias más recientes.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-blue-700">Eventos</h2>
            <p className="text-gray-600 text-sm">Administra el calendario de eventos de la fundación.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

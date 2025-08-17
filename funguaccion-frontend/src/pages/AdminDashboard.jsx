"use client"
import Navigation from "../components/Navigation.jsx"

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-red-50">
      <Navigation currentPage="admin-dashboard" />
      <div className="max-w-6xl mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-red-800 mb-4">Panel de Administrador</h1>
        <p className="text-red-700 mb-6">
          Gestiona usuarios, roles, permisos, contenido y configuración del sistema.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-red-700">Gestión de Usuarios</h2>
            <p className="text-gray-600 text-sm">Crear, editar y eliminar usuarios del sistema.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg text-red-700">Control de Roles</h2>
            <p className="text-gray-600 text-sm">Asigna roles y gestiona permisos de acceso.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"
import { useState, useEffect } from "react"
import Navigation from "../components/Navigation.jsx"
import { postsAPI, categoriesAPI } from "../api.js"

export default function VisitanteDashboard() {
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showRequestForm, setShowRequestForm] = useState(false)

  useEffect(() => {
    loadPublicContent()
  }, [])

  const loadPublicContent = async () => {
    try {
      setLoading(true)
      const [postsData, categoriesData] = await Promise.all([
        postsAPI.getPublished(),
        categoriesAPI.getAll()
      ])
      setPosts(postsData || [])
      setCategories(categoriesData || [])
    } catch (error) {
      console.error("Error loading public content:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) => post.category === Number(selectedCategory))

  return (
    <div className="min-h-screen bg-yellow-50" style={{ minHeight: "100dvh" }}>
      <Navigation currentPage="visitante-dashboard" />

      <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-yellow-800 mb-2">Zona de Visitante</h1>
          <p className="text-yellow-700 text-sm sm:text-base">
            Explora el contenido público de la Fundación Guajira en Acción.
          </p>
        </div>

        {/* Filtro de categorías */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-yellow-300 rounded-lg bg-white text-yellow-800 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="all">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <button
            onClick={() => setShowRequestForm(true)}
            className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200 font-medium"
          >
            Solicitar Rol
          </button>
        </div>

        {/* Posts */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600"></div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <h3 className="font-semibold text-lg text-yellow-800 mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">{post.content}</p>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>Por: {post.author_name || "Fundación"}</span>
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-yellow-700 text-lg">No hay publicaciones disponibles en este momento.</p>
              </div>
            )}
          </div>
        )}

        {/* Modal de solicitud */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold text-yellow-800 mb-4">Solicitar Rol</h3>
              <p className="text-gray-600 mb-4">
                Para obtener más permisos en la plataforma, contacta al administrador con tu solicitud.
              </p>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rol solicitado</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500">
                    <option>Voluntario</option>
                    <option>Colaborador</option>
                    <option>Editor</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Motivo de la solicitud</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500"
                    rows="3"
                    placeholder="Explica por qué necesitas este rol..."
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowRequestForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => {
                    alert("Solicitud enviada. Te contactaremos pronto.")
                    setShowRequestForm(false)
                  }}
                  className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

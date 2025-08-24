"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  FileText,
  Tag,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Calendar,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"
import Navigation from "../components/Navigation.jsx"
import { postsAPI, categoriesAPI } from "../api"
import useAuth from "../context/useAuth.jsx"

export default function EditorDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("posts")
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Estados para modales
  const [showPostModal, setShowPostModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // Estados para formularios
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
    category: "",
    status: "draft"
  })

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: ""
  })

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [postsData, categoriesData] = await Promise.all([
        postsAPI.getMyPosts(),
        categoriesAPI.getAll()
      ])
      setPosts(postsData.results || postsData)
      setCategories(categoriesData)
    } catch (err) {
      console.error("Error cargando datos:", err)
      setError("No se pudieron cargar los datos")
    } finally {
      setLoading(false)
    }
  }

  // Filtrar posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !selectedStatus || post.status === selectedStatus
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    return matchesSearch && matchesStatus && matchesCategory
  })

  // Filtrar categorías
  const filteredCategories = categories.filter(category => {
    return category.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  // Función para obtener nombre de categoría
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : "Sin categoría"
  }

  // Función para obtener estado del post
  const getPostStatus = (status) => {
    const statusConfig = {
      draft: { label: "Borrador", color: "bg-gray-100 text-gray-800", icon: <Clock className="w-4 h-4" /> },
      published: { label: "Publicado", color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4" /> },
      archived: { label: "Archivado", color: "bg-yellow-100 text-yellow-800", icon: <AlertCircle className="w-4 h-4" /> }
    }
    const config = statusConfig[status] || statusConfig.draft
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </span>
    )
  }

  // Función para limpiar formularios
  const clearForms = () => {
    setPostForm({
      title: "",
      content: "",
      category: "",
      status: "draft"
    })
    setCategoryForm({
      name: "",
      slug: ""
    })
    setEditingItem(null)
  }

  // Función para abrir modal de post
  const openPostModal = (post = null) => {
    if (post) {
      setPostForm({
        title: post.title,
        content: post.content,
        category: post.category || "",
        status: post.status
      })
      setEditingItem(post)
    } else {
      clearForms()
    }
    setShowPostModal(true)
  }

  // Función para abrir modal de categoría
  const openCategoryModal = (category = null) => {
    if (category) {
      setCategoryForm({
        name: category.name,
        slug: category.slug
      })
      setEditingItem(category)
    } else {
      clearForms()
    }
    setShowCategoryModal(true)
  }

  // Función para guardar post
  const savePost = async () => {
    try {
      if (editingItem) {
        await postsAPI.update(editingItem.id, postForm)
      } else {
        await postsAPI.create(postForm)
      }
      setShowPostModal(false)
      clearForms()
      fetchData()
    } catch (err) {
      console.error("Error guardando post:", err)
      alert("Error al guardar el post")
    }
  }

  // Función para guardar categoría
  const saveCategory = async () => {
    try {
      if (editingItem) {
        await categoriesAPI.update(editingItem.id, categoryForm)
      } else {
        await categoriesAPI.create(categoryForm)
      }
      setShowCategoryModal(false)
      clearForms()
      fetchData()
    } catch (err) {
      console.error("Error guardando categoría:", err)
      alert("Error al guardar la categoría")
    }
  }

  // Función para eliminar post
  const deletePost = async (postId) => {
    if (confirm("¿Estás seguro de que quieres eliminar este post?")) {
      try {
        await postsAPI.delete(postId)
        fetchData()
      } catch (err) {
        console.error("Error eliminando post:", err)
        alert("Error al eliminar el post")
      }
    }
  }

  // Función para eliminar categoría
  const deleteCategory = async (categoryId) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      try {
        await categoriesAPI.delete(categoryId)
        fetchData()
      } catch (err) {
        console.error("Error eliminando categoría:", err)
        alert("Error al eliminar la categoría")
      }
    }
  }

  // Función para cambiar estado del post
  const changePostStatus = async (postId, newStatus) => {
    try {
      await postsAPI.partialUpdate(postId, { status: newStatus })
      fetchData()
    } catch (err) {
      console.error("Error cambiando estado del post:", err)
      alert("Error al cambiar el estado del post")
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-gray-600 mt-4 text-lg">Cargando dashboard...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={fetchData}
              className="btn-primary"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Navigation />
      
      {/* Header del Dashboard */}
      <section className="py-6 sm:py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Panel de Editor</h1>
              <p className="text-sm sm:text-base text-gray-600">Gestiona noticias y categorías del sistema</p>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-xs sm:text-sm text-gray-600">Bienvenido,</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 truncate max-w-[150px]">
                  {user?.first_name} {user?.last_name}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Tabs de navegación */}
          <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === "posts"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Mis Noticias</span>
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors duration-200 ${
                activeTab === "categories"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Categorías</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contenido del Dashboard */}
      <section className="px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Filtros y búsqueda */}
          <div className="card mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {showFilters && (
                  <div className="flex items-center space-x-4">
                    {activeTab === "posts" && (
                      <>
                        <select
                          value={selectedStatus}
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Todos los estados</option>
                          <option value="draft">Borrador</option>
                          <option value="published">Publicado</option>
                          <option value="archived">Archivado</option>
                        </select>
                        
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Todas las categorías</option>
                          {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={`Buscar ${activeTab === "posts" ? "noticias" : "categorías"}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Botones de acción según la pestaña activa */}
                {activeTab === "posts" && (
                  <button
                    onClick={() => openPostModal()}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nueva Noticia</span>
                  </button>
                )}

                {activeTab === "categories" && (
                  <button
                    onClick={() => openCategoryModal()}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nueva Categoría</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabla de Posts */}
          {activeTab === "posts" && (
            <div className="card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Título
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{post.title}</div>
                          <div className="text-sm text-gray-500">{post.slug}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getCategoryName(post.category)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getPostStatus(post.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(post.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Link
                              to={`/posts/${post.slug}`}
                              className="text-blue-600 hover:text-blue-900"
                              title="Ver post"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => openPostModal(post)}
                              className="text-green-600 hover:text-green-900"
                              title="Editar post"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deletePost(post.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Eliminar post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredPosts.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    {searchQuery || selectedStatus || selectedCategory 
                      ? "No se encontraron noticias con los filtros aplicados"
                      : "No tienes noticias creadas aún"
                    }
                  </p>
                  {!searchQuery && !selectedStatus && !selectedCategory && (
                    <button
                      onClick={() => openPostModal()}
                      className="btn-primary"
                    >
                      Crear tu primera noticia
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Tabla de Categorías */}
          {activeTab === "categories" && (
            <div className="card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nombre
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Slug
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Posts
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredCategories.map((category) => (
                      <tr key={category.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {category.slug}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {posts.filter(post => post.category === category.id).length} posts
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => openCategoryModal(category)}
                              className="text-green-600 hover:text-green-900"
                              title="Editar categoría"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteCategory(category.id)}
                              className="text-red-600 hover:text-red-900"
                              title="Eliminar categoría"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <Tag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    {searchQuery 
                      ? "No se encontraron categorías con la búsqueda aplicada"
                      : "No hay categorías creadas aún"
                    }
                  </p>
                  {!searchQuery && (
                    <button
                      onClick={() => openCategoryModal()}
                      className="btn-primary"
                    >
                      Crear primera categoría
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Modal de Post */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingItem ? "Editar Noticia" : "Nueva Noticia"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título *</label>
                <input
                  type="text"
                  value={postForm.title}
                  onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Escribe el título de la noticia"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contenido *</label>
                <textarea
                  rows={8}
                  value={postForm.content}
                  onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Escribe el contenido de la noticia..."
                />
                <p className="mt-1 text-sm text-gray-500">
                  Mínimo 10 caracteres. Actual: {postForm.content.length}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría *</label>
                  <select
                    value={postForm.category}
                    onChange={(e) => setPostForm({...postForm, category: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Seleccionar categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Estado</label>
                  <select
                    value={postForm.status}
                    onChange={(e) => setPostForm({...postForm, status: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="draft">Borrador</option>
                    <option value="published">Publicado</option>
                    <option value="archived">Archivado</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPostModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={savePost}
                disabled={!postForm.title.trim() || !postForm.content.trim() || !postForm.category}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingItem ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Categoría */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingItem ? "Editar Categoría" : "Nueva Categoría"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre *</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nombre de la categoría"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug *</label>
                <input
                  type="text"
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({...categoryForm, slug: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="slug-de-la-categoria"
                />
                <p className="mt-1 text-sm text-gray-500">
                  URL amigable para la categoría
                </p>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCategoryModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={saveCategory}
                disabled={!categoryForm.name.trim() || !categoryForm.slug.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editingItem ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

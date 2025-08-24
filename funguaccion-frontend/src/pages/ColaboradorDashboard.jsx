"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Lightbulb,
  FileText,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Send,
  MessageSquare,
} from "lucide-react"
import Navigation from "../components/Navigation.jsx"
import { postsAPI, categoriesAPI } from "../api"
import useAuth from "../context/useAuth.jsx"

export default function ColaboradorDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("suggestions")
  const [suggestions, setSuggestions] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Estados para modales
  const [showSuggestionModal, setShowSuggestionModal] = useState(false)
  const [editingSuggestion, setEditingSuggestion] = useState(null)

  // Estados para formularios
  const [suggestionForm, setSuggestionForm] = useState({
    title: "",
    content: "",
    category: "",
    type: "news", // news, event, article, story
    priority: "medium", // low, medium, high
    description: "", // descripción breve de la sugerencia
    sources: "", // fuentes o referencias
    estimated_impact: "medium" // low, medium, high
  })

  // Cargar datos al montar el componente
  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [suggestionsData, categoriesData] = await Promise.all([
        postsAPI.getMySuggestions(),
        categoriesAPI.getAll()
      ])
      setSuggestions(suggestionsData.results || suggestionsData)
      setCategories(categoriesData)
    } catch (err) {
      console.error("Error cargando datos:", err)
      setError("No se pudieron cargar los datos")
    } finally {
      setLoading(false)
    }
  }

  // Filtrar sugerencias
  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesSearch = suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         suggestion.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         suggestion.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !selectedStatus || suggestion.status === selectedStatus
    return matchesSearch && matchesStatus
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

  // Función para obtener estado de la sugerencia
  const getSuggestionStatus = (status) => {
    const statusConfig = {
      pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800", icon: <Clock className="w-4 h-4" /> },
      approved: { label: "Aprobada", color: "bg-green-100 text-green-800", icon: <CheckCircle className="w-4 h-4" /> },
      rejected: { label: "Rechazada", color: "bg-red-100 text-red-800", icon: <XCircle className="w-4 h-4" /> },
      under_review: { label: "En Revisión", color: "bg-blue-100 text-blue-800", icon: <AlertCircle className="w-4 h-4" /> }
    }
    const config = statusConfig[status] || statusConfig.pending
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.icon}
        <span className="ml-1">{config.label}</span>
      </span>
    )
  }

  // Función para obtener tipo de sugerencia
  const getSuggestionType = (type) => {
    const typeConfig = {
      news: { label: "Noticia", color: "bg-blue-100 text-blue-800" },
      event: { label: "Evento", color: "bg-purple-100 text-purple-800" },
      article: { label: "Artículo", color: "bg-green-100 text-green-800" },
      story: { label: "Historia", color: "bg-orange-100 text-orange-800" }
    }
    const config = typeConfig[type] || typeConfig.news
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  // Función para obtener prioridad
  const getPriority = (priority) => {
    const priorityConfig = {
      low: { label: "Baja", color: "bg-gray-100 text-gray-800" },
      medium: { label: "Media", color: "bg-yellow-100 text-yellow-800" },
      high: { label: "Alta", color: "bg-red-100 text-red-800" }
    }
    const config = priorityConfig[priority] || priorityConfig.medium
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  // Función para limpiar formularios
  const clearForms = () => {
    setSuggestionForm({
      title: "",
      content: "",
      category: "",
      type: "news",
      priority: "medium",
      description: "",
      sources: "",
      estimated_impact: "medium"
    })
    setEditingSuggestion(null)
  }

  // Función para abrir modal de sugerencia
  const openSuggestionModal = (suggestion = null) => {
    if (suggestion) {
      setSuggestionForm({
        title: suggestion.title,
        content: suggestion.content,
        category: suggestion.category || "",
        type: suggestion.type || "news",
        priority: suggestion.priority || "medium",
        description: suggestion.description || "",
        sources: suggestion.sources || "",
        estimated_impact: suggestion.estimated_impact || "medium"
      })
      setEditingSuggestion(suggestion)
    } else {
      clearForms()
    }
    setShowSuggestionModal(true)
  }

  // Función para guardar sugerencia
  const saveSuggestion = async () => {
    try {
      if (editingSuggestion) {
        await postsAPI.updateSuggestion(editingSuggestion.id, suggestionForm)
      } else {
        await postsAPI.createSuggestion(suggestionForm)
      }
      setShowSuggestionModal(false)
      clearForms()
      fetchData()
    } catch (err) {
      console.error("Error guardando sugerencia:", err)
      alert("Error al guardar la sugerencia")
    }
  }

  // Función para eliminar sugerencia
  const deleteSuggestion = async (suggestionId) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta sugerencia?")) {
      try {
        await postsAPI.deleteSuggestion(suggestionId)
        fetchData()
      } catch (err) {
        console.error("Error eliminando sugerencia:", err)
        alert("Error al eliminar la sugerencia")
      }
    }
  }

  // Función para obtener comentarios del editor/admin
  const getEditorComments = (suggestion) => {
    if (suggestion.editor_comments) {
      return (
        <div className="mt-2 p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">
            <strong>Comentarios del editor:</strong>
          </p>
          <p className="text-sm text-gray-800">{suggestion.editor_comments}</p>
        </div>
      )
    }
    return null
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
              <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Panel de Colaborador</h1>
              <p className="text-sm sm:text-base text-gray-600">Envía sugerencias de contenido y sigue su estado</p>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-xs sm:text-sm text-gray-600">Bienvenido,</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 truncate max-w-[150px]">
                  {user?.first_name} {user?.last_name}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Tabs de navegación */}
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("suggestions")}
              className={`flex items-center justify-center sm:justify-start space-x-2 px-3 sm:px-4 py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                activeTab === "suggestions"
                  ? "bg-orange-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span className="whitespace-nowrap">Mis Sugerencias</span>
            </button>
            <button
              onClick={() => setActiveTab("stats")}
              className={`flex items-center justify-center sm:justify-start space-x-2 px-3 sm:px-4 py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                activeTab === "stats"
                  ? "bg-orange-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="whitespace-nowrap">Estadísticas</span>
            </button>
          </div>
        </div>
      </section>

      {/* Contenido del Dashboard */}
      <section className="px-4 sm:px-6 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Filtros y búsqueda */}
          <div className="card mb-6">
            <div className="flex flex-col gap-4">
              {/* Primera fila: Filtros */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors duration-200 text-sm sm:text-base"
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {showFilters && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                    >
                      <option value="">Todos los estados</option>
                      <option value="pending">Pendiente</option>
                      <option value="under_review">En Revisión</option>
                      <option value="approved">Aprobada</option>
                      <option value="rejected">Rechazada</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Segunda fila: Búsqueda y botón */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar sugerencias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                  />
                </div>

                <button
                  onClick={() => openSuggestionModal()}
                  className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nueva Sugerencia</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabla de Sugerencias */}
          {activeTab === "suggestions" && (
            <div className="card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sugerencia
                      </th>
                      <th className="hidden sm:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="hidden lg:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prioridad
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="hidden md:table-cell px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fecha
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSuggestions.map((suggestion) => (
                      <tr key={suggestion.id} className="hover:bg-gray-50">
                        <td className="px-3 sm:px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 mb-1">{suggestion.title}</div>
                          <div className="text-xs sm:text-sm text-gray-500 max-w-[200px] sm:max-w-xs truncate mb-2">
                            {suggestion.description || "Sin descripción"}
                          </div>
                          {/* Información adicional en móvil */}
                          <div className="sm:hidden space-y-1">
                            <div className="text-xs text-gray-600">
                              <span className="font-medium">Tipo:</span> {getSuggestionType(suggestion.type)}
                            </div>
                            <div className="text-xs text-gray-600">
                              <span className="font-medium">Categoría:</span> {getCategoryName(suggestion.category)}
                            </div>
                            <div className="text-xs text-gray-600">
                              <span className="font-medium">Prioridad:</span> {getPriority(suggestion.priority)}
                            </div>
                            <div className="text-xs text-gray-600">
                              <span className="font-medium">Fecha:</span> {formatDate(suggestion.created_at)}
                            </div>
                          </div>
                          {getEditorComments(suggestion)}
                        </td>
                        <td className="hidden sm:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                          {getSuggestionType(suggestion.type)}
                        </td>
                        <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {getCategoryName(suggestion.category)}
                        </td>
                        <td className="hidden lg:table-cell px-3 sm:px-6 py-4 whitespace-nowrap">
                          {getPriority(suggestion.priority)}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          {getSuggestionStatus(suggestion.status)}
                        </td>
                        <td className="hidden md:table-cell px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(suggestion.created_at)}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => openSuggestionModal(suggestion)}
                              className="text-orange-600 hover:text-orange-900 p-1"
                              title="Editar sugerencia"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            {suggestion.status === "pending" && (
                              <button
                                onClick={() => deleteSuggestion(suggestion.id)}
                                className="text-red-600 hover:text-red-900 p-1"
                                title="Eliminar sugerencia"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredSuggestions.length === 0 && (
                <div className="text-center py-12">
                  <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">
                    {searchQuery || selectedStatus 
                      ? "No se encontraron sugerencias con los filtros aplicados"
                      : "No tienes sugerencias enviadas aún"
                    }
                  </p>
                  {!searchQuery && !selectedStatus && (
                    <button
                      onClick={() => openSuggestionModal()}
                      className="btn-primary"
                    >
                      Enviar tu primera sugerencia
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Estadísticas */}
          {activeTab === "stats" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="card text-center">
                <div className="p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {suggestions.length}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">Total Sugerencias</p>
                </div>
              </div>

              <div className="card text-center">
                <div className="p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {suggestions.filter(s => s.status === "pending").length}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">Pendientes</p>
                </div>
              </div>

              <div className="card text-center">
                <div className="p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {suggestions.filter(s => s.status === "approved").length}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">Aprobadas</p>
                </div>
              </div>

              <div className="card text-center">
                <div className="p-4 sm:p-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <XCircle className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2">
                    {suggestions.filter(s => s.status === "rejected").length}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600">Rechazadas</p>
                </div>
              </div>

              {/* Gráfico de tipos de sugerencias */}
              <div className="card col-span-1 sm:col-span-2 lg:col-span-4">
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-3 sm:mb-4">Tipos de Sugerencias</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                    {["news", "event", "article", "story"].map((type) => {
                      const count = suggestions.filter(s => s.type === type).length
                      const percentage = suggestions.length > 0 ? (count / suggestions.length) * 100 : 0
                      return (
                        <div key={type} className="text-center">
                          <div className="text-xl sm:text-2xl font-bold text-gray-900">{count}</div>
                          <div className="text-xs sm:text-sm text-gray-600 capitalize">{type}</div>
                          <div className="text-xs text-gray-500">{percentage.toFixed(1)}%</div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal de Sugerencia */}
      {showSuggestionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-4">
                {editingSuggestion ? "Editar Sugerencia" : "Nueva Sugerencia"}
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Título *</label>
                  <input
                    type="text"
                    value={suggestionForm.title}
                    onChange={(e) => setSuggestionForm({...suggestionForm, title: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                    placeholder="Título de la sugerencia"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Descripción breve *</label>
                  <textarea
                    rows={3}
                    value={suggestionForm.description}
                    onChange={(e) => setSuggestionForm({...suggestionForm, description: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                    placeholder="Describe brevemente tu sugerencia..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Contenido detallado *</label>
                  <textarea
                    rows={6}
                    value={suggestionForm.content}
                    onChange={(e) => setSuggestionForm({...suggestionForm, content: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                    placeholder="Desarrolla tu sugerencia con más detalle..."
                  />
                  <p className="mt-1 text-xs sm:text-sm text-gray-500">
                    Mínimo 50 caracteres. Actual: {suggestionForm.content.length}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tipo *</label>
                    <select
                      value={suggestionForm.type}
                      onChange={(e) => setSuggestionForm({...suggestionForm, type: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                    >
                      <option value="news">Noticia</option>
                      <option value="event">Evento</option>
                      <option value="article">Artículo</option>
                      <option value="story">Historia</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Categoría *</label>
                    <select
                      value={suggestionForm.category}
                      onChange={(e) => setSuggestionForm({...suggestionForm, category: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Prioridad</label>
                    <select
                      value={suggestionForm.priority}
                      onChange={(e) => setSuggestionForm({...suggestionForm, priority: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                    >
                      <option value="low">Baja</option>
                      <option value="medium">Media</option>
                      <option value="high">Alta</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Impacto Estimado</label>
                    <select
                      value={suggestionForm.estimated_impact}
                      onChange={(e) => setSuggestionForm({...suggestionForm, estimated_impact: e.target.value})}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                    >
                      <option value="low">Bajo</option>
                      <option value="medium">Medio</option>
                      <option value="high">Alto</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Fuentes o Referencias</label>
                  <textarea
                    rows={2}
                    value={suggestionForm.sources}
                    onChange={(e) => setSuggestionForm({...suggestionForm, sources: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 text-sm"
                    placeholder="Fuentes, enlaces o referencias que respalden tu sugerencia..."
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowSuggestionModal(false)}
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancelar
                </button>
                <button
                  onClick={saveSuggestion}
                  disabled={!suggestionForm.title.trim() || !suggestionForm.content.trim() || !suggestionForm.category || !suggestionForm.description.trim()}
                  className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
                >
                  <Send className="w-4 h-4 mr-2" />
                  {editingSuggestion ? "Actualizar" : "Enviar Sugerencia"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import {
  Users,
  UserPlus,
  Shield,
  FileText,
  Tag,
  Settings,
  Edit,
  Trash2,
  Eye,
  Plus,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  XCircle,
  AlertCircle,
  Lightbulb,
} from "lucide-react"
import Navigation from "../components/Navigation.jsx"
import { usersAPI, postsAPI, categoriesAPI } from "../api"
import useAuth from "../context/useAuth.jsx"

export default function AdminDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("users")
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [suggestions, setSuggestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  // Estados para modales
  const [showUserModal, setShowUserModal] = useState(false)
  const [showPostModal, setShowPostModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  // Estados para formularios
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    roles: []
  })

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
      const [usersData, postsData, categoriesData, suggestionsData] = await Promise.all([
        usersAPI.getAll(),
        postsAPI.getAll(),
        categoriesAPI.getAll(),
        postsAPI.getAllSuggestions()
      ])
      setUsers(usersData.results || usersData)
      setPosts(postsData.results || postsData)
      setCategories(categoriesData)
      setSuggestions(suggestionsData.results || suggestionsData)
    } catch (err) {
      console.error("Error cargando datos:", err)
      setError("No se pudieron cargar los datos")
    } finally {
      setLoading(false)
    }
  }

  // Filtrar usuarios
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         `${user.first_name} ${user.last_name}`.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = !selectedRole || user.roles.some(role => role.name === selectedRole)
    return matchesSearch && matchesRole
  })

  // Filtrar posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !selectedRole || post.status === selectedRole
    return matchesSearch && matchesStatus
  })

  // Filtrar categorías
  const filteredCategories = categories.filter(category => {
    return category.name.toLowerCase().includes(searchQuery.toLowerCase())
  })

  // Filtrar sugerencias
  const filteredSuggestions = suggestions.filter(suggestion => {
    const matchesSearch = suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         suggestion.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !selectedRole || suggestion.status === selectedRole
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

  // Función para obtener roles del usuario
  const getUserRoles = (userRoles) => {
    return userRoles.map(role => role.name).join(", ")
  }

  // Función para obtener nombre de categoría
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : "Sin categoría"
  }

  // Función para obtener nombre del autor
  const getAuthorName = (authorId) => {
    const author = users.find(u => u.id === authorId)
    if (author) {
      return author.first_name && author.last_name 
        ? `${author.first_name} ${author.last_name}`
        : author.username
    }
    return "Usuario desconocido"
  }

  // Función para obtener estado del post
  const getPostStatus = (status) => {
    const statusConfig = {
      draft: { label: "Borrador", color: "bg-gray-100 text-gray-800" },
      published: { label: "Publicado", color: "bg-green-100 text-green-800" },
      archived: { label: "Archivado", color: "bg-yellow-100 text-yellow-800" }
    }
    const config = statusConfig[status] || statusConfig.draft
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    )
  }

  // Función para limpiar formularios
  const clearForms = () => {
    setUserForm({
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      roles: []
    })
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

  // Función para abrir modal de usuario
  const openUserModal = (user = null) => {
    if (user) {
      setUserForm({
        username: user.username,
        email: user.email,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        password: "",
        roles: user.roles.map(role => role.id)
      })
      setEditingItem(user)
    } else {
      clearForms()
    }
    setShowUserModal(true)
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

  // Función para guardar usuario
  const saveUser = async () => {
    try {
      if (editingItem) {
        await usersAPI.update(editingItem.id, userForm)
      } else {
        await usersAPI.create(userForm)
      }
      setShowUserModal(false)
      clearForms()
      fetchData()
    } catch (err) {
      console.error("Error guardando usuario:", err)
      alert("Error al guardar el usuario")
    }
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

  // Función para eliminar usuario
  const deleteUser = async (userId) => {
    if (confirm("¿Estás seguro de que quieres eliminar este usuario?")) {
      try {
        await usersAPI.delete(userId)
        fetchData()
      } catch (err) {
        console.error("Error eliminando usuario:", err)
        alert("Error al eliminar el usuario")
      }
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

  // Función para aprobar sugerencia
  const approveSuggestion = async (suggestionId) => {
    try {
      await postsAPI.approveSuggestion(suggestionId, {})
      fetchData()
      alert("Sugerencia aprobada exitosamente")
    } catch (err) {
      console.error("Error aprobando sugerencia:", err)
      alert("Error al aprobar la sugerencia")
    }
  }

  // Función para rechazar sugerencia
  const rejectSuggestion = async (suggestionId, comments) => {
    try {
      await postsAPI.rejectSuggestion(suggestionId, { comments })
      fetchData()
      alert("Sugerencia rechazada exitosamente")
    } catch (err) {
      console.error("Error rechazando sugerencia:", err)
      alert("Error al rechazar la sugerencia")
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
              <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-2">Panel de Administración</h1>
              <p className="text-sm sm:text-base text-gray-600">Gestiona usuarios, contenido y configuración del sistema</p>
            </div>
            <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
              <div className="text-right hidden sm:block">
                <p className="text-xs sm:text-sm text-gray-600">Bienvenido,</p>
                <p className="text-sm sm:text-base font-semibold text-gray-900 truncate max-w-[150px]">
                  {user?.first_name} {user?.last_name}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
            </div>
          </div>

          {/* Tabs de navegación */}
          <div className="flex flex-wrap gap-1 bg-white rounded-lg p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                activeTab === "users"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Users className="w-4 h-4" />
              <span className="whitespace-nowrap">Usuarios</span>
            </button>
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                activeTab === "posts"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <FileText className="w-4 h-4" />
              <span className="whitespace-nowrap">Noticias</span>
            </button>
            <button
              onClick={() => setActiveTab("suggestions")}
              className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                activeTab === "suggestions"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span className="whitespace-nowrap">Sugerencias</span>
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                activeTab === "categories"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Tag className="w-4 h-4" />
              <span className="whitespace-nowrap">Categorías</span>
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center justify-center space-x-2 px-3 sm:px-4 py-2 rounded-md transition-colors duration-200 text-sm sm:text-base ${
                activeTab === "settings"
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Settings className="w-4 h-4" />
              <span className="whitespace-nowrap">Configuración</span>
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
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200 text-sm sm:text-base"
                >
                  <Filter className="w-4 h-4" />
                  Filtros
                  {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {showFilters && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    {activeTab === "users" && (
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      >
                        <option value="">Todos los roles</option>
                        <option value="admin">Admin</option>
                        <option value="editor">Editor</option>
                        <option value="colaborador">Colaborador</option>
                        <option value="voluntario">Voluntario</option>
                        <option value="visitante">Visitante</option>
                      </select>
                    )}
                    
                    {activeTab === "posts" && (
                      <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full sm:w-auto px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                      >
                        <option value="">Todos los estados</option>
                        <option value="draft">Borrador</option>
                        <option value="published">Publicado</option>
                        <option value="archived">Archivado</option>
                      </select>
                    )}
                  </div>
                )}
              </div>

              {/* Segunda fila: Búsqueda y botón */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 w-full">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder={`Buscar ${activeTab === "users" ? "usuarios" : activeTab === "posts" ? "noticias" : "categorías"}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                </div>

                {/* Botones de acción según la pestaña activa */}
                {activeTab === "users" && (
                  <button
                    onClick={() => openUserModal()}
                    className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Nuevo Usuario</span>
                  </button>
                )}

                {activeTab === "posts" && (
                  <button
                    onClick={() => openPostModal()}
                    className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nueva Noticia</span>
                  </button>
                )}

                {activeTab === "categories" && (
                  <button
                    onClick={() => openCategoryModal()}
                    className="btn-primary flex items-center justify-center space-x-2 w-full sm:w-auto text-sm sm:text-base"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nueva Categoría</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Tabla de Usuarios */}
          {activeTab === "users" && (
            <div className="card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Usuario
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roles
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-green-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.first_name} {user.last_name}
                              </div>
                              <div className="text-sm text-gray-500">@{user.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-1">
                            {user.roles.map((role) => (
                              <span
                                key={role.id}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {role.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Activo
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => openUserModal(user)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-900"
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
            </div>
          )}

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
                        Autor
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
                          {getAuthorName(post.author)}
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
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => openPostModal(post)}
                              className="text-green-600 hover:text-green-900"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deletePost(post.id)}
                              className="text-red-600 hover:text-red-900"
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
            </div>
          )}

          {/* Tabla de Sugerencias */}
          {activeTab === "suggestions" && (
            <div className="card">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sugerencia
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Colaborador
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prioridad
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
                    {filteredSuggestions.map((suggestion) => (
                      <tr key={suggestion.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{suggestion.title}</div>
                          <div className="text-sm text-gray-500 max-w-xs truncate">
                            {suggestion.description || "Sin descripción"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {suggestion.author ? `${suggestion.author.first_name} ${suggestion.author.last_name}` : "Usuario"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            suggestion.type === "news" ? "bg-blue-100 text-blue-800" :
                            suggestion.type === "event" ? "bg-purple-100 text-purple-800" :
                            suggestion.type === "article" ? "bg-green-100 text-green-800" :
                            "bg-orange-100 text-orange-800"
                          }`}>
                            {suggestion.type === "news" ? "Noticia" :
                             suggestion.type === "event" ? "Evento" :
                             suggestion.type === "article" ? "Artículo" : "Historia"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            suggestion.priority === "high" ? "bg-red-100 text-red-800" :
                            suggestion.priority === "medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-gray-100 text-gray-800"
                          }`}>
                            {suggestion.priority === "high" ? "Alta" :
                             suggestion.priority === "medium" ? "Media" : "Baja"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            suggestion.status === "pending" ? "bg-yellow-100 text-yellow-800" :
                            suggestion.status === "approved" ? "bg-green-100 text-green-800" :
                            suggestion.status === "rejected" ? "bg-red-100 text-red-800" :
                            "bg-blue-100 text-blue-800"
                          }`}>
                            {suggestion.status === "pending" ? "Pendiente" :
                             suggestion.status === "approved" ? "Aprobada" :
                             suggestion.status === "rejected" ? "Rechazada" : "En Revisión"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(suggestion.created_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            {suggestion.status === "pending" && (
                              <>
                               <button onClick={() => approveSuggestion(suggestion.id)}
                               className="text-green-600 hover:text-green-900" title="Aprobar sugerencia">
                                <CheckCircle className="w-4 h-4" />
                              </button>
                              <button onClick={() => {const comments = prompt("Comentarios de rechazo:")
                                  if (comments !== null) {
                                    rejectSuggestion(suggestion.id, comments)
                                  }
                                }}
                                className="text-red-600 hover:text-red-900"
                                title="Rechazar sugerencia">
                                <XCircle className="w-4 h-4" />
                              </button>
                              </>
                            )}
                            <button
                              onClick={() => {
                                // Mostrar detalles de la sugerencia
                                alert(`Título: ${suggestion.title}\nDescripción: ${suggestion.description}\nContenido: ${suggestion.content}`)
                              }}
                              className="text-blue-600 hover:text-blue-900"
                              title="Ver detalles"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
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
                    {searchQuery || selectedRole 
                      ? "No se encontraron sugerencias con los filtros aplicados"
                      : "No hay sugerencias pendientes"
                    }
                  </p>
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
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteCategory(category.id)}
                              className="text-red-600 hover:text-red-900"
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
            </div>
          )}

          {/* Configuración del Sistema */}
          {activeTab === "settings" && (
            <div className="card">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Configuración del Sistema</h3>
                  <p className="text-gray-600">Aquí puedes configurar parámetros generales del sistema.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Información General</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Nombre de la Fundación</label>
                        <input
                          type="text"
                          defaultValue="Fundación Guajira en Acción"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Email de contacto</label>
                        <input
                          type="email"
                          defaultValue="funguaccion@gmail.com"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Configuración de Posts</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Posts por página</label>
                        <input
                          type="number"
                          defaultValue="10"
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Moderación automática</label>
                        <select className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                          <option>Desactivada</option>
                          <option>Activada</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="btn-primary">
                    Guardar Configuración
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Modal de Usuario */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingItem ? "Editar Usuario" : "Nuevo Usuario"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={userForm.username}
                  onChange={(e) => setUserForm({...userForm, username: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nombre</label>
                  <input
                    type="text"
                    value={userForm.first_name}
                    onChange={(e) => setUserForm({...userForm, first_name: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Apellido</label>
                  <input
                    type="text"
                    value={userForm.last_name}
                    onChange={(e) => setUserForm({...userForm, last_name: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
              {!editingItem && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contraseña</label>
                  <input
                    type="password"
                    value={userForm.password}
                    onChange={(e) => setUserForm({...userForm, password: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">Roles</label>
                <select
                  multiple
                  value={userForm.roles}
                  onChange={(e) => setUserForm({...userForm, roles: Array.from(e.target.selectedOptions, option => option.value)})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                >
                  <option value="admin">Admin</option>
                  <option value="editor">Editor</option>
                  <option value="colaborador">Colaborador</option>
                  <option value="voluntario">Voluntario</option>
                  <option value="visitante">Visitante</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowUserModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={saveUser}
                className="btn-primary"
              >
                {editingItem ? "Actualizar" : "Crear"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Post */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {editingItem ? "Editar Noticia" : "Nueva Noticia"}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Título</label>
                <input
                  type="text"
                  value={postForm.title}
                  onChange={(e) => setPostForm({...postForm, title: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Contenido</label>
                <textarea
                  rows={8}
                  value={postForm.content}
                  onChange={(e) => setPostForm({...postForm, content: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Categoría</label>
                  <select
                    value={postForm.category}
                    onChange={(e) => setPostForm({...postForm, category: e.target.value})}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
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
                className="btn-primary"
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
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug</label>
                <input
                  type="text"
                  value={categoryForm.slug}
                  onChange={(e) => setCategoryForm({...categoryForm, slug: e.target.value})}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                />
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
                className="btn-primary"
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

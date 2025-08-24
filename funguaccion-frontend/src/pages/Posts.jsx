"use client"

import { useState, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"
import {
  Calendar,
  User,
  ArrowRight,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import Navigation from "../components/Navigation.jsx"
import { postsAPI, categoriesAPI } from "../api"

export default function Posts() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [posts, setPosts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "")
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "")
  const [showFilters, setShowFilters] = useState(false)

  // Cargar categorías al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await categoriesAPI.getAll()
        setCategories(categoriesData)
      } catch (err) {
        console.error("Error cargando categorías:", err)
      }
    }
    fetchCategories()
  }, [])

  // Cargar posts cuando cambien los filtros
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        setPage(1)
        
        const params = {
          ordering: "-created_at",
          page: 1,
        }
        
        if (selectedCategory) {
          params.category = selectedCategory
        }
        
        if (searchQuery) {
          params.search = searchQuery
        }

        const postsData = await postsAPI.getPublished(params)
        setPosts(postsData.results || postsData)
        setHasMore(postsData.next ? true : false)
        
        // Actualizar URL con los filtros
        const newSearchParams = new URLSearchParams()
        if (selectedCategory) newSearchParams.set("category", selectedCategory)
        if (searchQuery) newSearchParams.set("search", searchQuery)
        setSearchParams(newSearchParams)
        
      } catch (err) {
        console.error("Error cargando posts:", err)
        setError("No se pudieron cargar las noticias")
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [selectedCategory, searchQuery, setSearchParams])

  // Cargar más posts (paginación)
  const loadMorePosts = async () => {
    if (loading || !hasMore) return

    try {
      const nextPage = page + 1
      const params = {
        ordering: "-created_at",
        page: nextPage,
      }
      
      if (selectedCategory) {
        params.category = selectedCategory
      }
      
      if (searchQuery) {
        params.search = searchQuery
      }

      const postsData = await postsAPI.getPublished(params)
      const newPosts = postsData.results || postsData
      
      setPosts(prev => [...prev, ...newPosts])
      setPage(nextPage)
      setHasMore(postsData.next ? true : false)
    } catch (err) {
      console.error("Error cargando más posts:", err)
    }
  }

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    return new Date(dateString).toLocaleDateString('es-ES', options)
  }

  // Función para obtener nombre de categoría
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId)
    return category ? category.name : "Sin categoría"
  }

  // Función para truncar texto
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  // Limpiar filtros
  const clearFilters = () => {
    setSelectedCategory("")
    setSearchQuery("")
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Navigation currentPage="posts" />
      
      {/* Header */}
      <section className="py-16 px-6 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold gradient-text mb-6">
            Noticias y Actualizaciones
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Mantente informado sobre nuestros proyectos, logros y el impacto que generamos en La Guajira
          </p>
        </div>
      </section>

      {/* Filtros y Búsqueda */}
      <section className="px-6 mb-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="card">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              {/* Botón de filtros */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-200"
              >
                <Filter className="w-4 h-4" />
                Filtros
                {showFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {/* Búsqueda */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar noticias..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Botón limpiar filtros */}
              {(selectedCategory || searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  Limpiar filtros
                </button>
              )}
            </div>

            {/* Panel de filtros expandible */}
            {showFilters && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Filtro por categoría */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Todas las categorías</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Lista de Posts */}
      <section className="px-6 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {loading && page === 1 ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
              <p className="text-gray-600 mt-2">Cargando noticias...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-600">{error}</p>
            </div>
          ) : posts && posts.length > 0 ? (
            <>
              {/* Grid de posts */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {posts.map((post) => (
                  <article key={post.id} className="card hover:scale-105 transition-transform duration-300 group">
                    {post.cover && (
                      <div className="relative overflow-hidden rounded-t-lg mb-4">
                        <img
                          src={post.cover}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                            {getCategoryName(post.category)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-6">
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(post.created_at)}</span>
                        {post.author && (
                          <>
                            <span className="mx-2">•</span>
                            <User className="w-4 h-4 mr-2" />
                            <span>{post.author}</span>
                          </>
                        )}
                      </div>
                      
                      <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors duration-200">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {truncateText(post.content)}
                      </p>
                      
                      <Link
                        to={`/posts/${post.slug}`}
                        className="inline-flex items-center text-green-600 hover:text-green-700 font-medium group-hover:translate-x-1 transition-all duration-200"
                      >
                        Leer más
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Botón "Cargar más" */}
              {hasMore && (
                <div className="text-center">
                  <button
                    onClick={loadMorePosts}
                    disabled={loading}
                    className="btn-primary text-lg px-8 py-4 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Cargando...
                      </>
                    ) : (
                      <>
                        Cargar más noticias
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Mensaje cuando no hay más posts */}
              {!hasMore && posts.length > 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-600">Has visto todas las noticias disponibles.</p>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">No se encontraron noticias con los filtros aplicados.</p>
              <button
                onClick={clearFilters}
                className="mt-4 text-green-600 hover:text-green-700 underline"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

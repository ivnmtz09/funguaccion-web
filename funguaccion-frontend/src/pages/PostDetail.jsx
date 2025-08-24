"use client"

import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import {
  Calendar,
  User,
  ArrowLeft,
  Tag,
  Clock,
  Share2,
} from "lucide-react"
import Navigation from "../components/Navigation.jsx"
import { postsAPI, categoriesAPI } from "../api"

export default function PostDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])

  // Cargar el post y categorías
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Cargar categorías primero
        const categoriesData = await categoriesAPI.getAll()
        setCategories(categoriesData)
        
        // Cargar el post por slug
        const postsData = await postsAPI.getBySlug(slug)
        
        if (postsData && postsData.length > 0) {
          const postData = postsData[0] // Tomar el primer resultado
          setPost(postData)
          
          // Cargar posts relacionados de la misma categoría
          if (postData.category) {
            const relatedData = await postsAPI.getByCategory(postData.category, {
              ordering: "-created_at",
              limit: 3
            })
            // Filtrar el post actual
            const filteredRelated = (relatedData.results || relatedData)
              .filter(p => p.id !== postData.id)
              .slice(0, 3)
            setRelatedPosts(filteredRelated)
          }
        } else {
          setError("Post no encontrado")
        }
      } catch (err) {
        console.error("Error cargando post:", err)
        setError("No se pudo cargar la noticia")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchData()
    }
  }, [slug])

  // Función para formatear fecha
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
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

  // Función para truncar texto
  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  // Función para compartir
  const sharePost = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: truncateText(post.content, 200),
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error compartiendo:', err)
      }
    } else {
      // Fallback: copiar URL al portapapeles
      navigator.clipboard.writeText(window.location.href)
      alert('URL copiada al portapapeles')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-gray-600 mt-4 text-lg">Cargando noticia...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-6">{error || "Noticia no encontrada"}</p>
            <button
              onClick={() => navigate(-1)}
              className="btn-primary"
            >
              Volver atrás
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100">
      <Navigation currentPage="posts" />
      
      {/* Breadcrumb */}
      <section className="py-6 px-6">
        <div className="max-w-4xl mx-auto">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-green-600 transition-colors duration-200">
              Inicio
            </Link>
            <span>/</span>
            <Link to="/posts" className="hover:text-green-600 transition-colors duration-200">
              Noticias
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{post.title}</span>
          </nav>
        </div>
      </section>

      {/* Contenido principal del post */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header del post */}
          <header className="mb-8">
            {/* Categoría */}
            <div className="mb-4">
              <span className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                <Tag className="w-4 h-4 mr-2" />
                {getCategoryName(post.category)}
              </span>
            </div>

            {/* Título */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta información */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              
              {post.author && (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Por {post.author}</span>
                </div>
              )}
              
              {post.updated_at && post.updated_at !== post.created_at && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>Actualizado {formatDate(post.updated_at)}</span>
                </div>
              )}
            </div>

            {/* Botón compartir */}
            <button
              onClick={sharePost}
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </button>
          </header>

          {/* Imagen de portada */}
          {post.cover && (
            <div className="mb-8">
              <img
                src={post.cover}
                alt={post.title}
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Contenido del post */}
          <article className="prose prose-lg max-w-none mb-12">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {post.content}
            </div>
          </article>

          {/* Botón volver */}
          <div className="text-center mb-12">
            <Link
              to="/posts"
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver a Noticias
            </Link>
          </div>

          {/* Posts relacionados */}
          {relatedPosts.length > 0 && (
            <section className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Noticias relacionadas</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <article key={relatedPost.id} className="card hover:scale-105 transition-transform duration-300">
                    {relatedPost.cover && (
                      <div className="relative overflow-hidden rounded-t-lg mb-4">
                        <img
                          src={relatedPost.cover}
                          alt={relatedPost.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute top-2 left-2">
                          <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">
                            {getCategoryName(relatedPost.category)}
                          </span>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {truncateText(relatedPost.content)}
                      </p>
                      
                      <Link
                        to={`/posts/${relatedPost.slug}`}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Leer más →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      </section>
    </div>
  )
}

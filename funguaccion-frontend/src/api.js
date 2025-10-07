import axios from "axios"

// Detecta si estás en localhost o en red local
const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"

// Si estás en localhost usa el backend local, si no, usa la IP de tu red
const API_BASE = isLocalhost ? "http://localhost:8000" : "http://192.168.1.4:8000"

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: {
    "Content-Type": "application/json",
  },
})

// Interceptor: añade el token a cada request
api.interceptors.request.use((config) => {
  const access = localStorage.getItem("access")
  if (access) {
    config.headers.Authorization = `Bearer ${access}`
  }
  return config
})

// Interceptor: refresh automático si el token expira
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Si es 401 y no se ha intentado aún
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refresh = localStorage.getItem("refresh")

      if (!refresh) {
        console.warn("No hay refresh token disponible")
        // NO redirigir automáticamente, solo limpiar tokens
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
        return Promise.reject(error)
      }

      try {
        // Usar la misma API_BASE para refresh
        const response = await axios.post(`${API_BASE}/api/token/refresh/`, { refresh })
        const newAccess = response.data.access

        // Actualizar el token
        localStorage.setItem("access", newAccess)
        originalRequest.headers.Authorization = `Bearer ${newAccess}`

        // Reintenta la solicitud original
        return api(originalRequest)
      } catch (refreshError) {
        console.error("Error al refrescar token:", refreshError)

        // Limpiar tokens pero NO redirigir automáticamente
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")

        // Solo rechazar la promesa, la redirección la manejará el componente
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  },
)

  // ===== ROLES DE USUARIO =====
export const userRolesAPI = {
    updateRoles: async (id, roleIds) => {
      const response = await api.put(`/users/${id}/roles/`, { role_ids: roleIds })
      return response.data
    }
  }

  // ===== USUARIOS - ROLES =====
export const rolesAPI = {
  getAll: async () => {
    const response = await api.get("/users/roles/")  // <-- endpoint que debe existir en Django
    return response.data
  }
}

// ===== AUTENTICACIÓN =====
export const authAPI = {
  // Login
  login: async (credentials) => {
    const response = await axios.post(`${API_BASE}/api/token/`, credentials)
    return response.data
  },

  // Refresh token
  refreshToken: async (refresh) => {
    const response = await axios.post(`${API_BASE}/api/token/refresh/`, { refresh })
    return response.data
  },

  // Logout (limpiar tokens)
  logout: () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
  },
}

// ===== USUARIOS =====
export const usersAPI = {
  // Registro
  register: async (userData) => {
    const response = await api.post("/users/register/", userData)
    return response.data
  },

  // Login de usuarios
  login: async (credentials) => {
    const response = await api.post("/users/login/", credentials)
    return response.data
  },

  // Obtener perfil del usuario actual
  getProfile: async () => {
    const response = await api.get("/users/profile/")
    return response.data
  },

  // Actualizar perfil
  updateProfile: async (userData) => {
    const response = await api.put("/users/profile/", userData)
    return response.data
  },

  // Cambiar contraseña
  changePassword: async (passwordData) => {
    const response = await api.post("/users/change-password/", passwordData)
    return response.data
  },

  // Obtener todos los usuarios (solo admin)
  getAll: async () => {
    const response = await api.get("/users/")
    return response.data
  },

  // Obtener usuario por ID
  getById: async (id) => {
    const response = await api.get(`/users/${id}/`)
    return response.data
  },

  // Crear nuevo usuario
  create: async (userData) => {
    const response = await api.post("/users/", userData)
    return response.data
  },

  // Actualizar usuario
  update: async (id, userData) => {
    const response = await api.put(`/users/${id}/`, userData)
    return response.data
  },

  // Eliminar usuario
  delete: async (id) => {
    const response = await api.delete(`/users/${id}/`)
    return response.data
  },
}

// ===== FOUNDATION - CATEGORÍAS =====
export const categoriesAPI = {
  // Obtener todas las categorías (sin autenticación)
  getAll: async () => {
    const response = await axios.get(`${API_BASE}/api/foundation/categories/`)
    return response.data
  },

  // Obtener todas las categorías con autenticación
  getAllAuth: async () => {
    const response = await api.get("/foundation/categories/")
    return response.data
  },

  // Obtener categoría por ID
  getById: async (id) => {
    const response = await api.get(`/foundation/categories/${id}/`)
    return response.data
  },

  // Crear nueva categoría
  create: async (categoryData) => {
    const { name, slug } = categoryData
    const response = await api.post("/foundation/categories/", { name, slug })
    return response.data
  },

  // Actualizar categoría
  update: async (id, categoryData) => {
    const { name, slug } = categoryData
    const response = await api.put(`/foundation/categories/${id}/`, { name, slug })
    return response.data
  },

  // Eliminar categoría
  delete: async (id) => {
    const response = await api.delete(`/foundation/categories/${id}/`)
    return response.data
  },
}

// ===== FOUNDATION - POSTS =====
export const postsAPI = {
  // Obtener todos los posts
  getAll: async (params = {}) => {
    const response = await api.get("/foundation/posts/", { params })
    return response.data
  },

  // Obtener posts publicados (sin autenticación)
  getPublished: async (params = {}) => {
    const response = await axios.get(`${API_BASE}/api/foundation/posts/`, {
      params: { ...params, status: "published" },
    })
    return response.data
  },

  // Obtener posts publicados con autenticación
  getPublishedAuth: async (params = {}) => {
    const response = await api.get("/foundation/posts/", {
      params: { ...params, status: "published" },
    })
    return response.data
  },

  // Obtener post por ID
  getById: async (id) => {
    const response = await api.get(`/foundation/posts/${id}/`)
    return response.data
  },

  // Obtener post por slug
  getBySlug: async (slug) => {
    const response = await api.get("/foundation/posts/", {
      params: { slug },
    })
    return response.data
  },

  // Crear nuevo post
  create: async (postData) => {
    const payload = { ...postData }
    if (postData.category && postData.category.id) {
      payload.category_id = postData.category.id
      delete payload.category
    }
    const response = await api.post("/foundation/posts/", payload)
    return response.data
  },
  // Actualizar post
  update: async (id, postData) => {
    const payload = { ...postData }
    if (postData.category && postData.category.id) {
      payload.category_id = postData.category.id
      delete payload.category
    }
    const response = await api.put(`/foundation/posts/${id}/`, payload)
    return response.data
  },
  // Actualizar parcialmente post
  partialUpdate: async (id, postData) => {
    const response = await api.patch(`/foundation/posts/${id}/`, postData)
    return response.data
  },

  // Eliminar post
  delete: async (id) => {
    const response = await api.delete(`/foundation/posts/${id}/`)
    return response.data
  },

  // Buscar posts
  search: async (query, params = {}) => {
    const response = await api.get("/foundation/posts/", {
      params: { ...params, search: query },
    })
    return response.data
  },

  // Filtrar posts por categoría
  getByCategory: async (categoryId, params = {}) => {
    const response = await api.get("/foundation/posts/", {
      params: { ...params, category: categoryId },
    })
    return response.data
  },

  // Obtener posts del usuario actual
  getMyPosts: async (params = {}) => {
    const response = await api.get("/foundation/posts/", {
      params: { ...params, author: "me" },
    })
    return response.data
  },

  // ===== SUGERENCIAS =====
  // Obtener sugerencias del usuario actual
  getMySuggestions: async (params = {}) => {
    const response = await api.get("/foundation/suggestions/", {
      params: { ...params, author: "me" },
    })
    return response.data
  },

  // Obtener todas las sugerencias (para editores/admins)
  getAllSuggestions: async (params = {}) => {
    const response = await api.get("/foundation/suggestions/", { params })
    return response.data
  },

  // Crear nueva sugerencia
  createSuggestion: async (suggestionData) => {
    const response = await api.post("/foundation/suggestions/", suggestionData)
    return response.data
  },

  // Actualizar sugerencia
  updateSuggestion: async (id, suggestionData) => {
    const response = await api.put(`/foundation/suggestions/${id}/`, suggestionData)
    return response.data
  },

  // Eliminar sugerencia
  deleteSuggestion: async (id) => {
    const response = await api.delete(`/foundation/suggestions/${id}/`)
    return response.data
  },

  // Aprobar sugerencia (convertir a post)
  approveSuggestion: async (id, postData) => {
    const response = await api.post(`/foundation/suggestions/${id}/approve/`, postData)
    return response.data
  },

  // Rechazar sugerencia
  rejectSuggestion: async (id, rejectionData) => {
    const response = await api.post(`/foundation/suggestions/${id}/reject/`, rejectionData)
    return response.data
  },
}

// ===== FOUNDATION - DOCUMENTOS =====
export const documentsAPI = {
  // Obtener todos los documentos
  getAll: async (params = {}) => {
    const response = await api.get("/foundation/documents/", { params })
    return response.data
  },

  // Obtener documento por ID
  getById: async (id) => {
    const response = await api.get(`/foundation/documents/${id}/`)
    return response.data
  },

  // Crear nuevo documento
  create: async (documentData) => {
    const response = await api.post("/foundation/documents/", documentData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },

  // Actualizar documento
  update: async (id, documentData) => {
    const response = await api.put(`/foundation/documents/${id}/`, documentData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    return response.data
  },

  // Eliminar documento
  delete: async (id) => {
    const response = await api.delete(`/foundation/documents/${id}/`)
    return response.data
  },
}

// ===== FUNCIONES DE UTILIDAD =====
export const utilsAPI = {
  // Verificar si el usuario está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem("access")
  },

  // Obtener token de acceso
  getAccessToken: () => {
    return localStorage.getItem("access")
  },

  // Obtener token de refresh
  getRefreshToken: () => {
    return localStorage.getItem("refresh")
  },

  // Guardar tokens
  setTokens: (access, refresh) => {
    localStorage.setItem("access", access)
    localStorage.setItem("refresh", refresh)
  },

  // Limpiar tokens
  clearTokens: () => {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
  },
}

export const updatePostStatus = (id, status) =>
  api.patch(`/foundation/posts/${id}/`, { status })

export default api
export { API_BASE }

import axios from "axios"

// Detecta si estás en localhost o en red local
const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"

// Si estás en localhost usa el backend local, si no, usa la IP de tu red
const API_BASE = isLocalhost ? "http://localhost:8000" : "http://10.105.6.149:8000"

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

export default api
export { API_BASE }
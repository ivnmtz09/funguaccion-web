import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Inyectar el token en todas las peticiones automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Manejar errores globales (por ejemplo, 401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token inválido o expirado. Cerrando sesión automáticamente.");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    }
    return Promise.reject(error);
  }
);

export default api;

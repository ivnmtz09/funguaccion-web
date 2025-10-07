"use client";

import { Routes, Route } from "react-router-dom";
import useAuth from "./context/useAuth.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Páginas públicas
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Nosotros from "./pages/Nosotros.jsx";
import Programas from "./pages/Programas.jsx";
import Contacto from "./pages/Contacto.jsx";

// Páginas privadas
import UserInfo from "./pages/UserInfo.jsx";
import EditProfile from "./pages/EditProfile.jsx";

import api from "./utils/api.js";

export default function App() {
  const { loading, isInitialized } = useAuth();

  // Evita renderizar antes de que AuthContext esté listo
  if (loading || !isInitialized) {
    return <LoadingScreen />;
  }

  // Función para actualizar perfil
  const updateUserProfile = async (formData) => {
    try {
      await api.put("/users/me/", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
    } catch (error) {
      console.error("Error actualizando el perfil del usuario:", error);
    }
  };

  return (
    <Routes>
      {/* === Rutas públicas === */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/programas" element={<Programas />} />
      <Route path="/contacto" element={<Contacto />} />

      {/* === Rutas protegidas === */}
      <Route
        path="/me"
        element={
          <ProtectedRoute>
            <UserInfo />
          </ProtectedRoute>
        }
      />
      <Route
        path="/edit-profile"
        element={
          <ProtectedRoute>
            <EditProfile updateUserProfile={updateUserProfile} />
          </ProtectedRoute>
        }
      />

      {/* === 404 === */}
      <Route
        path="*"
        element={
          <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              404 - Página no encontrada
            </h1>
            <p className="text-gray-600 mb-4">
              La página que buscas no existe o fue movida.
            </p>
            <a
              href="/"
              className="btn-primary inline-flex items-center space-x-2"
            >
              Volver al inicio
            </a>
          </div>
        }
      />
    </Routes>
  );
}

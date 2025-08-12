"use client"

import { Routes, Route } from "react-router-dom"
import useAuth from "./context/useAuth.jsx"
import LoadingScreen from "./components/LoadingScreen.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import UserInfo from "./pages/UserInfo.jsx"
import Nosotros from "./pages/Nosotros.jsx"
import Programas from "./pages/Programas.jsx"
import Contacto from "./pages/Contacto.jsx"
import EditProfile from "./pages/EditProfile.jsx"
import api from './api'; // Asegúrate de que la ruta sea correcta

export default function App() {
  const { loading, isInitialized } = useAuth()

  // Mostrar pantalla de carga mientras se inicializa la autenticación
  if (!isInitialized || loading) {
    return <LoadingScreen />
  }

  const updateUserProfile = async (formData) => {
    try {
      await api.put('/users/me/', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`
        }
      });
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/programas" element={<Programas />} />
      <Route path="/contacto" element={<Contacto />} />

      {/* Rutas protegidas */}
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
    </Routes>
  )
}

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
import Posts from "./pages/Posts.jsx"
import PostDetail from "./pages/PostDetail.jsx"
// Importar dashboards
import AdminDashboard from "./pages/AdminDashboard.jsx"
import EditorDashboard from "./pages/EditorDashboard.jsx"
import ColaboradorDashboard from "./pages/ColaboradorDashboard.jsx"
import VolunteerDashboard from "./pages/VolunteerDashboard.jsx"
import VisitanteDashboard from "./pages/VisitanteDashboard.jsx"

import api from './api';

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
      <Route path="/posts" element={<Posts />} />
      <Route path="/posts/:slug" element={<PostDetail />} />

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
      {/* Dashboards por rol */}
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/editor-dashboard"
        element={
          <ProtectedRoute roles={["editor"]}>
            <EditorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/colaborador-dashboard"
        element={
          <ProtectedRoute roles={["colaborador"]}>
            <ColaboradorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/volunteer"
        element={
          <ProtectedRoute roles={["voluntario"]}>
            <VolunteerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/visitante-dashboard"
        element={
          <ProtectedRoute roles={["visitante"]}>
            <VisitanteDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

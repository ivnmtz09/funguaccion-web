import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import UserInfo from "./pages/UserInfo"
import Nosotros from "./pages/Nosotros"
import Programas from "./pages/Programas"
import Contacto from "./pages/Contacto"
import EditProfile from "./pages/EditProfile"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/me" element={<UserInfo />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/programas" element={<Programas />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/edit-profile" element={<EditProfile />} />
    </Routes>
  )
}

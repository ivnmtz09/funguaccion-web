import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/"); // redirige al home
    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas o error de servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-green-700">
          Iniciar Sesión
        </h2>
        {error && <p className="text-red-600 text-center">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Entrar
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-green-700 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </form>
    </div>
  );
}

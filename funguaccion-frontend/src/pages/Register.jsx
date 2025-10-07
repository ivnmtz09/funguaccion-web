import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../context/useAuth.jsx";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.password2) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const response = await register(formData);
      console.log("Usuario registrado:", response);
      setSuccess("Registro exitoso. Redirigiendo al inicio de sesión...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message ||
          "Error al registrarse. Verifica los datos e inténtalo nuevamente."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-green-700">
          Crear Cuenta
        </h2>

        {error && <p className="text-red-600 text-center">{error}</p>}
        {success && <p className="text-green-600 text-center">{success}</p>}

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="first_name"
            placeholder="Nombre"
            value={formData.first_name}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Apellido"
            value={formData.last_name}
            onChange={handleChange}
            className="p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

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

        <input
          type="password"
          name="password2"
          placeholder="Confirmar contraseña"
          value={formData.password2}
          onChange={handleChange}
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
        >
          Registrarme
        </button>

        <p className="text-center text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-green-700 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </div>
  );
}

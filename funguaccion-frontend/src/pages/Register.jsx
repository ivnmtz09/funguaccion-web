import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import logo from '../assets/logo.png';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('users/register/', formData);
      navigate('/login');
    } catch {
      alert('Error al registrarse');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md p-6">
        <img src={logo} alt="Logo Fundación" className="w-40 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center text-green-900 mb-4">Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="username" type="text" placeholder="Usuario" className="input-field" onChange={handleChange} required />
          <input name="email" type="email" placeholder="Correo electrónico" className="input-field" onChange={handleChange} required />
          <input name="first_name" type="text" placeholder="Nombre" className="input-field" onChange={handleChange} required />
          <input name="last_name" type="text" placeholder="Apellido" className="input-field" onChange={handleChange} required />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              className="input-field pr-10"
              onChange={handleChange}
              required
            />
            <span
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Ocultar' : 'Ver'}
            </span>
          </div>
          <button type="submit" className="btn-primary w-full">Registrar</button>
        </form>
        <p className="text-sm text-center mt-4">
          ¿Ya tienes una cuenta? <Link to="/login" className="text-[#2cb84a] hover:underline">Inicia sesión</Link>
        </p>
      </div>
    </div>
  );
}

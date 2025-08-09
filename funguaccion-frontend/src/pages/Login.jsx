import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';
import useAuth from '../context/useAuth';
import logo from '../assets/logo.png';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('users/login/', formData);
      login(res.data);
      navigate('/me');
    } catch {
      alert('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="card w-full max-w-md p-6 relative">
        <img src={logo} alt="Logo Fundación" className="w-40 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-center text-green-900 mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            type="text"
            placeholder="Usuario"
            className="input-field"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Contraseña"
              className="input-field pr-10"
              value={formData.password}
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
          <button type="submit" className="btn-primary w-full">Entrar</button>
        </form>
        <p className="text-sm text-center mt-4">
          ¿No tienes cuenta? <Link to="/register" className="text-[#2cb84a] hover:underline">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  );
}

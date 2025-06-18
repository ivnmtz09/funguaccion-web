import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    first_name: '',
    last_name: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await api.post('users/register/', form);
      navigate('/login'); // o /me si quieres auto-login
    } catch (err) {
      console.error(err);
      const msg =
        err.response?.data?.detail ||
        Object.values(err.response?.data || {})?.[0] ||
        'Error al registrarse';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="card w-full max-w-md">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Registrarse</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-900/50 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="first_name"
              type="text"
              placeholder="Nombre"
              value={form.first_name}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              name="last_name"
              type="text"
              placeholder="Apellidos"
              value={form.last_name}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              name="username"
              type="text"
              placeholder="Nombre de usuario"
              value={form.username}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              className="input-field"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              value={form.password}
              onChange={handleChange}
              className="input-field"
              required
            />

            <button
              type="submit"
              className="btn-primary w-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? 'Procesando...' : 'Registrarme'}
            </button>
          </form>
        </div>

        <div className="px-8 py-4 bg-gray-700/50 text-center text-sm">
          ¿Ya tienes una cuenta?{' '}
          <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
            Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;

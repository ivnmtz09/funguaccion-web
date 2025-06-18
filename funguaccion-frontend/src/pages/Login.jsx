import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import useAuth from '../context/useAuth';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await api.post('users/login/', { username, password });
      const { access, refresh, user } = response.data;
      login({ access, refresh, user });
      navigate('/me');
    } catch (err) {
      const msg = err.response?.data?.detail || 'Error al iniciar sesión';
      console.error('Error:', msg);
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass w-full max-w-md shadow-lg rounded-xl">
        <div className="p-8">
          <h2 className="gradient-text text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>

          {error && (
            <div className="mb-4 p-3 bg-red-900/30 text-red-300 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
              required
            />

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              required
            />

            <button type="submit" disabled={isLoading} className="btn-primary w-full">
              {isLoading ? 'Procesando...' : 'Entrar'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-400 mt-4">
            ¿No tienes cuenta?{' '}
            <a href="/register" className="text-indigo-400 hover:underline">
              Regístrate aquí
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';

function UserInfo() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Si no hay usuario, redirige al login
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null; // Mientras redirige, no renderiza nada

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md text-gray-800">
      <div className="flex justify-between items-center mb-6 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Perfil del Usuario</h1>
          <p className="text-gray-500 text-sm">Información personal y roles asignados</p>
        </div>
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200 transition"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-semibold text-lg text-blue-800 mb-2">Datos Personales</h2>
          <div className="text-sm space-y-2">
            <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Usuario:</strong> {user.username}</p>
            <p><strong>Correo:</strong> {user.email}</p>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-lg text-blue-800 mb-2">Roles</h2>
          {user.roles && user.roles.length > 0 ? (
            <ul className="space-y-2 text-sm">
              {user.roles.map((rol, index) => (
                <li
                  key={index}
                  className="bg-blue-50 border border-blue-200 p-3 rounded shadow-sm"
                >
                  <span className="block text-blue-900 font-semibold">{rol.title}</span>
                  <span className="text-gray-700">{rol.description}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-yellow-600">Este usuario no tiene roles asignados.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserInfo;

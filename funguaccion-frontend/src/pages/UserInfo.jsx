import { useNavigate } from 'react-router-dom';
import useAuth from '../context/useAuth';
import logo from '../assets/logo.png';

export default function UserInfo() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-3xl mx-auto p-6 card">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <div>
            <img src={logo} alt="Logo Fundación" className="w-40 mb-2" />
            <h1 className="text-2xl font-bold text-green-900">Perfil del Usuario</h1>
            <p className="text-gray-500 text-sm">Información personal y roles asignados</p>
          </div>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="btn-danger"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="font-semibold text-lg text-green-800 mb-2">Datos Personales</h2>
            <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Usuario:</strong> {user.username}</p>
            <p><strong>Correo:</strong> {user.email}</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg text-green-800 mb-2">Roles</h2>
            {user.roles?.length > 0 ? (
              <ul className="space-y-2">
                {user.roles.map((rol, index) => (
                  <li key={index} className="bg-green-50 border border-green-200 p-3 rounded shadow-sm hover:bg-green-200 transition">
                    <span className="block text-green-900 font-semibold">{rol.title}</span>
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
    </div>
  );
}

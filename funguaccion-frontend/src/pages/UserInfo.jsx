import useAuth from '../context/useAuth';

function UserInfo() {
  const { user, logout } = useAuth();

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-center space-y-2">
          <div className="w-12 h-12 bg-indigo-500 rounded-full mx-auto"></div>
          <div className="w-40 h-4 bg-gray-700 rounded mx-auto"></div>
          <div className="w-24 h-4 bg-gray-700 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto mt-10">
      <div className="glass p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center border-b border-gray-700 pb-4 mb-4">
          <h2 className="text-2xl font-bold gradient-text">Perfil de Usuario</h2>
          <button onClick={logout} className="btn-danger text-sm">Cerrar sesión</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-2">Información personal</h3>
            <p><strong>Nombre:</strong> {user.first_name} {user.last_name}</p>
            <p><strong>Usuario:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-2">Roles</h3>
            {user.roles && user.roles.length > 0 ? (
              <ul className="space-y-2">
                {user.roles.map((rol, i) => (
                  <li key={i} className="bg-gray-700/50 p-3 rounded-lg">
                    <strong className="text-indigo-400">{rol.title}</strong>: {rol.description}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-yellow-400">Este usuario no tiene roles asignados.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;

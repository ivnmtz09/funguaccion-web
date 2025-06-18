import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserInfo from './pages/UserInfo';
import useAuth from './context/useAuth';
import Register from './pages/Register';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isAuthenticated ? "/me" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/me" element={isAuthenticated ? <UserInfo /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
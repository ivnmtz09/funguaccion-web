import { createContext, useState, useEffect } from 'react';
import api from '../api';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      if (!accessToken) {
        setLoading(false);
        return;
      }
      try {
        const response = await api.get('users/me/');
        setUser(response.data);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [accessToken]);

  const login = ({ access, refresh, user }) => {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    setAccessToken(access);
    setUser(user);
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
    setAccessToken(null);
  };

  const value = { user, accessToken, isAuthenticated: !!user, loading, login, logout };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

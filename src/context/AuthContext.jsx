// src/context/AuthContext.jsx
import { createContext, useContext, useState } from 'react';

/**
 * Decodifica el payload de un JWT sin librerías externas.
 */
function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

const AuthContext = createContext();

/**
 * Proveedor de autenticación:
 * - Guarda token en localStorage
 * - Decodifica y guarda user (payload) en estado
 * - Expone login(), logout(), user y isAuthenticated
 */
export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('token');
    const parsed = token ? parseJwt(token) : null;
    if (parsed) console.log("🔐 JWT payload:", parsed);
    return parsed;
  });

  const login = newToken => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(parseJwt(newToken));
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      token,
      user,
      login,
      logout,
      isAuthenticated: Boolean(token)
    }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook para acceder al contexto de auth:
 * const { user, login, logout, isAuthenticated } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);

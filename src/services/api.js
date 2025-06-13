/* const API_BASE_URL = 'http://localhost:2636/api/v1'; //Puerto */

export const testConnection = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error de conexión:', error);
    return null;
  }
}; 

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:2636/api/v1';

/**
 * Lanza una petición fetch con JSON y token guardado.
 */
export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: token } : {})
  };

  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...headers,
      ...(options.headers || {})
    }
  });

  // Opcional: interceptar 401 y forzar logout
  if (res.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }

  return res.json();
}


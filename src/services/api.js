// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:2636/api/v1';

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: token }),
      ...(options.headers || {})
    }
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error('No se pudo interpretar la respuesta JSON');
  }

  if (!res.ok) {
    // Construyo un Error y le acoplo toda la respuesta
    const err = new Error(data.message || `Error ${res.status}`);
    err.status = res.status;
    err.payload = data;
    throw err;
  }

  return data;
}
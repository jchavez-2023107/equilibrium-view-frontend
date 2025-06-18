// src/services/api.js
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:2636/api/v1';

export async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
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
    const err = new Error(data.message || `Error ${res.status}`);
    err.status = res.status;
    err.payload = data;
    throw err;
  }

  return data;
}

export const fetchMyProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token no disponible');
  console.log("TOKEN:", token);

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  const payload = JSON.parse(jsonPayload);

  const id = payload.uid; // 🔥 ESTE es el campo correcto
  if (!id) throw new Error('No se pudo obtener el ID del usuario');

  const data = await apiFetch(`/users/${id}`);
  return data.user;
};

export const updateProfile = async (updatedProfile) => {
  const token = localStorage.getItem('token');
  if (!token) throw new Error('Token no disponible');

  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  );
  const payload = JSON.parse(jsonPayload);
  const id = payload.uid;

  const data = await apiFetch(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ profile: updatedProfile })
  });

  return data.user;
};
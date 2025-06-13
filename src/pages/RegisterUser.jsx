import { useState } from 'react';
import { apiFetch } from '../services/api.js';
import { useNavigate } from 'react-router-dom';

export default function RegisterUser() {
  const [form, setForm] = useState({});
  const nav = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await apiFetch('/users', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      alert('Usuario registrado');
      nav('/login');
    } catch (err) {
      console.error(err);
      alert(err.message || 'Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Pon aquí todos tus inputs con name=... según la colección de Postman */}
      <input name="username" onChange={handleChange} placeholder="Nombre de Usuario" />
      {/* etc. */}
      <button type="submit">Registrarme</button>
    </form>
  );
}

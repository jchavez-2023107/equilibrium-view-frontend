import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api.js';

export default function RegisterUser() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    profile: {
      displayName: '',
      displayUsername: '',
      birthDate: '',
      bio: '',
      contactNumber: '',
      especialidad: ''
    }
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name.startsWith('profile.')) {
      const key = name.split('.')[1];
      setForm(f => ({
        ...f,
        profile: {
          ...f.profile,
          [key]: value
        }
      }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    // simple client-side check
    if (form.password !== form.passwordConfirm) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await apiFetch('/users', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      alert('¡Usuario registrado con éxito!');
      navigate('/login');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al registrar usuario');
    }
  };

  return (
    <div>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Nombre de usuario"
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña (mínimo 5 caracteres)"
            minLength={5}
            required
          />
        </div>
        <div>
          <label>Confirmar Contraseña</label>
          <input
            name="passwordConfirm"
            type="password"
            value={form.passwordConfirm}
            onChange={handleChange}
            placeholder="Reingresa la contraseña"
            minLength={5}
            required
          />
        </div>
        <hr />
        <div>
          <label>Nombre completo</label>
          <input
            name="profile.displayName"
            value={form.profile.displayName}
            onChange={handleChange}
            placeholder="Tu nombre completo"
          />
        </div>
        <div>
          <label>Apodo público</label>
          <input
            name="profile.displayUsername"
            value={form.profile.displayUsername}
            onChange={handleChange}
            placeholder="Cómo te verán otros usuarios"
          />
        </div>
        <div>
          <label>Fecha de nacimiento</label>
          <input
            name="profile.birthDate"
            type="date"
            value={form.profile.birthDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Biografía</label>
          <textarea
            name="profile.bio"
            value={form.profile.bio}
            onChange={handleChange}
            placeholder="Cuéntanos sobre ti"
          />
        </div>
        <div>
          <label>Teléfono</label>
          <input
            name="profile.contactNumber"
            value={form.profile.contactNumber}
            onChange={handleChange}
            placeholder="1234-5678"
            maxLength={12}
          />
        </div>
        <div>
          <label>Especialidad</label>
          <input
            name="profile.especialidad"
            value={form.profile.especialidad}
            onChange={handleChange}
            placeholder="¿En qué eres experto?"
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Registrarme</button>
      </form>
    </div>
  );
}
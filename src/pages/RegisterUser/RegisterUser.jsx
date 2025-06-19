import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../services/api.js';
import './../RegisterUser/RegisterUs.css';
import logo from '../../assets/img/logo.png';

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
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
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
    setSuccess('');
    setLoading(true);

    if (form.password !== form.passwordConfirm) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      await apiFetch('/users', {
        method: 'POST',
        body: JSON.stringify(form)
      });
      setSuccess('¡Usuario registrado con éxito!');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="left-panel">
          <h1 className="logo">EQUILIBRIUM</h1>
          <img src={logo} alt="Logo" className="register-logo" />
          <p className="welcome-message">Aquí empieza tu<br />momento de paz.</p>
        </div>

        <div className="right-panel">
          <h2>REGÍSTRATE</h2>
          <form onSubmit={handleSubmit} className="register-form">
            <Input name="email" type="email" placeholder="Correo Electrónico" value={form.email} onChange={handleChange} icon="📧" required />
            <Input name="username" placeholder="Nombre de Usuario" value={form.username} onChange={handleChange} icon="👤" required />
            <Input name="profile.displayName" placeholder="Nombre Completo" value={form.profile.displayName} onChange={handleChange} icon="👤" />
            <Input name="profile.displayUsername" placeholder="Nombre Público" value={form.profile.displayUsername} onChange={handleChange} icon="🆔" />
            <Input name="profile.birthDate" type="date" placeholder="Fecha de Nacimiento" value={form.profile.birthDate} onChange={handleChange} icon="📅" />
            <Input name="profile.contactNumber" placeholder="No. Teléfono" value={form.profile.contactNumber} onChange={handleChange} icon="📱" />
            <Input name="profile.especialidad" placeholder="Especialidad" value={form.profile.especialidad} onChange={handleChange} icon="🎓" />
            <textarea name="profile.bio" placeholder="Biografía" value={form.profile.bio} onChange={handleChange} className="input-textarea" />

            <Input name="password" type="password" placeholder="Contraseña" value={form.password} onChange={handleChange} icon="🔒" minLength={5} required />
            <Input name="passwordConfirm" type="password" placeholder="Confirmar Contraseña" value={form.passwordConfirm} onChange={handleChange} icon="🔒" minLength={5} required />

            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}

            <button type="submit" className="register-button" disabled={loading}>
              {loading ? 'Registrando...' : 'Registrate'}
            </button>
          </form>

          <div className="login-link">
            <a href="/login">
              ¿Ya tienes una cuenta?<br />
              <strong>Inicia Sesión</strong>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Componente auxiliar Input para limpiar el JSX
function Input({ name, type = "text", placeholder, value, onChange, icon, ...rest }) {
  return (
    <div className="input-group">
      <span className="input-icon">{icon}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
}
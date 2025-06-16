import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './../Login/Login.css';
import logo from "../../img/Logo.png";

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

export default function Login() {
  const [userlogin, setUserlogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { token } = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ userlogin, password })
      });

      login(token);
      const payload = parseJwt(token);
      const role = payload?.role;

      if (role === 'ADMIN') {
        alert('Usted es admin, puede hacer lo que quiera. ¡Lindo día!');
        return;
      }

      if (role === 'VOLUNTEER') {
        navigate('/main-volunteer');
      } else {
        navigate('/main-user');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
  <div className="login-container">
    <div className="login-wrapper">{/* 👈 Nuevo contenedor agregado */}
      <div className="left-panel">
        <h1 className="logo">EQUILIBRIUM</h1>
        <img src={logo} alt="Logo" className="login-logo" />
        <p className="thanks-message">¡Gracias por elegir<br />cuidar de ti!</p>
      </div>

      <div className="right-panel">
        <h2>INICIA SESIÓN</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              name="userlogin"
              value={userlogin}
              onChange={e => setUserlogin(e.target.value)}
              placeholder="Nombre de Usuario / Correo"
              required
            />
          </div>
          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="login-button">Iniciar Sesión</button>
        </form>
          <div className="signup-container">
          <a href="/register" className="signup-link-combined">
            ¿No tienes una cuenta?<br />
            <strong>Crea una</strong>
          </a>
        </div>
      </div>
    </div>
  </div>
);
}

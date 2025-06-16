import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../services/api.js';
import { useAuth } from '../../context/AuthContext.jsx'

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

      // Guardar token y usuario en contexto
      login(token);

      // Decodificar rol
      const payload = parseJwt(token);
      const role = payload?.role;

      if (role === 'ADMIN') {
        alert('Usted es admin, puede hacer lo que quiera. ¡Lindo día!');
        // opcional: navigate a un dashboard de admin o simplemente quedarse
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
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuario o Correo</label>
          <input
            name="userlogin"
            value={userlogin}
            onChange={e => setUserlogin(e.target.value)}
            placeholder="Usuario o correo"
            required
          />
        </div>
        <div>
          <label>Contraseña</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Iniciar Sesión</button>
        <Link to="/register" className="">¿No tienes una cuenta? Crea una</Link>
      </form>
    </div>
  );
}
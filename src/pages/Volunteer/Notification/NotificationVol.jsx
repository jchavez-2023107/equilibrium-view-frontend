import React from 'react';
import { useNotifications } from '../../../hooks/useNotification'
import './Notifications.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/Logo.png';
import userImage from '../../../assets/img/user.png';
import { useAuth } from '../../../context/AuthContext';

export default function NotificationsVol() {
  const { notifications, loading, fetchNotifications } = useNotifications();
  const { user } = useAuth();

  return (
       <div className="notifications-page">
          {/* Header agregado */}
          <header className="encabezado">
            <div className="encabezado-izquierda">
              <Link to="/main-volunteer">
                <img src={logo} alt="Logo Equilibrium" className="logo" />
              </Link>
              <h1 className="titulo">EQUILIBRIUM</h1>
            </div>
            <div className="encabezado-derecha">
              <Link to="/chat-vol" className="nav">CHATS</Link>
              <Link to="/help-vol" className="nav">AYUDA</Link>
              <span className="usuario">{user?.username || "Usuario"}</span>
              <img src={userImage} alt="Usuario" className="user-img" />
            </div>
          </header>

      <h2>Notificaciones</h2>
      {loading && <p>Cargando...</p>}
      {!loading && notifications.length === 0 && <p>No tienes notificaciones</p>}
      <ul>
        {notifications.map(n => (
          <li key={n._id} className={!n.isRead ? 'unread' : ''}>
            {n.message}
            <small>{new Date(n.createdAt).toLocaleString()}</small>
          </li>
        ))}
      </ul>
      {notifications.length > 0 && (
        <button onClick={fetchNotifications}>Recargar</button>
      )}
      <Link to="/main-volunteer">
        <button>Cerrar</button>
      </Link>
    </div>
  );
}


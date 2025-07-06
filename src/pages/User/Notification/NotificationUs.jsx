import React from 'react';
import { useNotifications } from '../../../hooks/useNotification'
import './Notifications.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/Logo.png';
import userImage from '../../../assets/img/user.png';
import { useAuth } from '../../../context/AuthContext';

export default function NotificationsUs() {
  const { notifications, loading, fetchNotifications } = useNotifications();
  const { user } = useAuth();

  return (
    <div className="notifications-page">
      {/* Header agregado */}
      <header className="encabezado">
        <div className="encabezado-izquierda">
          <Link to="/main-user">
            <img src={logo} alt="Logo Equilibrium" className="logo" />
          </Link>
          <h1 className="titulo">EQUILIBRIUM</h1>
        </div>
        <div className="encabezado-derecha">
          <Link to="/chat-user" className="nav">CHATS</Link>
          <Link to="/help-user" className="nav">AYUDA</Link>
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
          <strong>{n.relatedUser?.username || "Usuario"}:</strong> {n.message}
          <small>{new Date(n.createdAt).toLocaleString()}</small>
        </li>
      ))}
      </ul>
      {notifications.length > 0 && (
        <button onClick={fetchNotifications}>Recargar</button>
      )}
      <Link to="/main-user">
        <button>Cerrar</button>
      </Link>
    </div>
  );
}

import React from 'react';
import { useNotifications } from '../../../hooks/useNotification'
import './Notifications.css';
import { Link } from 'react-router-dom';

export default function NotificationsVol() {
  const { notifications, loading, fetchNotifications } = useNotifications();

  return (
    <div className="notifications-page">
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


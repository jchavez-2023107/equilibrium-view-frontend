// src/components/User/ChatUserSidebar.jsx
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import './Css/ChatSidebar.css';
import { Link } from 'react-router-dom';

export default function ChatSidebarUser({ chats, volunteers, onChatSelect, onStartChat }) {
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const filtered = (volunteers || [])
    .filter(v => v && v._id && v.username)
    .filter(v =>
      v.username.toLowerCase().includes(search.toLowerCase())
    );

  const chatPartnerName = (chat) =>
    user.role === 'VOLUNTEER' ? chat.userId?.username : chat.volunteerId?.username;

  return (
    <aside className="chat-sidebar">
      <Link to={'/main-user'}>
        <img src="/logo.png" alt="Logo" className="logo" />
      </Link>
      <div className="sidebar-header">Chats</div>

      <div className="sidebar-search">
        <input
          placeholder="Busca voluntario..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* --- Historial (chats) --- */}
      <div className="sidebar-section">
        <h4 className="sidebar-subtitle">Historial</h4>
        <div className="sidebar-list-scroll">
          <ul className="sidebar-list">
            {chats
              .filter(c =>
                chatPartnerName(c)?.toLowerCase().includes(search.toLowerCase())
              )
              .map(c => (
                <li key={c._id} onClick={() => onChatSelect(c)}>
                  <img className="sidebar-avatar" src="/assets/img/user.png" alt="avatar" />
                  <span>{chatPartnerName(c)}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* --- Voluntarios disponibles --- */}
      <div className="sidebar-section">
        <h4 className="sidebar-subtitle">Voluntarios disponibles</h4>
        <div className="sidebar-list-scroll">
          <ul className="sidebar-list">
            {filtered.map(v => {
              const alreadyChatted = chats.some(c => c.volunteerId?._id === v._id);
              if (alreadyChatted) return null;
              return (
                <li key={v._id} onClick={() => onStartChat(v)}>
                  <img className="sidebar-avatar" src="/assets/img/user.png" alt="avatar" />
                  <span>{v.username}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

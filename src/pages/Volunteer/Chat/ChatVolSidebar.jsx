import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import './Css/ChatSidebar.css';
import { Link } from 'react-router-dom';
import logo from '../../../assets/img/Logo.png';
import userImage from "../../../assets/img/user.png";

export default function ChatSidebarVol({ chats, users, onChatSelect, onStartChat }) {
  const { user } = useAuth();
  const [search, setSearch] = useState('');

  const filtered = (users || [])
    .filter(u => u && u._id && u.username)
    .filter(u =>
      u.username.toLowerCase().includes(search.toLowerCase())
    );

  const chatPartnerName = (chat) => (
    user.role === 'USER' ? chat.volunteerId?.username : chat.userId?.username
  );

  return (
    <aside className="chat-sidebar">
      <Link to={'/main-volunteer'}>
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      <div className="sidebar-header">Chats</div>

      <div className="sidebar-search">
        <input
          placeholder="Busca usuario..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Historial de chats */}
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
                 <img className="sidebar-avatar"  src={userImage} alt="avatar" />
                  <span>{chatPartnerName(c)}</span>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Usuarios nuevos */}
      <div className="sidebar-section">
        <h4 className="sidebar-subtitle">Usuarios disponibles</h4>
        <div className="sidebar-list-scroll">
          <ul className="sidebar-list">
            {filtered.map(u => {
              const alreadyChatted = chats.some(c => c.userId?._id === u._id);
              if (alreadyChatted) return null;

              return (
                <li key={u._id} onClick={() => onStartChat(u)}>
                  <img className="sidebar-avatar"  src={userImage} alt="avatar" />
                  <span>{u.username}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}

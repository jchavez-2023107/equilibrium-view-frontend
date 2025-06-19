// src/components/User/ChatUserWindow.jsx
// ✅ Es idéntico a ChatWindowVol pero mantenido para rol USER
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { sendMessage, fetchChatById } from '../../../services/api.js';
import './Css/ChatWindow.css';

export default function ChatWindowUser({ chat, onClose }) {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  const loadMessages = async () => {
    if (!chat?._id) return;
    try {
      const fresh = await fetchChatById(chat._id);
      if (fresh.messages.length > messages.length) {
        setMessages(fresh.messages);
      }
    } catch (err) {
      console.error("❌ Error recargando mensajes:", err);
    }
  };

  useEffect(() => {
    setMessages(chat?.messages || []);
  }, [chat]);

  useEffect(() => {
    const interval = setInterval(loadMessages, 5000);
    return () => clearInterval(interval);
  }, [chat, messages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!chat) return <div className="chat-window empty">Selecciona un chat o inicia uno.</div>;

  const myId = user.uid;
  const partner = user.role === 'USER' ? chat.volunteerId : chat.userId;

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      const updated = await sendMessage(chat._id, { text });
      setMessages(updated.messages);
      setText('');
    } catch (err) {
      console.error("❌ Error enviando mensaje:", err);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-header-left">
          <img src="/assets/img/user.png" alt="partner" className="chat-avatar"/>
          <span>{partner.username}</span>
        </div>
        <button className="chat-close-btn" onClick={onClose}>Volver</button>
      </div>
      <div className="chat-messages">
        {messages.map((m,i) => (
          <div key={i} className={`chat-msg ${m.senderId === myId ? 'mine' : 'theirs'}`}>
            <span className="msg-text">{m.text}</span>
            <span className="msg-time">{new Date(m.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <div className="chat-input-bar">
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Escribe un mensaje..."
          onKeyDown={e => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

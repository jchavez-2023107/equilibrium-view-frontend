import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import { sendMessage } from '../../../services/api.js';
import { getSocket } from '../../../services/socket';
import './Css/ChatWindow.css';

export default function ChatWindowUser({ chat, onClose }) {
  const { user } = useAuth();
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  useEffect(() => {
    setMessages(chat?.messages || []);
  }, [chat]);

  // Escuchar mensajes de Socket.IO en esta ventana
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !chat?._id) return;

    function handleNewMessage({ chatId, message }) {
      if (chatId === chat._id) {
        setMessages(prev => [...prev, message]);
      }
    }

    socket.on("chat:message", handleNewMessage);

    return () => {
      socket.off("chat:message", handleNewMessage);
    };
  }, [chat?._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!chat) return <div className="chat-window empty">Selecciona un chat o inicia uno.</div>;

  const myId = user.uid;
  const partner = user.role === 'USER' ? chat.volunteerId : chat.userId;

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      // Solo manda el mensaje, el backend lo emite por socket para ambos clientes
      await sendMessage(chat._id, { text });
      setText('');
      // El mensaje llegará automáticamente por socket, no necesitas agregarlo aquí
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

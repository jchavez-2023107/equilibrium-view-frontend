import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import { sendMessage, fetchChatById } from "../../../services/api.js";
import { getSocket } from "../../../services/socket";
import "./Css/ChatWindow.css";
import userImage from "../../../assets/img/user.png";

export default function ChatWindowUser({ chat, onClose }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();

  // Inicializa mensajes cada vez que el chat cambia
  useEffect(() => {
    setMessages(chat?.messages || []);
  }, [chat]);

  // Escucha mensajes en tiempo real (socket.io)
  useEffect(() => {
    const socket = getSocket();
    if (!socket || !chat?._id) return;

    async function handleNewMessage({ chatId, message }) {
      if (chatId === chat._id) {
        // Refresca el chat completo desde la API (así nunca se salta mensajes)
        const fullChat = await fetchChatById(chatId);
        setMessages(fullChat.messages);
      }
    }

    socket.on("chat:message", handleNewMessage);
    return () => {
      socket.off("chat:message", handleNewMessage);
    };
  }, [chat?._id]);

  // Auto-scroll al nuevo mensaje
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!chat)
    return (
      <div className="chat-window empty">Selecciona un chat o inicia uno.</div>
    );

  const myId = user.uid;
  const partner = user.role === "USER" ? chat.volunteerId : chat.userId;

  const handleSend = async () => {
    if (!text.trim()) return;
    try {
      await sendMessage(chat._id, { text });
      setText("");
      // Refresca la lista de mensajes después de enviar
      const fullChat = await fetchChatById(chat._id);
      setMessages(fullChat.messages);
    } catch (err) {
      console.error("❌ Error enviando mensaje:", err);
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-header-left">
          <img
             src={userImage}
            alt="partner"
            className="chat-avatar"
          />
          <span className="chat-username">{partner?.username || "Sin usuario"}</span>
        </div>
        <button className="chat-close-btn" onClick={onClose}>
          Volver
        </button>
      </div>
      <div className="chat-messages">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`chat-msg ${m.senderId === myId ? "mine" : "theirs"}`}
          >
            <span className="msg-text">{m.text}</span>
            <span className="msg-time">
              {new Date(m.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
        <div ref={scrollRef}></div>
      </div>
      <div className="chat-input-bar">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe un mensaje..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
}

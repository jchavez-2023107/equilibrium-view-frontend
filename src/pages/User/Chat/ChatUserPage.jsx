import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import {
  fetchMyChats,
  fetchUsers,
  createChat,
  fetchChatById
} from '../../../services/api.js';
import { getSocket } from '../../../services/socket'; // <<--- Agrega esto
import ChatSidebarUser from './ChatUserSidebar.jsx';
import ChatWindowUser from './ChatUserWindow.jsx';
import './Css/ChatPage.css';

export default function ChatUserPage() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // Cargar chats y voluntarios al inicio
  useEffect(() => {
    const load = async () => {
      const chatList = await fetchMyChats();
      const allUsers = await fetchUsers();
      setChats(chatList);
      setVolunteers(
        allUsers.filter(u =>
          u.role === 'VOLUNTEER' && u.status === 'ACTIVE'
        )
      );
    };
    load();
  }, []);

  // Escuchar mensajes nuevos en tiempo real
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    function handleNewMessage({ chatId, message }) {
      // Si el chat abierto es el que recibe el mensaje, actualizar ventana
      if (selectedChat && selectedChat._id === chatId) {
        setSelectedChat(prev => ({
          ...prev,
          messages: [...prev.messages, message]
        }));
      }
      // Opcional: actualizar la lista de chats si quieres mostrar el último mensaje en el listado
      setChats(prev =>
        prev.map(c =>
          c._id === chatId
            ? { ...c, messages: [...(c.messages || []), message] }
            : c
        )
      );
    }

    // Nuevo chat creado en otro cliente
    function handleNewChat(chat) {
      setChats(prev => [...prev, chat]);
    }

    socket.on("chat:message", handleNewMessage);
    socket.on("chat:new", handleNewChat);

    return () => {
      socket.off("chat:message", handleNewMessage);
      socket.off("chat:new", handleNewChat);
    };
  }, [selectedChat]);

  const handleSelectChat = async (chat) => {
    try {
      const fullChat = await fetchChatById(chat._id);
      setSelectedChat(fullChat);
    } catch (err) {
      console.error("❌ Error cargando chat:", err.message);
      alert("No tienes acceso a este chat.");
    }
  };

  const handleStartChat = async (vol) => {
    try {
      const volunteerId = vol._id || vol.id;
      const newChat = await createChat({
        userId: user.uid,
        volunteerId
      });

      if (!newChat || !newChat._id) {
        throw new Error("El backend no devolvió un chat válido.");
      }

      const updatedChats = await fetchMyChats();
      setChats(updatedChats);
      setSelectedChat(newChat);
    } catch (err) {
      console.error("❌ Error creando el chat:", err.message);
      alert("No se pudo crear el chat.");
    }
  };

  return (
    <div className="chat-page">
      <ChatSidebarUser
        chats={chats}
        volunteers={volunteers}
        onChatSelect={handleSelectChat}
        onStartChat={handleStartChat}
      />
      <ChatWindowUser
        chat={selectedChat}
        onClose={() => setSelectedChat(null)}
        setSelectedChat={setSelectedChat} // Pásalo para actualizar desde adentro si quieres
      />
    </div>
  );
}

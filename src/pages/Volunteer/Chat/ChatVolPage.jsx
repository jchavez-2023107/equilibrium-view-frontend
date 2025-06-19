// src/pages/Volunteer/ChatVolPage.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext.jsx';
import {
  fetchMyChats,
  fetchUsers,
  createChat,
  fetchChatById
} from '../../../services/api.js';
import ChatSidebarVol from './ChatVolSidebar.jsx';
import ChatWindowVol from './ChatVolWindow.jsx';
import './Css/ChatPage.css';

export default function ChatVolPage() {
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    const load = async () => {
      const chatList = await fetchMyChats();
      const allUsers = await fetchUsers();
      setChats(chatList);
      setUsers(allUsers.filter(u => u.role === 'USER'));
    };
    load();
  }, []);

  const handleSelectChat = async (chat) => {
    try {
      const fullChat = await fetchChatById(chat._id);
      setSelectedChat(fullChat);
    } catch (err) {
      console.error("❌ Error cargando chat:", err.message);
      alert("No tienes acceso a este chat.");
    }
  };

  const handleStartChat = async (usr) => {
    try {
      const userId = usr._id || usr.id;
      console.log("📤 Enviando createChat body:", {
        userId,
        volunteerId: user.uid
      });

      if (!userId) throw new Error("Usuario sin ID válido");

      const newChat = await createChat({
        userId,
        volunteerId: user.uid
      });

      if (!newChat || !newChat._id) {
        throw new Error("El backend no devolvió un chat válido.");
      }

      const updatedChats = await fetchMyChats();
      setChats(updatedChats);
      setSelectedChat(newChat);
    } catch (err) {
      console.error("❌ Error creando el chat:", err.message);
      alert("No se pudo crear el chat. Verifica permisos o si ya hay uno activo.");
    }
  };

  return (
    <div className="chat-page">
      <ChatSidebarVol
        chats={chats}
        users={users}
        onChatSelect={handleSelectChat}
        onStartChat={handleStartChat}
      />
      <ChatWindowVol
        chat={selectedChat}
        onClose={() => setSelectedChat(null)}
      />
    </div>
  );
}

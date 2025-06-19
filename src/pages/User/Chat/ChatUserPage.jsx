import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  fetchMyChats,
  fetchUsers,
  createChat,
  fetchChatById,
} from "../../../services/api.js";
import { useSocket } from "../../../context/SocketContext"; // <-- Usa el contexto global
import ChatSidebarUser from "./ChatUserSidebar.jsx";
import ChatWindowUser from "./ChatUserWindow.jsx";
import "./Css/ChatPage.css";

export default function ChatUserPage() {
  const { user } = useAuth();
  const { socket } = useSocket();
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
        allUsers.filter((u) => u.role === "VOLUNTEER" && u.status === "ACTIVE")
      );
    };
    load();
  }, []);

  // Seleccionar chat y cargar sus mensajes completos
  const handleSelectChat = useCallback(async (chat) => {
    try {
      const fullChat = await fetchChatById(chat._id);
      setSelectedChat(fullChat);
    } catch (err) {
      console.error("❌ Error cargando chat:", err.message);
      alert("No tienes acceso a este chat.");
    }
  }, []);

  // Comenzar nuevo chat con un voluntario
  const handleStartChat = useCallback(async (vol) => {
    try {
      const volunteerId = vol._id || vol.id;
      const newChat = await createChat({
        userId: user.uid,
        volunteerId,
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
  }, [user]);

  // Listeners en tiempo real (socket global)
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = ({ chatId, message }) => {
      setSelectedChat((prev) => {
        if (!prev || prev._id !== chatId) return prev;
        return {
          ...prev,
          messages: [...(prev.messages || []), message],
        };
      });

      setChats((prev) =>
        prev.map((c) =>
          c._id === chatId
            ? { ...c, messages: [...(c.messages || []), message] }
            : c
        )
      );
    };

    const handleNewChat = (chat) => {
      setChats((prev) => {
        if (prev.some((c) => c._id === chat._id)) return prev;
        return [...prev, chat];
      });
    };

    socket.on("chat:message", handleNewMessage);
    socket.on("chat:new", handleNewChat);

    return () => {
      socket.off("chat:message", handleNewMessage);
      socket.off("chat:new", handleNewChat);
    };
  }, [socket]);

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
        setSelectedChat={setSelectedChat}
      />
    </div>
  );
}
import { useState, useEffect, useCallback } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  fetchMyChats,
  fetchUsers,
  createChat,
  fetchChatById,
} from "../../../services/api.js";
import { useSocket } from "../../../context/SocketContext"; // <-- Usa el contexto global
import ChatSidebarVol from "./ChatVolSidebar.jsx";
import ChatWindowVol from "./ChatVolWindow.jsx";
import "./Css/ChatPage.css";

export default function ChatVolPage() {
  const { user } = useAuth();
  const { socket } = useSocket();
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  // Cargar chats y usuarios al iniciar
  useEffect(() => {
    const load = async () => {
      const chatList = await fetchMyChats();
      const allUsers = await fetchUsers();
      setChats(chatList);
      setUsers(allUsers.filter((u) => u.role === "USER"));
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

  // Comenzar nuevo chat
  const handleStartChat = useCallback(async (usr) => {
    try {
      const userId = usr._id || usr.id;
      if (!userId) throw new Error("Usuario sin ID válido");

      const newChat = await createChat({
        userId,
        volunteerId: user.uid,
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
  }, [user]);

  // Escuchar mensajes y chats en tiempo real SOLO UNA VEZ y mantener listener global
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = ({ chatId, message }) => {
      setSelectedChat((prev) => {
        // Si está abierto este chat, agrega el mensaje en vivo
        if (!prev || prev._id !== chatId) return prev;
        return {
          ...prev,
          messages: [...(prev.messages || []), message],
        };
      });

      // Actualiza la lista de chats para reflejar último mensaje
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
        // Evita duplicados por si REST y socket llegan juntos
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
      <ChatSidebarVol
        chats={chats}
        users={users}
        onChatSelect={handleSelectChat}
        onStartChat={handleStartChat}
      />
      <ChatWindowVol
        chat={selectedChat}
        onClose={() => setSelectedChat(null)}
        setSelectedChat={setSelectedChat}
      />
    </div>
  );
}
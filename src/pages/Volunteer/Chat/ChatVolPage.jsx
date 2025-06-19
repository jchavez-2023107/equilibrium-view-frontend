import { useState, useEffect } from "react";
import { useAuth } from "../../../context/AuthContext.jsx";
import {
  fetchMyChats,
  fetchUsers,
  createChat,
  fetchChatById,
} from "../../../services/api.js";
import { getSocket } from "../../../services/socket"; // <<--- IMPORTANTE
import ChatSidebarVol from "./ChatVolSidebar.jsx";
import ChatWindowVol from "./ChatVolWindow.jsx";
import "./Css/ChatPage.css";

export default function ChatVolPage() {
  const { user } = useAuth();
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

  // Escuchar eventos en tiempo real por socket.io
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    function handleNewMessage({ chatId, message }) {
    console.log("[SOCKET] Mensaje recibido en chat:", chatId, message);
      // Actualiza el chat abierto si corresponde
      setSelectedChat((prev) => {
        if (!prev || prev._id !== chatId) return prev;
        return {
          ...prev,
          messages: [...(prev.messages || []), message],
        };
      });

      // Actualiza la lista de chats (último mensaje)
      setChats((prev) =>
        prev.map((c) =>
          c._id === chatId
            ? { ...c, messages: [...(c.messages || []), message] }
            : c
        )
      );
    }

    function handleNewChat(chat) {
      setChats((prev) => [...prev, chat]);
    }

    socket.on("chat:message", handleNewMessage);
    socket.on("chat:new", handleNewChat);

    return () => {
      socket.off("chat:message", handleNewMessage);
      socket.off("chat:new", handleNewChat);
    };
  }, [setSelectedChat]);

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
      alert(
        "No se pudo crear el chat. Verifica permisos o si ya hay uno activo."
      );
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
        setSelectedChat={setSelectedChat} // Pásalo para actualizar desde adentro si quieres
      />
    </div>
  );
}

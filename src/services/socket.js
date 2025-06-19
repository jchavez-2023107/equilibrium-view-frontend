import { io } from "socket.io-client";

const API_BASE_URL = import.meta.env.VITE_API_URL?.replace("/api/v1", "") || "http://localhost:2636";

let socket = null;

export function connectSocket(token) {
  if (!token || typeof token !== "string" || token.length < 30) {
    console.warn("[Socket.IO] No se conectó: token vacío o inválido.");
    return null;
  }
  if (socket && socket.connected) return socket;

  socket = io(API_BASE_URL, {
    auth: { token }
  });

  socket.on("connect", () => {
    console.log("[Socket.IO] ✅ Conectado:", socket.id);
  });
  socket.on("disconnect", () => {
    console.log("[Socket.IO] 🔴 Desconectado");
  });
  socket.on("connect_error", (err) => {
    console.error("[Socket.IO] ❌ Error de conexión:", err.message);
  });

  return socket;
}

export function getSocket() {
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

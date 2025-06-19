// src/context/SocketContext.jsx
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { connectSocket, disconnectSocket, getSocket } from "../services/socket";
import { useAuth } from "./AuthContext"; // Ajusta el path si lo tienes diferente

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const { user } = useAuth();
  const [socketReady, setSocketReady] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    let socket = null;
    const token = localStorage.getItem("token");
    if (token && user) {
      socket = connectSocket(token);
      socketRef.current = socket;

      // Conectado y listo para escuchar
      socket.on("connect", () => {
        setSocketReady(true);
      });
      socket.on("disconnect", () => {
        setSocketReady(false);
      });
    }
    return () => {
      disconnectSocket();
      socketRef.current = null;
      setSocketReady(false);
    };
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket: socketRef.current, socketReady }}>
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}

// src/context/AppointmentContext.jsx
import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { apiFetch } from '../services/api';
import { io } from 'socket.io-client';
import { useAuth } from './AuthContext'; // Para obtener user.uid
import { connectSocket, onSocketEvent } from '../services/socket';


const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [deletedAppointments, setDeletedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now())
  const socketRef = useRef(null);
  const { user } = useAuth(); // UID necesario para canal privado

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const res = await apiFetch('/appointments');
      setAppointments(res.appointments || []);
    } catch (error) {
      console.error('Error al cargar citas:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (data) => {
    const res = await apiFetch('/appointments', {
      method: 'POST',
      body: JSON.stringify({
        volunteerId: data.volunteerId,
        userId: data.userId,
        scheduledAt: data.scheduledAt,
        reason: data.title,
        notes: data.description
      })
    });

    // Solo si socket fallara, lo añadimos por seguridad (evitar duplicado)
    setAppointments(prev => [...prev, res.appointment]);
  };

  const deleteAppointment = async (id) => {
    try {
      const res = await apiFetch(`/appointments/${id}`, {
        method: 'DELETE'
      });
      setAppointments(prev => prev.filter(a => a._id !== id));
      setDeletedAppointments(prev => [...prev, res.appointment]);
    } catch (error) {
      console.error('Error al eliminar cita:', error.message);
    }
  };

  // 🔗 Inicializar socket.io
  useEffect(() => {
    if (!user) return;

    socketRef.current = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:2636', {
      withCredentials: true,
      query: { uid: user.uid }
    });

    const socket = socketRef.current;

    // Evento: Nueva cita
    socket.on('appointment:new', (appointment) => {
      setAppointments(prev => {
        const exists = prev.some(a => a._id === appointment._id);
        return exists ? prev : [...prev, appointment];
      });
    });

    // Evento: Eliminación de cita
    socket.on('appointment:deleted', ({ appointmentId }) => {
      setAppointments(prev => prev.filter(a => a._id !== appointmentId));
    });

    return () => {
      socket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  useEffect(() => {
  if (!user || !user.token) return;

  connectSocket(user.token);
  
  onSocketEvent("appointment:new", (appointment) => {
    setAppointments(prev => {
      const exists = prev.some(a => a._id === appointment._id);
      return exists ? prev : [...prev, appointment];
    })
    setLastUpdate(Date.now());
  });

  onSocketEvent("appointment:deleted", ({ appointmentId }) => {
    setAppointments(prev => prev.filter(a => a._id !== appointmentId));
    setLastUpdate(Date.now());
  });

  return () => {
    disconnectSocket();
  };
}, [user]);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        deletedAppointments,
        loading,
        createAppointment,
        deleteAppointment,
        lastUpdate // 👈 lo exportamos
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error('useAppointments debe usarse dentro de AppointmentProvider');
  return context;
}

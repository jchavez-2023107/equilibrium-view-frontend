import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { apiFetch } from '../services/api';
import { useAuth } from './AuthContext';
import {
  connectSocket,
  disconnectSocket,
  onSocketEvent,
  getSocket
} from '../services/socket';

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [deletedAppointments, setDeletedAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(Date.now());
  const { user } = useAuth();
  const initializedRef = useRef(false);

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

  // 🔁 Socket listeners solo una vez
  useEffect(() => {
    if (!user?.token || initializedRef.current) return;
    initializedRef.current = true;

    const socket = connectSocket(user.token);
    socket.emit("join", user.id)
    if (!socket) return;

    socket.on("appointment:new", (appointment) => {
      console.log("📡 Nueva cita recibida:", appointment);
      setAppointments(prev => {
        const exists = prev.some(a => a._id === appointment._id);
        return exists ? prev : [...prev, appointment];
      });
      setLastUpdate(Date.now());
    });

    socket.on("appointment:deleted", ({ appointmentId }) => {
      setAppointments(prev => prev.filter(a => a._id !== appointmentId));
      setDeletedAppointments(prev => [...prev, appointmentId]);
      setLastUpdate(Date.now());
    });

    return () => {
      disconnectSocket();
    };
  }, [user?.token]);

  // Primera carga
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        deletedAppointments,
        loading,
        createAppointment,
        deleteAppointment,
        lastUpdate
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
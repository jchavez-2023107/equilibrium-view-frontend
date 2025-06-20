
import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSocket } from '../services/socket';
import { toast } from 'react-toastify';

export function useAppointmentNotifications() {
  const { user } = useAuth();

  useEffect(() => {
    if (!user || !user.token) return;

    const socket = getSocket();
    if (!socket) return;

    function handleNotification(notification) {
      if (notification?.type === 'APPOINTMENT') {
        toast.info(notification.message || 'Tienes una nueva cita.');
      }
    }

    socket.on('notification:new', handleNotification);

    return () => {
      socket.off('notification:new', handleNotification);
    };
  }, [user]);
}

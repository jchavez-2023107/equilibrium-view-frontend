import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../../../context/AppointmentContext';
import { useAuth } from '../../../context/AuthContext';
import { fetchUsers } from '../../../services/api';
import './AppointmentForm.Vol.css'; // Import your CSS styles


export default function AppointmentFormVol() {
  const today = new Date().toISOString().substring(0, 10);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('12:00');
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { createAppointment } = useAppointments();
  const { user } = useAuth();

  useEffect(() => {
    async function loadUsers() {
      try {
        const result = await fetchUsers();
        const filtered = result.filter(u => u.role === 'USER');
        setUsers(filtered);
      } catch (err) {
        console.error('Error al cargar usuarios:', err.message);
      }
    }
    loadUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !userId) {
      setError('El título y el usuario son obligatorios.');
      return;
    }

    const scheduledAt = new Date(`${date}T${time}`);
    if (isNaN(scheduledAt.getTime()) || scheduledAt <= new Date()) {
      setError('La fecha y hora deben ser válidas y futuras.');
      return;
    }

    try {
      await createAppointment({
        title,
        description,
        scheduledAt: scheduledAt.toISOString(),
        userId,
        volunteerId: user.uid
      });

      navigate('/calendar-vol');
    } catch (err) {
      setError(err.message || 'No se pudo crear la cita.');
    }
  };

  return (
    <div className="appointment-form-container">
      <h2 className="form-heading">Nueva Cita</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-control required">
          <label htmlFor="title">Título</label>
          <input
            id="title"
            type="text"
            placeholder="Título"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            placeholder="Opcional"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>

        <div className="form-control required">
          <label htmlFor="date">Fecha</label>
          <input
            id="date"
            type="date"
            value={date}
            min={today}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-control required">
          <label htmlFor="time">Hora</label>
          <input
            id="time"
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            required
          />
        </div>

        <div className="form-control required">
          <label htmlFor="userId">Asignar a usuario</label>
          <select
            id="userId"
            value={userId}
            onChange={e => setUserId(e.target.value)}
            required
          >
            <option value="">-- Selecciona un usuario --</option>
            {users.map(u => (
              <option key={u._id} value={u._id}>
                {u.profile?.displayName || u.username}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Agregar Cita
        </button>
      </form>
    </div>
  );
}

// src/components/AppointmentFormUser.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { useAppointments } from '../../../context/AppointmentContext';

export default function AppointmentFormUser() {
  const today = new Date().toISOString().substring(0, 10);
  const [reason, setReason] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState(today);
  const [time, setTime] = useState('12:00');
  const [volunteerId, setVolunteerId] = useState('');
  const [volunteers, setVolunteers] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createAppointment } = useAppointments();

  useEffect(() => {
    async function loadVolunteers() {
      try {
        const result = await fetchUsers();
        const filtered = result.filter(u => u.role === 'VOLUNTEER');
        setVolunteers(filtered);
      } catch (err) {
        console.error('Error al cargar voluntarios:', err.message);
      }
    }
    loadVolunteers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const scheduledAt = new Date(`${date}T${time}`);
    if (isNaN(scheduledAt.getTime()) || scheduledAt <= new Date()) {
      setError('La fecha y hora deben ser válidas y futuras.');
      return;
    }

    try {
    await createAppointment({
      volunteerId,
      scheduledAt: scheduledAt.toISOString(),
      title: reason,
      description: notes
    });

      navigate('/calendar-user');
    } catch (err) {
      setError(err.message || 'No se pudo crear la cita.');
    }
  };

  return (
    <div className="appointment-form-container">
      <h2 className="form-heading">Agendar Cita</h2>
      {error && <p className="error-message">{error}</p>}

      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-control required">
          <label htmlFor="reason">Motivo</label>
          <input
            id="reason"
            type="text"
            placeholder="Motivo"
            value={reason}
            onChange={e => setReason(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label htmlFor="notes">Notas</label>
          <textarea
            id="notes"
            placeholder="Opcional"
            value={notes}
            onChange={e => setNotes(e.target.value)}
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
          <label htmlFor="volunteerId">Seleccionar voluntario</label>
          <select
            id="volunteerId"
            value={volunteerId}
            onChange={e => setVolunteerId(e.target.value)}
            required
          >
            <option value="">-- Selecciona un voluntario --</option>
            {volunteers.map(v => (
              <option key={v._id} value={v._id}>
                {v.profile?.displayName || v.username}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Crear Cita
        </button>
      </form>
    </div>
  );
}

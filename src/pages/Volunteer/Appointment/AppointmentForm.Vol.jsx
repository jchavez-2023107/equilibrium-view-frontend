import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppointments } from '../../../context/AppointmentContext';

export default function AppointmentFormVol() {
  const today = new Date().toISOString().substring(0, 10);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState('');
  const [date, setDate] = useState(today);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useAppointments();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !user.trim()) {
      setError('El título y el usuario son obligatorios.');
      return;
    }

    if (date < today) {
      setError('La fecha no puede ser anterior a hoy.');
      return;
    }

    dispatch({
      type: 'ADD_APPOINTMENT',
      payload: { title, description, user, date },
    });

    setError('');
    navigate('/calendar-vol');
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
          <label htmlFor="user">Usuario</label>
          <input
            id="user"
            type="text"
            placeholder="Nombre del usuario"
            value={user}
            onChange={e => setUser(e.target.value)}
            required
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

        <button type="submit" className="btn-submit">
          Agregar Cita
        </button>
      </form>
    </div>
  );
}
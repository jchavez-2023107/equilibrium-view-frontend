import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../services/api.js';

export default function CompleteVolunteer() {
  const { id } = useParams();
  const [volunteerData, setVolunteerData] = useState({
    university: '',
    graduateTerm: '',
    hasVolunteered: false,
    motivation: '',
    availability: '',
    linkedIn: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await apiFetch(`/users/${id}`, { method: 'GET' });
        if (res.user?.volunteerData) {
          setVolunteerData({
            ...res.user.volunteerData,
            hasVolunteered: Boolean(res.user.volunteerData.hasVolunteered)
          });
        }
      } catch (err) {
        console.error('Error fetchUser:', err);
        setError('No autorizado para ver estos datos');
      }
    }
    fetchUser();
  }, [id]);

  const handleChange = e => {
    let { name, value } = e.target;

    if (name === 'hasVolunteered') {
      // viene como string "true" o "false"
      value = value === 'true';
    }

    setVolunteerData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      await apiFetch(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ volunteerData })
      });
      alert('Solicitud de voluntario enviada');
      navigate('/login');
    } catch (err) {
      console.error('Error handleSubmit:', err);
      if (err.payload?.errors) {
        setError(err.payload.errors.map(e => `${e.param}: ${e.msg}`).join('\n'));
      } else {
        setError(err.payload?.message || err.message);
      }
    }
  };

  return (
    <div>
      <h2>Completar Registro de Voluntario</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="university"
          value={volunteerData.university}
          onChange={handleChange}
          placeholder="Universidad"
          required
        />

        <input
          name="graduateTerm"
          value={volunteerData.graduateTerm}
          onChange={handleChange}
          placeholder="Semestre / Año de graduación"
          required
        />

        <select
          name="hasVolunteered"
          value={String(volunteerData.hasVolunteered)}
          onChange={handleChange}
        >
          <option value="false">No he sido voluntario</option>
          <option value="true">Sí he sido voluntario</option>
        </select>

        <textarea
          name="motivation"
          value={volunteerData.motivation}
          onChange={handleChange}
          placeholder="¿Qué te motiva?"
          required
        />

        <input
          name="availability"
          value={volunteerData.availability}
          onChange={handleChange}
          placeholder="Disponibilidad horaria"
          required
        />

        <input
          name="linkedIn"
          value={volunteerData.linkedIn}
          onChange={handleChange}
          placeholder="URL de LinkedIn"
        />

        {error && <p style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error}</p>}

        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
}
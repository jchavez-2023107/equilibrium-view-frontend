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
    linkedIn: '',
    contactNumber: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await apiFetch(`/users/${id}`, { method: 'GET' });
        if (res.user?.volunteerData) {
          setVolunteerData(res.user.volunteerData);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchUser();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setVolunteerData(prev => ({ ...prev, [name]: value }));
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
      console.error(err);
      setError(err.message || 'Error al completar registro');
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
          value={volunteerData.hasVolunteered}
          onChange={handleChange}
        >
          <option value={false}>No he sido voluntario</option>
          <option value={true}>Sí he sido voluntario</option>
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
        <input
          name="contactNumber"
          value={volunteerData.contactNumber}
          onChange={handleChange}
          placeholder="Teléfono (1234-5678)"
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
);
}

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../../../services/api.js';
import './../RegisterVol/CompleteVol.css';
import logo from "../../../assets/img/Logo.png";

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
      value = value === 'true';
    }
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
      console.error('Error handleSubmit:', err);
      setError(err.payload?.errors
        ? err.payload.errors.map(e => `${e.param}: ${e.msg}`).join('\n')
        : err.payload?.message || err.message);
    }
  };

  return (
    <div className="complete-vol-container">
      <div className="complete-vol-wrapper">
        <div className="complete-vol-left">
          <h1 className="complete-vol-logo-text">EQUILIBRIUM</h1>
          <img src={logo} alt="Logo" className="complete-vol-logo" />
          <p className="complete-vol-message">¡Completa tus<br />datos de voluntario!</p>
        </div>

        <div className="complete-vol-right">
          <h2>Registro Voluntario</h2>
          <form onSubmit={handleSubmit} className="complete-vol-form">
            <div className="input-group">
              <span>🎓</span>
              <input name="university" value={volunteerData.university} onChange={handleChange} placeholder="Universidad" required />
            </div>

            <div className="input-group">
              <span>📚</span>
              <input name="graduateTerm" value={volunteerData.graduateTerm} onChange={handleChange} placeholder="Semestre / Año de graduación" required />
            </div>

            <div className="input-group">
              <span>✔️</span>
              <select name="hasVolunteered" value={String(volunteerData.hasVolunteered)} onChange={handleChange}>
                <option value="false">No he sido voluntario</option>
                <option value="true">Sí he sido voluntario</option>
              </select>
            </div>

            <div className="input-group">
              <span>💬</span>
              <textarea name="motivation" value={volunteerData.motivation} onChange={handleChange} placeholder="¿Qué te motiva?" required />
            </div>

            <div className="input-group">
              <span>⏱️</span>
              <input name="availability" value={volunteerData.availability} onChange={handleChange} placeholder="Disponibilidad horaria" required />
            </div>

            <div className="input-group">
              <span>🔗</span>
              <input name="linkedIn" value={volunteerData.linkedIn} onChange={handleChange} placeholder="URL de LinkedIn" />
            </div>

            {error && <p className="complete-vol-error">{error}</p>}

            <button type="submit" className="complete-vol-button">Enviar Solicitud</button>
          </form>
        </div>
      </div>
    </div>
  );
}
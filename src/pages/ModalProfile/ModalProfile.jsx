// src/components/ModalProfile.jsx
import React, { useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { fetchMyProfile } from '../../services/api';
import 'react-datepicker/dist/react-datepicker.css';
import './ModalProfile.css';

export default function ModalProfile({ profile, setProfile, birthDate, setBirthDate, isOpen, onClose }) {
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await fetchMyProfile();

      setProfile({
        username: user.username || '',
        email: user.email || '',
        telefono: user.profile?.contactNumber || '',
        bio: user.profile?.bio || ''
      });

        if (user.profile?.birthDate) {
          setBirthDate(new Date(user.profile.birthDate));
        } else {
          setBirthDate(null);
        }
      } catch (err) {
        console.error('Error al cargar el perfil:', err);
      }
    };

    if (isOpen) loadProfile();
  }, [isOpen, setProfile, setBirthDate]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✖</button>
        <h2>Perfil</h2>
        <img src="/assets/img/user.png" alt="Usuario" className="user-image" />

        <label>Username:</label>
        <input type="text" name="username" value={profile.username} readOnly />

        <label>Correo:</label>
        <input type="email" name="email" value={profile.email} readOnly />

        <label>Fecha de Nacimiento:</label>
        <div className="input-with-icon">
          <DatePicker
            selected={birthDate}
            onChange={() => {}}
            dateFormat="dd/MM/yyyy"
            className="date-input"
            disabled
          />
          <FaCalendarAlt className="calendar-icon" />
        </div>

        <label>Teléfono:</label>
        <input type="text" name="telefono" value={profile.telefono} readOnly />

        <label>Biografía:</label>
        <textarea name="bio" value={profile.bio} readOnly />
      </div>
    </div>
  );
}

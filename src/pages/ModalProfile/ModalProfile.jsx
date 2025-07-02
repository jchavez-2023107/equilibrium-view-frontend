// src/components/ModalProfile.jsx
import React, { useEffect } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { fetchMyProfile } from '../../services/api';
import 'react-datepicker/dist/react-datepicker.css';
import './ModalProfile.css';
import userImage from '../../assets/img/user.png'; // ✅ Asegúrate que esté en: src/assets/img/user.png


export default function ModalProfile({ profile, setProfile, birthDate, setBirthDate, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      try {
        const user = await fetchMyProfile();
        setProfile({
          username: user.username || '',
          email: user.email || '',
          telefono: user.profile?.contactNumber || '',
          bio: user.profile?.bio || ''
        });
        setBirthDate(user.profile?.birthDate ? new Date(user.profile.birthDate) : null);
      } catch (err) {
        console.error('Error al cargar el perfil:', err);
      }
    })();
  }, [isOpen, setProfile, setBirthDate]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
         <div className="modal"></div>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>✖</button>
        <h2>Perfil</h2>
          <div className="profile-image-container">
            <img src={userImage} alt="Foto de perfil" className="profile-image" />
          </div>
        <div className="profile-row">
          <label>Username:</label>
          <input type="text" name="username" value={profile.username} readOnly />
        </div>
        <div className="profile-row">
          <label>Correo:</label>
          <input type="email" name="email" value={profile.email} readOnly />
        </div>
        <div className="profile-row">
          <label>Fecha de Nacimiento:</label>
          <div className="input-with-icon">
            <DatePicker selected={birthDate} onChange={() => {}} dateFormat="dd/MM/yyyy" className="date-input" disabled />
            <FaCalendarAlt className="calendar-icon" />
          </div>
        </div>
        <div className="profile-row">
          <label>Teléfono:</label>
          <input type="text" name="telefono" value={profile.telefono} readOnly />
        </div>
        <div className="profile-row">
          <label>Biografía:</label>
          <textarea name="bio" value={profile.bio} readOnly />
        </div>
      </div>
    </div>
  );
}
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useEffect, useState } from 'react';
import userImage from '../../../assets/img/user.png';
import logo from "../../../assets/img/Logo.png";
import './../Profile/ProfileUs.css';
import { Link } from 'react-router-dom';
import { fetchMyProfile, updateProfile } from '../../../services/api.js';

function ProfileUs() {
  const [birthDate, setBirthDate] = useState(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const [profile, setProfile] = useState({
    username: '',
    email: '',
    telefono: '',
    bio: ''
  });

  // ✅ Cargar datos del usuario al montar
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
        }
      } catch (error) {
        console.error('Error al cargar el perfil:', error.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = async () => {
    if (editMode) {
      try {
        const updated = await updateProfile({
          bio: profile.bio,
          contactNumber: profile.telefono,
          birthDate: birthDate ? birthDate.toISOString() : null
        });

        alert("Perfil actualizado correctamente ✅");

        setProfile(prev => ({
          ...prev,
          telefono: updated.profile?.contactNumber || '',
          bio: updated.profile?.bio || ''
        }));

        if (updated.profile?.birthDate) {
          setBirthDate(new Date(updated.profile.birthDate));
        }
      } catch (err) {
        console.error('Error al actualizar perfil:', err);
        alert("Ocurrió un error al guardar los cambios ❌");
      }
    }

    setEditMode(prev => !prev);
  };

  if (loading) return <p className="profile-loading">Cargando perfil...</p>;

  return (
    <div className="profile-container">
      <header>
        <div className="header-left">
           <Link to="/main-user" className="header-link">
             <img src={logo} alt="Logo Equilibrium" className="header-logo" /></Link>
              <Link to="/main-user">
            <h1 className="header-title">EQUILIBRIUM</h1></Link>
        </div>
      </header>

      <div className="profile-card">
        <h1 className="profile-title">Perfil</h1>
        <img src={userImage} alt="Usuario" className="user-image" />

        <div className="profile-field">
          <label>USERNAME:</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            readOnly
          />
        </div>

        <div className="profile-field">
          <label>CORREO:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            readOnly
          />
        </div>

        <div className="profile-field date-field ">
          <label>FECHA DE NACIMIENTO:</label>
          <div className="input-with-icon">
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              dateFormat="dd/MM/yyyy"
              className="date-input"
              open={calendarOpen}
              onClickOutside={() => setCalendarOpen(false)}
              onSelect={() => setCalendarOpen(false)}
              placeholderText="Selecciona una fecha"
              disabled={!editMode}
            />
            <FaCalendarAlt
              className="calendar-icon"
              onClick={() => editMode && setCalendarOpen(prev => !prev)}
            />
          </div>
        </div>

        <div className="profile-field">
          <label>TELEFONO:</label>
          <input
            type="text"
            name="telefono"
            value={profile.telefono}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>

        <div className="profile-field">
          <label>BIOGRAFÍA</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>

        <button className="edit-button" onClick={handleToggleEdit}>
          {editMode ? "GUARDAR" : "EDITAR"}
        </button>
      </div>
    </div>
  );
}

export default ProfileUs

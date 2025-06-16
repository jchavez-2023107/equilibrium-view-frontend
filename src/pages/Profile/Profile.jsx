import { FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import userImage from '../../assets/img/user.png';
import './../Profile/Profile.css';



function Profile() {
  const [birthDate, setBirthDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [profile, setProfile] = useState({
    username: "ppalacios-2023029",
    email: "ppalacios-2023029@kinal.edu.gt",
    telefono: "4210-2425",
    bio: "Voluntario con certificado nivel medio.\nCuento con tres meses de experiencia"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = () => {
    if (editMode) {
      alert("Perfil actualizado ✅");
    }
    setEditMode(prev => !prev);
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Perfil</h1>
        <img src={userImage} alt="Usuario" className="user-image" />

        <div className="profile-field">
          <label>USERNAME:</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>

        <div className="profile-field">
          <label>CORREO:</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            readOnly={!editMode}
          />
        </div>

        <div className="profile-field">
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

export default Profile;

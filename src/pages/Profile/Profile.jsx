import './Profile.css';
import { FaUserCircle, FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import userImage from '../../assets/img/user.png';

function Profile() {
  const [birthDate, setBirthDate] = useState(new Date());
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Perfil</h1>
        <img src={userImage} alt="Usuario" className="user-image" />

        <div className="profile-field">
          <label>USERNAME:</label>
          <input type="text" value="ppalacios-2023029" readOnly />
        </div>

        <div className="profile-field">
          <label>CORREO:</label>
          <input type="text" value="ppalacios-2023029@kinal.edu.gt" readOnly />
        </div>

        <div className="profile-field">
          <label>FECHA DE NACIMIENTO:</label>
          <div className="input-with-icon">
            <DatePicker
              selected={birthDate}
              onChange={date => setBirthDate(date)}
              dateFormat="dd/MM/yyyy"
              className="date-input"
              open={calendarOpen}
              onClickOutside={() => setCalendarOpen(false)}
              onSelect={() => setCalendarOpen(false)}
              placeholderText="Selecciona una fecha"
            />
            <FaCalendarAlt
              className="calendar-icon"
              onClick={() => setCalendarOpen(prev => !prev)}
            />
          </div>
        </div>

        <div className="profile-field">
          <label>TELEFONO:</label>
          <input type="text" value="4210-2425" readOnly />
        </div>

        <div className="profile-field">
          <label>BIOGRAFÍA</label>
          <textarea readOnly>
                Voluntario con certificado nivel medio.
                Cuento con tres meses de experiencia
          </textarea>
        </div>

        <button className="edit-button">EDITAR</button>
      </div>
    </div>
  );
}

export default Profile;

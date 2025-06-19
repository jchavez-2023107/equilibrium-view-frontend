import React, { useState } from "react";
import logo from '../../assets/img/logo.png';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppointments } from "../Appointment/AppointmentContext";
import "./../Calendar/Calendar.css";  // Aquí está el CSS actualizado

export default function CalendarView() {
  const { appointments } = useAppointments();
  const [date, setDate] = useState(new Date());

  const parseDate = (str) => {
    const [y, m, d] = str.split("-");
    return new Date(+y, +m - 1, +d).getTime();
  };

  const selectedTime = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).getTime();

  const appointmentsForDate = appointments.filter((appt) => {
    const a = parseDate(appt.date);
    return selectedTime === a;
  });

  return (
    <div className="calendar-container">
      <header className="calendar-header">
   <div className="logo-combo">
  <img src={logo} alt="Logo" className="logo-img" />
  <span className="logo-text">EQUILIBRIUM</span>
</div>
        <nav className="calendar-nav">
          <a href="/lista-citas" className="nav-link">Lista</a>
          <a href="/crear-cita" className="nav-link">CREAR UNA CITA</a>
        </nav>
      </header>

      <div className="calendar-body">
        <h2 className="calendar-title">Calendario de Citas</h2>
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={({ date: d, view }) => {
            if (view !== "month") return null;
            const tileTime = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
            const count = appointments.filter((appt) => parseDate(appt.date) === tileTime).length;
            if (!count) return null;
            return (
              <div className="dots-container">
                {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                  <span key={i} className="dot"></span>
                ))}
                {count > 3 && <span className="extra-count">+{count - 3}</span>}
              </div>
            );
          }}
          showNeighboringMonth={false}
        />

        {appointmentsForDate.length ? (
          <div className="appointments-list">
            {appointmentsForDate.map((appt) => (
              <div key={appt.id} className="appointment-card">
                <strong className="appointment-title">{appt.title}</strong>
                {appt.description && <p className="appointment-description">{appt.description}</p>}
                <p className="appointment-user">Usuario: {appt.user}</p>
                <p className="appointment-date">Fecha: {appt.date}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="no-appointments">No hay citas en esta fecha.</p>
        )}
      </div>
    </div>
  );
}

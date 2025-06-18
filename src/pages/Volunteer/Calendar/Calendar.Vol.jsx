import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppointments } from "../../../context/AppointmentContext"


export default function CalendarViewVol() {
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
      <h2 className="calendar-title">Calendario de Citas</h2>

      <div className="calendar-wrapper">
        <Calendar
          onChange={setDate}
          value={date}
          tileContent={({ date: d, view }) => {
            if (view !== "month") return null;
            const tileTime = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
            const count = appointments.filter((appt) => {
              const a = parseDate(appt.date);
              return tileTime === a;
            }).length;
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
      </div>

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
  );
}

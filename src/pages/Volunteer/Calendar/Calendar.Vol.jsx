import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useAppointments } from "../../../context/AppointmentContext";
import "./Calendar.Vol.css";
import "../Appointment/Header.Vol.css"

export default function CalendarViewVol() {
  const { appointments, lastUpdate } = useAppointments();
  const [date, setDate] = useState(new Date());
  const [appointmentsForDate, setAppointmentsForDate] = useState([]);

  const getDateOnlyTimestamp = (dateObj) =>
    new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()).getTime();

  const normalizeISODate = (isoStr) => {
    const d = new Date(isoStr);
    return getDateOnlyTimestamp(d);
  };

  // 🔁 Recalcula cuando cambia fecha seleccionada o las citas
    useEffect(() => {
      const filtered = appointments.filter(appt =>
        new Date(appt.scheduledAt).toDateString() === date.toDateString()
      );
      setAppointmentsForDate(filtered);
    }, [appointments, date, lastUpdate]) // 👈 esto es la CLAVE

  return (
    <div className="calendar-container">
      <h2 className="calendar-title">Calendario de Citas</h2>

      <div className="calendar-wrapper">
        <Calendar
          onChange={setDate}
          value={date}
          showNeighboringMonth={false}
        />
      </div>

      {appointmentsForDate.length ? (
        <div className="appointments-list">
          {appointmentsForDate.map((appt) => {
            const localDateTime = new Date(appt.scheduledAt);
            const timeStr = localDateTime.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            });
            const dateStr = localDateTime.toLocaleDateString();

            return (
              <div key={appt._id} className="appointment-card">
                <strong className="appointment-title">
                  {appt.reason || "Sin motivo"}
                </strong>

                <p className="appointment-description">
                  {appt.notes || "Sin notas"}
                </p>

                <p className="appointment-user">
                  <strong>Usuario asignado:</strong> {appt.userId?.username || "Desconocido"}
                </p>

                <p className="appointment-date">
                  <strong>Fecha:</strong> {dateStr} — <strong>Hora:</strong> {timeStr}
                </p>

                <p className="appointment-volunteer">
                  <strong>Voluntario:</strong> {appt.volunteerId?.username || "Desconocido"}
                </p>

                {appt.status && (
                  <p className="appointment-status">
                    <strong>Estado:</strong> {appt.status}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="no-appointments">No hay citas en esta fecha.</p>
      )}
    </div>
  );
}

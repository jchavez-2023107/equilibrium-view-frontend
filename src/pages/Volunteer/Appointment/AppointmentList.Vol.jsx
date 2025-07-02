import React from 'react';
import { useAppointments } from '../../../context/AppointmentContext';
import './AppointmentList.Vol.css'; // Import your CSS styles

export default function AppointmentListVol() {
  const { appointments, deleteAppointment, loading } = useAppointments();

  if (loading) return <p>Cargando citas...</p>;

  return (
    <div className="appointment-list-container">
      <h2 className="list-heading">Mis Citas</h2>

      {appointments.length === 0 ? (
        <div className="no-appointments">No hay citas registradas.</div>
      ) : (
        <div className="appointments-grid">
          {appointments.map((appt) => (
            <div key={appt._id} className="appointment-card">
              <div className="card-header">
                <span className="appointment-title">{appt.reason}</span>
                <button
                  className="btn-delete"
                  aria-label="Eliminar cita"
                  onClick={() => deleteAppointment(appt._id)}
                >
                  &times;
                </button>
              </div>

              {appt.notes && <p className="appointment-description">{appt.notes}</p>}

              <div className="card-footer">
                <p className="appointment-user">Usuario: {appt.userId?.username || 'N/A'}</p>
                <p className="appointment-date">Fecha: {new Date(appt.scheduledAt).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

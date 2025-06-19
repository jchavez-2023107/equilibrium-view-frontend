import React from 'react';
import { useAppointments } from '../../../context/AppointmentContext';

export default function TrashViewUs() {
  const { deletedAppointments } = useAppointments();

  return (
    <div className="trash-container">
      <h2 className="trash-heading">Papelera de Citas</h2>

      {deletedAppointments.length ? (
        <div className="trash-list">
          {deletedAppointments.map((appt) => (
            <div key={appt._id} className="trash-card">
              <p className="trash-title">{appt.reason}</p>
              {appt.notes && <p className="trash-description">{appt.notes}</p>}
              <p className="trash-user">Voluntario: {appt.volunteerId?.username || 'N/A'}</p>
              <p className="trash-date">Fecha: {new Date(appt.scheduledAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="trash-empty">La papelera está vacía.</p>
      )}
    </div>
  );
}

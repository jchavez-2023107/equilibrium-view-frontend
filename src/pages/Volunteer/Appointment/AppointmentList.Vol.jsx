import React from "react";
import { useAppointments } from "../../../context/AppointmentContext";


export default function AppointmentListVol() {
  const { appointments, dispatch } = useAppointments();

  return (
    <div className="appointment-list-container">
      <h2 className="list-heading">Mis Citas</h2>

      {appointments.length === 0 ? (
        <div className="no-appointments">No hay citas registradas.</div>
      ) : (
        <div className="appointments-grid">
          {appointments.map((appt) => (
            <div key={appt.id} className="appointment-card">
              <div className="card-header">
                <span className="appointment-title">{appt.title}</span>
                <button
                  className="btn-delete"
                  aria-label="Eliminar cita"
                  onClick={() =>
                    dispatch({
                      type: "DELETE_APPOINTMENT",
                      payload: { id: appt.id },
                    })
                  }
                >
                  &times;
                </button>
              </div>

              {appt.description && (
                <p className="appointment-description">{appt.description}</p>
              )}

              <div className="card-footer">
                <p className="appointment-user">Usuario: {appt.user}</p>
                <p className="appointment-date">Fecha: {appt.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

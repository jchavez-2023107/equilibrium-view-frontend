import React from "react";
import { useAppointments } from "./AppointmentContext";


export default function TrashView() {
  const { deletedAppointments, dispatch } = useAppointments();

  return (
    <div className="trash-container">
      <h2 className="trash-heading">Papelera de Citas</h2>

      {deletedAppointments.length ? (
        <div className="trash-list">
          {deletedAppointments.map((appt) => (
            <div key={appt.id} className="trash-card">
              <p className="trash-title">{appt.title}</p>
              {appt.description && (
                <p className="trash-description">{appt.description}</p>
              )}
              <p className="trash-user">Usuario: {appt.user}</p>
              <p className="trash-date">Fecha: {appt.date}</p>
              <button
                className="btn-restore"
                onClick={() =>
                  dispatch({ type: "RESTORE_APPOINTMENT", payload: { id: appt.id } })
                }
                aria-label={`Restaurar cita ${appt.title}`}
              >
                &#x21bb; Restaurar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="trash-empty">La papelera está vacía.</p>
      )}
    </div>
  );
}

import { createContext, useContext, useReducer, useEffect } from 'react';

const AppointmentContext = createContext();

const local = JSON.parse(localStorage.getItem('appointmentsState'));

const initialState = local || {
  appointments: [],
  deleted: []
};

function appointmentReducer(state, action) {
  switch (action.type) {
    case 'ADD_APPOINTMENT':
      return {
        ...state,
        appointments: [
          ...state.appointments,
          {
            id: Date.now().toString(),
            title: action.payload.title.trim(),
            description: action.payload.description.trim(),
            user: action.payload.user.trim(),
            date: action.payload.date,
            createdAt: new Date().toISOString()
          }
        ]
      };

    case 'DELETE_APPOINTMENT': {
      const toDelete = state.appointments.find(a => a.id === action.payload.id);
      return {
        ...state,
        appointments: state.appointments.filter(a => a.id !== action.payload.id),
        deleted: [...state.deleted, toDelete]
      };
    }

    case 'RESTORE_APPOINTMENT': {
      const toRestore = state.deleted.find(a => a.id === action.payload.id);
      return {
        ...state,
        appointments: [...state.appointments, toRestore],
        deleted: state.deleted.filter(a => a.id !== action.payload.id)
      };
    }

    default:
      return state;
  }
}

export function AppointmentProvider({ children }) {
  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  useEffect(() => {
    localStorage.setItem('appointmentsState', JSON.stringify(state));
  }, [state]);

  return (
    <AppointmentContext.Provider
      value={{
        appointments: state.appointments,
        deletedAppointments: state.deleted,  // cambio de nombre para claridad
        dispatch
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error('useAppointments debe usarse dentro de AppointmentProvider');
  return context;
}

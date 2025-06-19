import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { SocketProvider } from "./context/SocketContext";
import { connectSocket, disconnectSocket } from "./services/socket";

// --- Lazy imports ---
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));

// VOLUNTEER
const RegisterVolunteer = lazy(() =>
  import("./pages/Volunteer/RegisterVol/RegisterVolunteer")
);
const CompleteVolunteer = lazy(() =>
  import("./pages/Volunteer/RegisterVol/CompleteVolunteer")
);
const MainVolunteer = lazy(() =>
  import("./pages/Volunteer/MainVolunteer/MainVolunteer")
);
const CalendarViewVol = lazy(() =>
  import("./pages/Volunteer/Calendar/Calendar.Vol")
);
const AppointmentFormVol = lazy(() =>
  import("./pages/Volunteer/Appointment/AppointmentForm.Vol")
);
const AppointmentListVol = lazy(() =>
  import("./pages/Volunteer/Appointment/AppointmentList.Vol")
);
const TrashViewVol = lazy(() =>
  import("./pages/Volunteer/Appointment/TrashView.Vol")
);
const LayoutVol = lazy(() =>
  import("./pages/Volunteer/Appointment/Layout.Vol")
);
const ChatVolPage = lazy(() => import("./pages/Volunteer/Chat/ChatVolPage"));
const HelpVol = lazy(() => import("./pages/Volunteer/Help/Help.Vol"));
const ProfileVol = lazy(() => import("./pages/Volunteer/Profile/ProfileVol"));


{/*USER */}
const RegisterUser = lazy(() => import("./pages/User/RegisterUser/RegisterUser"))
const MainUser = lazy(() => import("./pages/User/MainUser/MainUser"))
const ProfileUs = lazy(() => import("./pages/User/Profile/ProfileUs"))
const HelpUs = lazy(() => import('./pages/User/Help/Help.User'))
const ChatUserPage = lazy(() => import('./pages/User/Chat/ChatUserPage'))
const LayoutUs = lazy(() => import("./pages/User/Appointment/Layout.User"))
const CalendarViewUs = lazy(() => import("./pages/User/Calendar/Calendar.User"))
const AppointmentListUs = lazy(() => import("./pages/User/Appointment/AppointmentList.User"))
const AppointmentFormUser = lazy(() => import("./pages/User/Appointment/AppointmentForm.User"))
const TrashViewUs = lazy(() => import("./pages/User/Appointment/TrashView.User"))

const Notification = lazy(() => import("./pages/Notification/Notification"));


function App() {
  useEffect(() => {
  // Siempre conecta con token de localStorage
  const token = localStorage.getItem("token");
  if (token && token.length > 50) {
    connectSocket(token);
  } else {
    disconnectSocket();
  }
  return () => disconnectSocket();
}, []);


  return (
    <SocketProvider>
      <Router>
        <Suspense fallback={<div>Cargando...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />

          {/*USER */}
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/main-user" element={<MainUser />} />
          <Route path="/profile-user" element={<ProfileUs/>}></Route>
          <Route path="/help-user" element={<HelpUs />} />
          <Route path="/chat-user" element={<ChatUserPage/>}></Route>
        <Route element={<LayoutUs/>}>
          <Route path="/calendar-user" element={<CalendarViewUs/>}></Route>
          <Route path="/citas-lista-user" element={<AppointmentListUs/>}></Route>
          <Route path="/citas-new-user" element={<AppointmentFormUser/>}></Route>
          <Route path="/citas-trash-user" element={<TrashViewUs/>}></Route>
        </Route>
            <Route path="/notificacion" element={<Notification />} />

            {/* VOLUNTEER */}
            <Route path="/chat-vol" element={<ChatVolPage />} />
            <Route path="/help-vol" element={<HelpVol />} />
            <Route path="/profile-vol" element={<ProfileVol />} />
            <Route path="/volunteer" element={<RegisterVolunteer />} />
            <Route
              path="/volunteer/complete/:id"
              element={<CompleteVolunteer />}
            />
            <Route path="/main-volunteer" element={<MainVolunteer />} />
            <Route element={<LayoutVol />}>
              <Route path="/calendar-vol" element={<CalendarViewVol />} />
              <Route path="/citas-lista-vol" element={<AppointmentListVol />} />
              <Route path="/citas-new-vol" element={<AppointmentFormVol />} />
              <Route path="/citas-trash-vol" element={<TrashViewVol />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </SocketProvider>
  );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Link,useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";

import MainUser from "./pages/MainUser/MainUser";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import Notification from "./pages/Notification/Notification";
import MainVolunteer from "./pages/MainVolunteer/MainVolunteer";
import RegisterVolunteer from "./pages/RegisterVol/RegisterVolunteer";
import CompleteVolunteer from "./pages/RegisterVol/CompleteVolunteer";
import CalendarView from "./pages/Calendar/Calendar";
import AppointmentList from "./pages/Appointment/AppointmentList";
import AppointmentForm from './pages/Appointment/AppointmentForm'
import TrashView from './pages/Appointment/TrashView'
import Layout from "./pages/Appointment/Layout";
import Help from "./pages/Help/Help";
import Emergenci from "./pages/Chat/Emergenci";
import ChatRoom from "./pages/Chat/ChatRoom";
import Profile from "./pages/Profile/Profile";
import Home from './pages/Home/Home'
import Login from "./pages/Login/Login";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile/>}/>


          {/*USER */}
          <Route path="/register-user" element={<RegisterUser />} />
          <Route path="/main-user" element={<MainUser />} />

          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/chat-emergencia" element={<Emergenci/>}/>


          <Route path="/notificacion" element={<Notification/>}/>
          

          {/*VOLUNTEER */}
            <Route path="/help" element={<Help />} />
            <Route path="/volunteer" element={<RegisterVolunteer />} />
            <Route path="/volunteer/complete/:id" element={<CompleteVolunteer />} />
            <Route path="/main-volunteer" element={<MainVolunteer />} />
          <Route element={<Layout />}>
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/citas-lista" element={<AppointmentList />} />
            <Route path="/citas-new" element={<AppointmentForm />} />
            <Route path="/citas-trash" element={<TrashView />} />
          </Route>

        </Routes>
      </Suspense>
    </Router>
  );
}

export default App

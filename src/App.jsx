import { BrowserRouter as Router, Routes, Route, Link,useLocation } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainUser from "./pages/MainUser/MainUser";
import MainVolunteer from "./pages/MainVolunteer/MainVolunteer";
import RegisterUser from "./pages/RegisterUser/RegisterUser";
import RegisterVolunteer from "./pages/RegisterVol/RegisterVolunteer";
import CompleteVolunteer from "./pages/RegisterVol/CompleteVolunteer";
import Emergenci from "./pages/Chat/Emergenci";
import Calendar from "./pages/Calendar/Calendar";
import Quotes from "./pages/Quotes/Quotes";
import Notification from "./pages/Notification/Notification";
import Profile from "./pages/Profile/Profile";

// Lazy imports
const Home = lazy(() => import("./pages/Home/Home"));
const ChatRoom = lazy(() => import("./pages/Chat/ChatRoom"));
const Help = lazy(() => import("./pages/Help/Help"));
const Login = lazy(() => import("./pages/Login/Login"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/chat-emergencia" element={<Emergenci/>}/>
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/volunteer" element={<RegisterVolunteer />} />
          <Route path="/volunteer/complete/:id" element={<CompleteVolunteer />} />
          <Route path="/main-user" element={<MainUser />} />
          <Route path="/main-volunteer" element={<MainVolunteer />} />
          <Route path="/calendar" element={<Calendar/>}/>
          <Route path="/citas" element={<Quotes/>}/>
          <Route path="/notificacion" element={<Notification/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

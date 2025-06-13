import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Suspense, lazy } from "react";
import MainUser from "./pages/MainUser";
import MainVolunteer from "./pages/MainVolunteer";
import RegisterUser from "./pages/RegisterUser";
import RegisterVolunteer from "./pages/RegisterVolunteer";
import CompleteVolunteer from "./pages/CompleteVolunteer";

// Lazy imports
const Home = lazy(() => import("./pages/Home"));
const ChatRoom = lazy(() => import("./pages/ChatRoom"));
const Resources = lazy(() => import("./pages/Resources"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <Router>
      <nav style={{ padding: "1rem", backgroundColor: "#eee" }}>
        <Link to="/" style={{ marginRight: 10 }}>Inicio</Link>
        <Link to="/chat" style={{ marginRight: 10 }}>Chat</Link>
        <Link to="/resources" style={{ marginRight: 10 }}>Recursos</Link>
        <Link to="/login" style={{ marginRight: 10 }}>Login</Link>
        <Link to="/register" style={{ marginRight: 10 }}>Registro Usuario</Link>
        <Link to="/volunteer" style={{ marginRight: 10 }}>Registro Voluntario</Link>
      </nav>

      <Suspense fallback={<div>Cargando...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/volunteer" element={<RegisterVolunteer />} />
          <Route path="/volunteer/complete/:id" element={<CompleteVolunteer />} />
          <Route path="/main-user" element={<MainUser />} />
          <Route path="/main-volunteer" element={<MainVolunteer />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

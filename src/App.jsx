import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// Lazy imports
const Home = lazy(() => import('./pages/Home'));
const ChatRoom = lazy(() => import('./pages/ChatRoom'));
const Resources = lazy(() => import('./pages/Resources'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#eee' }}>
        <Link to="/" style={{ marginRight: 10 }}>Inicio</Link>
        <Link to="/chat" style={{ marginRight: 10 }}>Chat</Link>
        <Link to="/resources" style={{ marginRight: 10 }}>Recursos</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Suspense fallback={<div>Cargando página... ⏳</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

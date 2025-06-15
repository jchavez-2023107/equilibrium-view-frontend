import { Link } from 'react-router-dom';
import './Home'; // Aquí se importa el archivo externo de estilos

function Home() {
  return (
    <div className="home-container">
      <header className="header">
        <div className="header-left">
          <span className="logo">🧘‍♂️ Equilibrium</span>
        </div>
        <div className="header-right">
          <Link to="/login" className="header-link">Iniciar Sesión</Link>
          <Link to="/volunteer" className="header-link">Únete al equipo</Link>
        </div>
      </header>

      <main className="main-content">
        <h1 className="main-title">A un paso de la estabilidad mental que mereces</h1>
        <h2 className="main-subtitle">Conecta con más de 30 voluntarios comprometidos con tu bienestar</h2>
        
        <p className="emergency-text">¿Tienes una emergencia?</p>
        <Link to='/chat-emergencia'>
          <button className="emergency-button">EMERGENCIA</button>
        </Link>
        

        <section className="features">
          <div className="feature-box">
            <img src="" alt="" className="feature-icon" />
            <h4>Disponibilidad 24/7</h4>
          </div>
          <div className="feature-box">
            <img src="" alt="" className="feature-icon" />
            <h4>Chats en tiempo real</h4>
          </div>
          <div className="feature-box">
            <img src="" alt="" className="feature-icon" />
            <h4>Total privacidad</h4>
          </div>
          <div className="feature-box">
            <img src="" alt="" className="feature-icon" />
            <h4>+50 usuarios activos</h4>
          </div>
          <div className="feature-box">
            <img src="" alt="" className="feature-icon" />
            <h4>+30 voluntarios certificados activos</h4>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;

import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";
import "./../Home/Home.css";

import calendar from "../../assets/img/calendar.png";
import chatimg from "../../assets/img/chat.png";
import privacidadimg from "../../assets/img/privacidad.png";
import usuariosimg from "../../assets/img/usuarios.png";
import comunidadimg from "../../assets/img/comunidad.png";
import logo from "../../assets/img/Logo.png";

function Home() {
  return (
    <div className="home-container">
      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          {/* ✅ CORRECCIÓN: envolver imagen y texto en logo-container */}
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo-img" />
            <span className="logo-text">EQUILIBRIUM</span>
          </div>
        </div>

        <div className="header-right">
          <Link to="/volunteer" className="header-link">
            ÚNETE AL EQUIPO
          </Link>
          <Link to="/login" className="header-link">
            INICIAR SESIÓN
          </Link>
        </div>
      </header>

      {/* MAIN */}
      <main className="main-content">
        <h1 className="main-title">
          A un paso de la estabilidad mental que mereces
        </h1>
        <h2 className="main-subtitle">
          Conecta con más de 30 voluntarios comprometidos con tu bienestar
        </h2>

        <p className="emergency-text">¿Tienes una emergencia?</p>
        <Link to="/login">
          <button className="emergency-button">EMERGENCIA</button>
        </Link>

        {/* FEATURES */}
        <section className="features">
          <div className="feature-box">
            <img src={calendar} alt="calendar" className="feature-icon" />
            <h4>Disponibilidad 24/7</h4>
          </div>
          <div className="feature-box">
            <img src={chatimg} alt="chat" className="feature-icon" />
            <h4>Chats en tiempo real</h4>
          </div>
          <div className="feature-box">
            <img
              src={privacidadimg}
              alt="privacidad"
              className="feature-icon"
            />
            <h4>Total privacidad</h4>
          </div>
          <div className="feature-box">
            <img src={usuariosimg} alt="usuarios" className="feature-icon" />
            <h4>+50 usuarios activos</h4>
          </div>
          <div className="feature-box">
            <img src={comunidadimg} alt="comunidad" className="feature-icon" />
            <h4>+30 voluntarios certificados activos</h4>
          </div>
          {/* FOOTER AGRADECIMIENTOS */}
          <footer className="footer-thanks">
            <p className="footer-agradecimientos">
              Agradecimientos a todos los programadores y compañeros que<br />
              hicieron realidad este proyecto:
            </p>
            <p className="footer-nombres">
              Pablo Palacios, Diego Chupina, Andrés Oliva, Pedro Bautista y Joel Chávez.
            </p>

            <div className="footer-copy">
              © 2025 Equilibrium. Todos los derechos reservados.
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default Home;

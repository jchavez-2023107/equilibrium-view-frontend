import { Link } from "react-router-dom";
import userImage from '../../assets/img/user.png';
import logo from '../../assets/img/logo.png';
import './../Help/Help.css';

function Help() {
  return (
    <div className="help-page">
      {/* ENCABEZADO */}
      <header className="user-header">
        <div className="left-section">
          <Link to="/main-user" className="logo-title">
            <img src={logo} alt="Logo" className="logo" />
            <h1 className="title">EQUILIBRIUM</h1>
          </Link>
        </div>
        <div className="right-section">
          <Link to="/chat-emergencia" className="nav-link red">Emergencia</Link>
          <Link to="/chat" className="nav-link">Historial</Link>
          <Link to="/help" className="nav-link">Ayuda</Link>
          <Link to="/notificacion" className="notification-icon">🔔</Link>
          <span className="username">NOMBRE DE USUARIO</span>
          <Link to="/profile">
            <img src={userImage} alt="Usuario" className="user-image" />
          </Link>
        </div>
      </header>

      {/* CUERPO */}
      <main className="help-container">
        <h2 className="help-title">TRASTORNOS</h2>
        <div className="help-grid">
          <div className="help-card">
            <h3>Depresion</h3>
            <p>
             Se manifiesta como una tristeza intensa e incontrolable ante situaciones cotidianas, 
             acompañada de síntomas físicos como fatiga constante, aislamiento social, 
             dificultad para concentrarse y problemas para dormir.
            </p>
            <Link to="/trastornos/depresion" className="learn-more">APRENDE MÁS</Link>
          </div>

          <div className="help-card">
            <h3>Trastorno de ansiedad generalizada (TAG)</h3>
            <p>
              Se manifiesta como una preocupación excesiva e incontrolable por situaciones
              cotidianas, acompañada de síntomas físicos como tensión muscular, inquietud,
              dificultad para concentrarse y problemas para dormir.
            </p>
            <Link to="/trastornos/ansiedad" className="learn-more">APRENDE MÁS</Link>
          </div>

          <div className="help-card">
            <h3>Esquizofrenia</h3>
            <p>
              Trastorno mental grave que altera la percepción de la realidad y afecta pensamientos, emociones y comportamientos. Puede incluir alucinaciones, delirios, pensamiento desorganizado y deterioro del funcionamiento social o laboral.
            </p>
            <Link to="/trastornos/esquizofrenia" className="learn-more">APRENDE MÁS</Link>
          </div>

          <div className="help-card">
            <h3>Trastorno obsesivo-compulsivo (TOC)</h3>
            <p>
              Se caracteriza por pensamientos intrusivos y no deseados (obsesiones) que causan ansiedad,
              y comportamientos repetitivos (compulsiones) que la persona siente la necesidad de realizar
              para aliviar esa ansiedad.
            </p>
            <Link to="/trastornos/toc" className="learn-more">APRENDE MÁS</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Help

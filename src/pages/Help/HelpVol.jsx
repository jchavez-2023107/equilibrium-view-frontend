import { Link } from "react-router-dom";
import userImage from '../../assets/img/user.png';


function Help() {
  return (
    <div>
      {/* ENCABEZADO */}
      <header className="user-header">
        <div className="left-section">
        <Link to='/main-volunteer'>
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1 className="title">Equilibrium</h1>
        </Link>

        </div>
        <div className="right-section">
          <Link to="/chat-emergencia" className="nav-link">Emergencia</Link>
          <Link to="/chat" className="nav-link">Historial</Link>
          <Link to="/help" className="nav-link">Ayuda</Link>
          <Link to="/notificacion" className="notification-icon">🔔</Link>
          <span className="username">Nombre del Usuario</span>
          <Link to="/profile">
            <img src={userImage} alt="Usuario" className="user-image" />
          </Link>
        </div>
      </header>

      {/* CUERPO */}
      <main className="help-container">
        <h2 className="help-title">Trastornos</h2>

        <div className="help-grid">
          {/* Cuadro 1 */}
          <div className="help-card">
            <h3>Depresión</h3>
            <p>
              Trastorno del estado de ánimo caracterizado por una tristeza persistente,
              pérdida de interés en actividades, fatiga, cambios en el apetito y el sueño,
              y pensamientos negativos o suicidas.
            </p>
            <Link to="/trastornos/depresion" className="learn-more">Aprende Más</Link>
          </div>

          {/* Cuadro 2 */}
          <div className="help-card">
            <h3>Trastorno de ansiedad generalizada (TAG)</h3>
            <p>
              Se manifiesta como una preocupación excesiva e incontrolable por situaciones
              cotidianas, acompañada de síntomas físicos como tensión muscular, inquietud,
              dificultad para concentrarse y problemas para dormir.
            </p>
            <Link to="/trastornos/ansiedad" className="learn-more">Aprende Más</Link>
          </div>

          {/* Cuadro 3 */}
          <div className="help-card">
            <h3>Esquizofrenia</h3>
            <p>
              Trastorno mental grave que afecta la forma en que una persona piensa, siente
              y se comporta. Puede incluir alucinaciones, delirios, pensamiento desorganizado
              y deterioro del funcionamiento social o laboral.
            </p>
            <Link to="/trastornos/esquizofrenia" className="learn-more">Aprende Más</Link>
          </div>

          {/* Cuadro 4 */}
          <div className="help-card">
            <h3>Trastorno obsesivo-compulsivo (TOC)</h3>
            <p>
              Se caracteriza por pensamientos intrusivos y no deseados (obsesiones) que causan
              ansiedad, y comportamientos repetitivos (compulsiones) que la persona siente la
              necesidad de realizar para aliviar esa ansiedad.
            </p>
            <Link to="/trastornos/toc" className="learn-more">Aprende Más</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Help;

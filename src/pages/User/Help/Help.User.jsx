import { Link } from "react-router-dom";
import userImage from '../../../assets/img/user.png';
import logo from '../../../assets/img/Logo.png';
import './Help.css';
import { useAuth } from '../../../context/AuthContext'
import ModalProfile from "../../ModalProfile/ModalProfile"; 
import { useState } from "react";
import notificacioneImg from "../../../assets/img/notificaciones.png";
function HelpUs() {
  const {user} = useAuth()

    const [isModalOpen, setIsModalOpen] = useState(false)
  const [profile, setProfile] = useState(
    {
      username:'',
      email: '',
      telefono: '',
      bio: ''
    }
  )

  const [birthDate, setBirthDate] = useState(null)


  const closeModal = () => setIsModalOpen(false)

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
          <Link to="/chat-user" className="nav-link">Chats</Link>
          <Link to="/help-user" className="nav-link">Ayuda</Link>
          <Link to="/notificacion-user" className="volu-notif"> <img src={notificacioneImg} alt="Notificaciones" className="campana-img" /></Link>
          <Link to="/profile-user" className="username">
            {user?.username || 'Usuario'}
          </Link>
            <img
              src={userImage}
              alt="Usuario"
              className="user-image"
              onClick={() => setIsModalOpen(true)}
              style={{ cursor: 'pointer' }}
            />
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
            <Link to="/depresion" className="learn-more">APRENDE MÁS</Link>
          </div>

          <div className="help-card">
            <h3>Trastorno de ansiedad generalizada (TAG)</h3>
            <p>
              Se manifiesta como una preocupación excesiva e incontrolable por situaciones
              cotidianas, acompañada de síntomas físicos como tensión muscular, inquietud,
              dificultad para concentrarse y problemas para dormir.
            </p>
            <Link to="/trastornoAnsiedad" className="learn-more">APRENDE MÁS</Link>
          </div>

          <div className="help-card">
            <h3>Esquizofrenia</h3>
            <p>
              Trastorno mental grave que altera la percepción de la realidad y afecta pensamientos, emociones y comportamientos. Puede incluir alucinaciones, delirios, pensamiento desorganizado y deterioro del funcionamiento social o laboral.
            </p>
            <Link to="/esquizofrenia" className="learn-more">APRENDE MÁS</Link>
          </div>

          <div className="help-card">
            <h3>Trastorno obsesivo-compulsivo (TOC)</h3>
            <p>
              Se caracteriza por pensamientos intrusivos y no deseados (obsesiones) que causan ansiedad,
              y comportamientos repetitivos (compulsiones) que la persona siente la necesidad de realizar
              para aliviar esa ansiedad.
            </p>
            <Link to="/TOC" className="learn-more">APRENDE MÁS</Link>
          </div>
        </div>
      </main>
        <ModalProfile
          isOpen={isModalOpen}
          onClose={closeModal}
          profile={profile}
          setProfile={setProfile}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
        />
    </div>
  );
}

export default HelpUs

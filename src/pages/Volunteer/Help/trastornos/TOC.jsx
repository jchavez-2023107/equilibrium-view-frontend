import { Link } from 'react-router-dom';
import './trastornos.css';
import logo from '../../../../assets/img/Logo.png';
import userImage from '../../../../assets/img/user.png';
import { useAuth } from '../../../../context/AuthContext';

export default function TOCPage() {
  const { user } = useAuth();

  return (
    <div className="depresion-page">
      {/* ✅ CABECERA UNIFICADA */}
      <header className="encabezado">
        <div className="encabezado-izquierda">
          <Link to="/main-user">
            <img src={logo} alt="Logo Equilibrium" className="logo" />
          </Link>
          <h1 className="titulo">EQUILIBRIUM</h1>
        </div>
        <div className="encabezado-derecha">
          <Link to="/chat-user" className="nav">CHATS</Link>
          <Link to="/help-user" className="nav">AYUDA</Link>
          <span className="usuario">{user?.username || "Usuario"}</span>
          <img src={userImage} alt="Usuario" className="user-img" />
        </div>
      </header>

      {/* ✅ CONTENIDO EDUCATIVO */}
      <main className="depresion-container">
        <h1 className="main-topic-title">TRASTORNO OBSESIVO-COMPULSIVO (TOC)</h1> {/* ✅ NUEVO TÍTULO PRINCIPAL */}
        <h2 className="section-title">¿Qué es el Trastorno Obsesivo-Compulsivo (TOC)?</h2>
        <p>
          El TOC es un trastorno de ansiedad que se caracteriza por pensamientos recurrentes, no deseados (obsesiones) y conductas repetitivas (compulsiones) que la persona se siente impulsada a realizar. Estas acciones interfieren significativamente en la vida cotidiana.
        </p>

        <h2 className="section-title">Síntomas del TOC</h2>
        <ul>
          <li>Obsesiones como miedo a los gérmenes o a hacer daño a otros</li>
          <li>Compulsiones como lavarse las manos repetidamente o verificar cosas una y otra vez</li>
          <li>Sensación de urgencia por realizar rituales para reducir ansiedad</li>
          <li>Dificultad para controlar los pensamientos intrusivos</li>
          <li>Incapacidad para concentrarse por las obsesiones</li>
        </ul>

        <h2 className="section-title">Causas del TOC</h2>
        <p>
          El TOC puede tener causas genéticas, neurológicas y ambientales. Los antecedentes familiares, desequilibrios en serotonina y experiencias traumáticas tempranas pueden jugar un papel importante en su aparición.
        </p>

        <h2 className="section-title">Diagnóstico</h2>
        <p>
          Se diagnostica por profesionales de salud mental mediante entrevistas clínicas y cuestionarios como el Y-BOCS. Es importante que los síntomas causen malestar significativo y afecten el funcionamiento diario.
        </p>

        <h2 className="section-title">Tratamiento</h2>
        <ul>
          <li><strong>Terapia cognitivo-conductual (TCC):</strong> Especialmente la técnica de exposición con prevención de respuesta (EPR).</li>
          <li><strong>Medicamentos:</strong> Inhibidores selectivos de la recaptación de serotonina (ISRS).</li>
          <li><strong>Terapia familiar:</strong> Involucrar al entorno ayuda a reducir comportamientos que refuercen el TOC.</li>
          <li><strong>Técnicas de autocontrol:</strong> Meditación, respiración y manejo del estrés.</li>
        </ul>
      </main>
    </div>
  );
}

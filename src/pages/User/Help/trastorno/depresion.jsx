import { Link } from 'react-router-dom';
import './trastornos.css';
import logo from '../../../../assets/img/Logo.png';
import userImage from '../../../../assets/img/user.png';
import { useAuth } from '../../../../context/AuthContext';

export default function DepresionPage() {
  const { user } = useAuth();

  return (
    <div className="depresion-page">
      <header className="encabezado">
        <div className="encabezado-izquierda">
          <Link to="/main-user">
            <img src={logo} alt="Logo Equilibrium" className="logo" />
          </Link>
          <h1 className="titulo">EQUILIBRIUM</h1>
        </div>
        <div className="encabezado-derecha">
          <Link to="/chat-user" className="nav">Chats</Link>
          <Link to="/help-user" className="nav">Ayuda</Link>
          <span className="usuario">{user?.username || "Usuario"}</span>
          <img src={userImage} alt="Usuario" className="user-img" />
        </div>
      </header>

      <main className="depresion-container">
        <h1 className="main-topic-title">DEPRESIÓN</h1> {/* ✅ NUEVO TÍTULO PRINCIPAL */}
        <h2 className="section-title">¿Qué es la Depresión?</h2>
        <p>
          La depresión es un trastorno del estado de ánimo que afecta profundamente la forma en que las personas piensan, sienten y manejan sus actividades diarias. Va más allá de sentirse triste ocasionalmente: implica una sensación de vacío, desesperanza o apatía que persiste por semanas o incluso meses.
        </p>

        <h2 className="section-title">Síntomas de la Depresión</h2>
        <ul>
          <li>Tristeza persistente, ansiedad o sensación de vacío</li>
          <li>Pérdida de interés en actividades que antes se disfrutaban</li>
          <li>Fatiga o falta de energía</li>
          <li>Problemas para dormir o dormir demasiado</li>
          <li>Sentimientos de culpa o inutilidad</li>
          <li>Dificultad para concentrarse o tomar decisiones</li>
          <li>Pensamientos de muerte o suicidio</li>
        </ul>

        <h2 className="section-title">Tipos de Depresión</h2>
        <ul>
          <li><strong>Trastorno depresivo mayor:</strong> Episodios intensos de tristeza y falta de motivación.</li>
          <li><strong>Distimia:</strong> Forma crónica y menos severa de depresión.</li>
          <li><strong>Depresión estacional:</strong> Asociada a cambios estacionales, común en invierno.</li>
          <li><strong>Depresión posparto:</strong> Después del parto, por cambios hormonales y emocionales.</li>
        </ul>

        <h2 className="section-title">Causas de la Depresión</h2>
        <p>
          Sus causas pueden ser múltiples: desequilibrios químicos en el cerebro, genética, estrés prolongado, trauma emocional, enfermedades crónicas o incluso factores sociales como el aislamiento.
        </p>

        <h2 className="section-title">Diagnóstico</h2>
        <p>
          Un diagnóstico lo realiza un profesional de la salud mental mediante entrevistas clínicas, cuestionarios como el PHQ-9 y observación de síntomas. La clave es que los síntomas duren al menos dos semanas y afecten la funcionalidad diaria.
        </p>

        <h2 className="section-title">Tratamiento</h2>
        <ul>
          <li><strong>Psicoterapia:</strong> Terapia cognitivo-conductual, interpersonal o de apoyo.</li>
          <li><strong>Medicamentos:</strong> Antidepresivos como ISRS o tricíclicos, bajo supervisión médica.</li>
          <li><strong>Hábitos saludables:</strong> Ejercicio, meditación, sueño adecuado y alimentación.</li>
          <li><strong>Apoyo social:</strong> Conversar con seres queridos o grupos de apoyo puede marcar la diferencia.</li>
        </ul>
      </main>
    </div>
  );
}

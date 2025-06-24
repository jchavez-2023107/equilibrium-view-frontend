import { Link } from 'react-router-dom';
import './trastornos.css'; // puedes renombrarlo si deseas
import logo from '../../../../assets/img/Logo.png';
import userImage from '../../../../assets/img/user.png';
import { useAuth } from '../../../../context/AuthContext';

export default function TrastornoAnsiedadPage() {
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
        <h1 className="main-topic-title">TRASTORNO DE ANSIEDAD GENERALIZADA (TAG)</h1> {/* ✅ NUEVO TÍTULO PRINCIPAL */}
        <h2 className="section-title">¿Qué es el Trastorno de Ansiedad Generalizada (TAG)?</h2>
        <p>
          El TAG es un trastorno caracterizado por una preocupación excesiva y persistente por múltiples aspectos de la vida, como el trabajo, la salud o los problemas cotidianos. Estas preocupaciones son difíciles de controlar y generan un impacto importante en el bienestar.
        </p>

        <h2 className="section-title">Síntomas del TAG</h2>
        <ul>
          <li>Preocupación constante, incluso por cosas menores</li>
          <li>Tensión muscular o fatiga</li>
          <li>Dificultad para concentrarse</li>
          <li>Irritabilidad o sensación de estar en alerta permanente</li>
          <li>Problemas para dormir o insomnio</li>
          <li>Palpitaciones, sudoración o mareos</li>
        </ul>

        <h2 className="section-title">Causas del TAG</h2>
        <p>
          El origen del TAG puede deberse a factores genéticos, desequilibrios químicos cerebrales, antecedentes familiares, personalidad ansiosa o experiencias traumáticas. El estrés crónico y la falta de apoyo social también contribuyen.
        </p>

        <h2 className="section-title">Diagnóstico</h2>
        <p>
          Se diagnostica mediante entrevistas clínicas por profesionales de salud mental. Se utilizan herramientas como el GAD-7 para evaluar la intensidad de los síntomas y su duración (al menos 6 meses).
        </p>

        <h2 className="section-title">Tratamiento</h2>
        <ul>
          <li><strong>Terapia cognitivo-conductual (TCC):</strong> Ayuda a identificar y cambiar pensamientos distorsionados.</li>
          <li><strong>Medicamentos:</strong> Ansiolíticos o antidepresivos bajo supervisión médica.</li>
          <li><strong>Técnicas de relajación:</strong> Respiración profunda, meditación, mindfulness.</li>
          <li><strong>Estilo de vida saludable:</strong> Ejercicio regular, buena alimentación y descanso adecuado.</li>
        </ul>
      </main>
    </div>
  );
}

import { Link } from 'react-router-dom';
import './trastornos.css';
import logo from '../../../../assets/img/Logo.png';
import userImage from '../../../../assets/img/user.png';
import { useAuth } from '../../../../context/AuthContext';

export default function EsquizofreniaPage() {
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
          <h1 className="main-topic-title">ESQUIZOFENIA</h1> {/* ✅ NUEVO TÍTULO PRINCIPAL */}
        <h2 className="section-title">¿Qué es la Esquizofrenia?</h2>
        <p>
          La esquizofrenia es un trastorno mental crónico y grave que afecta cómo una persona piensa, siente y se comporta. Las personas con esquizofrenia pueden parecer como si hubieran perdido el contacto con la realidad, lo que puede causar angustia tanto para ellos como para quienes los rodean.
        </p>

        <h2 className="section-title">Síntomas comunes</h2>
        <ul>
          <li>Alucinaciones (oír o ver cosas que no están presentes)</li>
          <li>Delirios (creencias falsas, a menudo paranoides)</li>
          <li>Pensamiento desorganizado o discurso incoherente</li>
          <li>Falta de motivación o energía</li>
          <li>Expresión emocional reducida o ausente</li>
          <li>Aislamiento social</li>
        </ul>

        <h2 className="section-title">Causas</h2>
        <p>
          Aunque no se conocen con certeza, se cree que la esquizofrenia surge de una combinación de factores genéticos, químicos cerebrales (dopamina, glutamato), eventos estresantes y ambientes desfavorables durante el desarrollo.
        </p>

        <h2 className="section-title">Diagnóstico</h2>
        <p>
          El diagnóstico se realiza mediante entrevistas clínicas extensas, observación de síntomas y pruebas para descartar otras condiciones médicas. Los síntomas deben estar presentes durante al menos 6 meses para un diagnóstico formal.
        </p>

        <h2 className="section-title">Tratamiento</h2>
        <ul>
          <li><strong>Medicamentos antipsicóticos:</strong> Ayudan a controlar los síntomas psicóticos.</li>
          <li><strong>Terapia psicosocial:</strong> Entrenamiento de habilidades sociales, terapia cognitiva y rehabilitación.</li>
          <li><strong>Apoyo familiar:</strong> Educar a la familia mejora el entorno del paciente.</li>
          <li><strong>Seguimiento médico constante:</strong> La continuidad del tratamiento es clave para la estabilidad.</li>
        </ul>
      </main>
    </div>
  );
}

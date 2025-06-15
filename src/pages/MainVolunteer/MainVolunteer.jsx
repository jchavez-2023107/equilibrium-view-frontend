import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import userImage from '../../assets/img/user.png';
import contactImg from '../../assets/img/contact.png';
import volunteerImg from '../../assets/img/volunteer.png';
import calendarImg from '../../assets/img/calendar.png';


Chart.register(ArcElement, Tooltip, Legend);

export default function MainUser() {
  const frases = [
    "Confía en ti, incluso cuando dudes.",
    "Cada día es una nueva oportunidad.",
    "Respira, lo estás haciendo bien.",
    "Tu valor no cambia por tus errores.",
    "La calma llega, solo sé paciente.",
    "Estás más cerca de lo que crees.",
    "Sé amable contigo mismo hoy."
  ];

  const fraseDelDia = frases[new Date().getDay()];
  const today = new Date().toLocaleDateString();

  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [emotionsData, setEmotionsData] = useState({ triste: 0, serio: 0, feliz: 0 });

  // Cargar datos de localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('emociones')) || {};
    setEmotionsData(stored);
  }, []);

  // Guardar emoción del día
  const handleEmotionClick = (emotion) => {
    const stored = JSON.parse(localStorage.getItem('emociones')) || {};
    if (!stored[emotion]) stored[emotion] = 0;

    // Verifica si ya registró hoy
    const lastEntry = localStorage.getItem('emocionHoy');
    if (lastEntry === today) return alert('Ya registraste tu emoción hoy');

    stored[emotion] += 1;
    localStorage.setItem('emociones', JSON.stringify(stored));
    localStorage.setItem('emocionHoy', today);
    setEmotionsData(stored);
    setSelectedEmotion(emotion);
  };

  const total = Object.values(emotionsData).reduce((a, b) => a + b, 0);
  const mostFrequent = Object.entries(emotionsData).sort((a, b) => b[1] - a[1])[0]?.[0] || "";

  const chartData = {
    labels: ['Triste', 'Serio', 'Feliz'],
    datasets: [
      {
        data: [emotionsData.triste, emotionsData.serio, emotionsData.feliz],
        backgroundColor: ['#6BAED6', '#FFD54F', '#81C784'],
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <header className="user-header">
        <div className="left-section">
          <img src="/logo.png" alt="Logo" className="logo" />
          <h1 className="title">Equilibrium</h1>
        </div>
        <div className="right-section">
          <Link to="/chat" className="nav-link">Chats</Link>
          <Link to="/help" className="nav-link">Ayuda</Link>
          <Link to="/notificacion" className="notification-icon">🔔</Link>
          <span className="username">Nombre del Usuario</span>
          <Link to="/profile">
            <img src={userImage} alt="Usuario" className="user-image" />
          </Link>
        </div>
      </header>

      <main className="main-content">
        <h2 className="saludo">¡Hola, Nombre del Usuario! Estamos felices de verte de nuevo.<br />¿Listo para continuar ayudando a personas para que tengan equilibrio mental?</h2>

        <div className="cuadros">
          <div className="cuadro">
            <h3>Última Sesión</h3>
            <p>Fecha: 10/06/2025</p>
            <p>Duración: 45 minutos</p>
            <p>Usuario: Ana Morales</p>
            <Link to="/chat">
              <button>Chat</button>
            </Link>
          </div>

          <div className="cuadro">
            <h3>Sesión Anterior</h3>
            <p>Fecha: 05/06/2025</p>
            <p>Duración: 40 minutos</p>
            <p>Usuario: Luis Rodríguez</p>
            <Link to='/calendar'>
              <button>Ver</button>
            </Link>
          </div>
        </div>

        <div className="encuesta">
          <h3>¿Cómo te encuentras el día de hoy?</h3>
          <div className="emojis">
            <button onClick={() => handleEmotionClick('triste')} className={selectedEmotion === 'triste' ? 'selected' : ''}>😢</button>
            <button onClick={() => handleEmotionClick('serio')} className={selectedEmotion === 'serio' ? 'selected' : ''}>😐</button>
            <button onClick={() => handleEmotionClick('feliz')} className={selectedEmotion === 'feliz' ? 'selected' : ''}>😊</button>
          </div>
        </div>

        <div className="estadistica">
          <h3>Estadística Emocional</h3>
          <Doughnut data={chartData} />
          <p className="mensaje-emocional">
            {
              mostFrequent === 'feliz' ? "¡Tu constancia emocional es admirable! Sigue así 😊" :
              mostFrequent === 'serio' ? "Te invitamos a reflexionar y abrir espacio al cambio 🧘" :
              mostFrequent === 'triste' ? "Recuerda que siempre hay apoyo para los días difíciles 💙" :
              "Aún no has registrado emociones."
            }
          </p>
        </div>

        <div className="cuadros">
          <div className="cuadro-contacto">
            <img src={volunteerImg} alt="Profesional" />
            <p>Contacta con un Administrador</p>
            <button>Contactar</button>
          </div>

          <div className="cuadro-contacto">
            <img src={userImage} alt="Voluntario" />
            <p>Contacta con un usuario necesitado</p>
            <Link to="/chat">
              <button>Chat</button>
            </Link>
          </div>

          <div className="cuadro-contacto">
            <img src={calendarImg} alt="Agenda" />
            <p>Agenda una cita con un usuario</p>
            <Link to="/citas">
              <button>Agendar</button>
            </Link>
          </div>
        </div>

        <footer className="footer">
          <p><strong>FRASE DEL DÍA ❤️</strong></p>
          <p className="frase-dia">{fraseDelDia}</p>
        </footer>
      </main>
    </div>
  );
}

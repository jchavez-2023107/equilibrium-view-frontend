import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import logo from '../../assets/img/logo.png';
import userImage from '../../assets/img/user.png';
import volunteerImg from '../../assets/img/volunteer.png';
import calendarImg from '../../assets/img/calendar.png';
import './../MainVolunteer/MainVol.css';

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

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('emociones')) || {};
    setEmotionsData(stored);
  }, []);

  const handleEmotionClick = (emotion) => {
    const stored = JSON.parse(localStorage.getItem('emociones')) || {};
    if (!stored[emotion]) stored[emotion] = 0;

    const lastEntry = localStorage.getItem('emocionHoy');
    if (lastEntry === today) return alert('Ya registraste tu emoción hoy');

    stored[emotion] += 1;
    localStorage.setItem('emociones', JSON.stringify(stored));
    localStorage.setItem('emocionHoy', today);
    setEmotionsData(stored);
    setSelectedEmotion(emotion);
  };

  const total = Object.values(emotionsData).reduce((a, b) => a + b, 0);
  const mostFrequent = Object.entries(emotionsData)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || '';

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
    <div className="volu-container">
      <header className="volu-header">
        <div className="volu-left">
          <img src={logo} alt="Logo Equilibrium" className="volu-logo" />
          <h1 className="volu-title">Equilibrium</h1>
        </div>
        <div className="volu-right">
          <Link to="/chat" className="volu-nav">Chats</Link>
          <Link to="/help" className="volu-nav">Ayuda</Link>
          <Link to="/notificacion" className="volu-notif">🔔</Link>
          <span className="volu-user">Nombre del Usuario</span>
          <Link to="/profile">
            <img src={userImage} alt="Usuario" className="volu-user-img" />
          </Link>
        </div>
      </header>

      <main className="volu-main">
        <h2 className="volu-saludo">
          ¡Hola, Nombre del Usuario! Estamos felices de verte de nuevo.<br />
          ¿Listo para continuar ayudando a personas para que tengan equilibrio mental?
        </h2>

        <div className="volu-cards">
          <div className="volu-card">
            <h3>Última Sesión</h3>
            <p>Fecha: 10/06/2025</p>
            <p>Duración: 45 minutos</p>
            <p>Usuario: Ana Morales</p>
            <Link to="/chat"><button>Chat</button></Link>
          </div>

          <div className="volu-card">
            <h3>Sesión Anterior</h3>
            <p>Fecha: 05/06/2025</p>
            <p>Duración: 40 minutos</p>
            <p>Usuario: Luis Rodríguez</p>
            <Link to="/calendar"><button>Ver</button></Link>
          </div>
        </div>

        <div className="volu-encuesta">
          <h3>¿Cómo te encuentras el día de hoy?</h3>
          <div className="volu-emojis">
            <button onClick={() => handleEmotionClick('triste')} className={selectedEmotion === 'triste' ? 'selected' : ''}>😢</button>
            <button onClick={() => handleEmotionClick('serio')} className={selectedEmotion === 'serio' ? 'selected' : ''}>😐</button>
            <button onClick={() => handleEmotionClick('feliz')} className={selectedEmotion === 'feliz' ? 'selected' : ''}>😊</button>
          </div>
        </div>

        {total > 0 && (
          <div className="volu-estadistica">
            <h3>Estadística Emocional</h3>
            <Doughnut data={chartData} />
            <p className="volu-mensaje-emocional">
              {mostFrequent === 'feliz' && "¡Tu constancia emocional es admirable 😊"}
              {mostFrequent === 'serio' && "Te invitamos a reflexionar 🧘"}
              {mostFrequent === 'triste' && "Recuerda que siempre hay apoyo 💙"}
            </p>
          </div>
        )}

        <div className="volu-cards">
          <div className="volu-card-contact">
            <img src={volunteerImg} alt="Profesional" />
            <p>Contacta con un Administrador</p>
            <button>Contactar</button>
          </div>

          <div className="volu-card-contact">
            <img src={userImage} alt="Voluntario" />
            <p>Contacta con un usuario necesitado</p>
            <Link to="/chat"><button>Chat</button></Link>
          </div>

          <div className="volu-card-contact">
            <img src={calendarImg} alt="Agenda" />
            <p>Agenda una cita con un usuario</p>
            <Link to="/citas"><button>Agendar</button></Link>
          </div>
        </div>
      </main>

      <footer className="volu-footer">
        <p><strong>FRASE DEL DÍA ❤️</strong></p>
        <p className="volu-frase-dia">{fraseDelDia}</p>
      </footer>
    </div>
  );
}

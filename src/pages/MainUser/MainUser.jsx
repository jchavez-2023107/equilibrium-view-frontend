import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import logo from '../../assets/img/logo.png';
import userImage from '../../assets/img/user.png';
import volunteerImg from '../../assets/img/volunteer.png';
import calendarImg from '../../assets/img/calendar.png';
import './../MainUser/MainUs.css';


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

  const [selected, setSelected] = useState({});
  const [emotionsData, setEmotionsData] = useState({ triste: 0, serio: 0, feliz: 0 });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('emociones')) || {};
    setEmotionsData(stored);
    const todayState = JSON.parse(localStorage.getItem('emocionesHoy')) || {};
    setSelected(todayState);
  }, []);

  const handleEmotionClick = (emotion) => {
    const stored = JSON.parse(localStorage.getItem('emociones')) || {};
    const todayState = JSON.parse(localStorage.getItem('emocionesHoy')) || {};

    if (todayState[emotion] === today) {
      return alert(`Ya registraste "${emotion}" hoy`);
    }

    const newCount = (stored[emotion] || 0) + 1;
    stored[emotion] = newCount;
    todayState[emotion] = today;

    localStorage.setItem('emociones', JSON.stringify(stored));
    localStorage.setItem('emocionesHoy', JSON.stringify(todayState));

    setEmotionsData(stored);
    setSelected(todayState);
  };

  const total = Object.values(emotionsData).reduce((a, b) => a + b, 0);
  const mostFrequent = Object.entries(emotionsData)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || '';

  const chartData = {
    labels: ['Triste', 'Serio', 'Feliz'],
    datasets: [{ data: [emotionsData.triste, emotionsData.serio, emotionsData.feliz],
      backgroundColor: ['#6BAED6', '#FFD54F', '#81C784'],
      borderWidth: 1
    }]
  };

  const chartOptions = {
    plugins: {
      legend: { display: true, position: 'top',
        labels: { font: { size: 16, weight: 'bold' } }
      }
    }
  };

  return (
    <div className="contenedor">
      <header className="encabezado">
        <div className="encabezado-izquierda">
          <Link to="/"><img src={logo} alt="Logo Equilibrium" className="logo" /></Link>
          <h1 className="titulo">EQUILIBRIUM</h1>
        </div>
        <div className="encabezado-derecha">
          <Link to="/chat" className="nav">Chats</Link>
          <Link to="/help" className="nav">Ayuda</Link>
          <Link to="/notificacion" className="campana">🔔</Link>
          <span className="usuario">Nombre del Usuario</span>
          <Link to="/profile"><img src={userImage} alt="Usuario" className="imagen-usuario" /></Link>
        </div>
      </header>

      <main className="contenido">
        <h2 className="saludo">
          ¡Hola, Nombre del Usuario! Estamos felices de verte de nuevo.<br />
          ¿Listo para ayudar a equilibrar mentes?
        </h2>

        <div className="tarjetas">
          <div className="tarjeta">
            <h3>Última Sesión</h3>
            <p>Fecha: 10/06/2025</p>
            <p>Duración: 45 minutos</p>
            <p>Usuario: Ana Morales</p>
            <Link to="/chat"><button>Chat</button></Link>
          </div>

          <div className="tarjeta">
            <h3>Sesión Anterior</h3>
            <p>Fecha: 05/06/2025</p>
            <p>Duración: 40 minutos</p>
            <p>Usuario: Luis Rodríguez</p>
            <Link to="/calendar"><button>Ver</button></Link>
          </div>
        </div>

        <div className="encuesta">
          <h3>¿Cómo te sientes hoy?</h3>
          <div className="emojis">
            {['triste', 'serio', 'feliz'].map(e => (
              <button
                key={e}
                onClick={() => handleEmotionClick(e)}
                className={selected[e] === today ? 'selected' : ''}
              >
                {e === 'triste' ? '😢' : e === 'serio' ? '😐' : '😊'}
              </button>
            ))}
          </div>
        </div>

        {total > 0 && (
          <div className="estadistica">
            <h3>Estadística Emocional</h3>
            <Doughnut data={chartData} options={chartOptions} />
            <p className="mensaje-emocional">
              {mostFrequent === 'feliz' && "¡Tu constancia emocional es admirable! 😊"}
              {mostFrequent === 'serio' && "Te invitamos a reflexionar 🧘"}
              {mostFrequent === 'triste' && "Recuerda que siempre hay apoyo 💙"}
            </p>
          </div>
        )}

        <div className="tarjetas">
          <div className="tarjeta-contacto">
            <img src={volunteerImg} alt="Administrador" />
            <p>Contacta con un Administrador</p>
            <button>Contactar</button>
          </div>
          <div className="tarjeta-contacto">
            <img src={userImage} alt="Usuario" />
            <p>Contacta con un usuario necesitado</p>
            <Link to="/chat"><button>Chat</button></Link>
          </div>
          <div className="tarjeta-contacto">
            <img src={calendarImg} alt="Agenda" />
            <p>Agenda una cita</p>
            <Link to="/citas"><button>Agendar</button></Link>
          </div>
        </div>
      </main>

      <footer className="pie">
        <p><strong>FRASE DEL DÍA ❤️</strong></p>
        <p className="frase-dia">{fraseDelDia}</p>
      </footer>
    </div>
  );
}
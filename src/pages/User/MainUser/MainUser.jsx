import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import logo from '../../../assets/img/Logo.png';
import userImage from '../../../assets/img/user.png';
import volunteerImg from '../../../assets/img/volunteer.png';
import calendarImg from '../../../assets/img/calendar.png';
import './MainUs.css';
import ModalProfile from '../../ModalProfile/ModalProfile';
import { fetchMyProfile } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext'; 

Chart.register(ArcElement, Tooltip, Legend);

export default function MainUser() {
  const { user } = useAuth()
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
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
    const [profile, setProfile] = useState({
      username: '',
      email: '',
      telefono: '',
      bio: ''
    });
    const [birthDate, setBirthDate] = useState(null)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('emociones')) || {};
    setEmotionsData(stored);
  }, [])

    useEffect(() => {
      const cargarPerfil = async () => {
        try {
          const userData = await fetchMyProfile();
          setProfile({
            username: userData.username || '',
            email: userData.email || '',
            telefono: userData.profile?.phone || '',
            bio: userData.profile?.bio || ''
          });
          if (userData.profile?.birthDate) {
            setBirthDate(new Date(userData.profile.birthDate));
          } else {
            setBirthDate(null);
          }
        } catch (err) {
          console.error('Error al cargar perfil del voluntario:', err);
        }
      }
  
      cargarPerfil();
    }, []);

  useEffect(() => {
    if (isProfileOpen) {
      const cargarPerfil = async () => {
        try {
          const userData = await fetchMyProfile();
          setProfile({
            username: userData.username || '',
            email: userData.email || '',
            telefono: userData.profile?.phone || '',
            bio: userData.profile?.bio || ''
          });
          if (userData.profile?.birthDate) {
            setBirthDate(new Date(userData.profile.birthDate));
          } else {
            setBirthDate(null);
          }
        } catch (err) {
          console.error('Error al cargar perfil del voluntario (modal):', err);
        }
      };

      cargarPerfil();
    }
  }, [isProfileOpen]);

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
  const mostFrequent = Object.entries(emotionsData).sort((a, b) => b[1] - a[1])[0]?.[0] || '';

  const chartData = {
    labels: ['Triste', 'Serio', 'Feliz'],
    datasets: [
      {
        data: [emotionsData.triste, emotionsData.serio, emotionsData.feliz],
        backgroundColor: ['#6BAED6', '#FFD54F', '#81C784'],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className="contenedor">
      <header className="encabezado">
        <div className="encabezado-izquierda">
          <Link to="/"><img src={logo} alt="Logo Equilibrium" className="logo" /></Link>
          <h1 className="titulo">Equilibrium</h1>
        </div>
        <div className="encabezado-derecha">
          <Link to="/chat-user" className="nav">Chats</Link>
          <Link to="/help-user" className="nav">Ayuda</Link>
          <Link to="/notificacion" className="campana">🔔</Link>
          <Link to="/profile-user" className="volu-user">{user?.username || 'Usuario'}</Link>
          <img
            src={userImage}
            alt="Usuario"
            className="volu-user-img"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsProfileOpen(true)}
          />
        </div>
      </header>

      <main className="contenido">
        <h2 className="saludo">
          ¡Hola, {user?.username || 'Usuario'}! Estamos felices de verte de nuevo.<br />
          ¿Listo para continuar ayudando a personas para que tengan equilibrio mental?
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
          <h3>¿Cómo te encuentras el día de hoy?</h3>
          <div className="emojis">
            <button onClick={() => handleEmotionClick('triste')} className={selectedEmotion === 'triste' ? 'selected' : ''}>😢</button>
            <button onClick={() => handleEmotionClick('serio')} className={selectedEmotion === 'serio' ? 'selected' : ''}>😐</button>
            <button onClick={() => handleEmotionClick('feliz')} className={selectedEmotion === 'feliz' ? 'selected' : ''}>😊</button>
          </div>
        </div>

        {total > 0 && (
          <div className="estadistica">
            <h3>Estadística Emocional</h3>
            <Doughnut data={chartData}/>
            <p className="mensaje-emocional">
              {mostFrequent === 'feliz' && "¡Tu constancia emocional es admirable! Sigue así 😊"}
              {mostFrequent === 'serio' && "Te invitamos a reflexionar y abrir espacio al cambio 🧘"}
              {mostFrequent === 'triste' && "Recuerda que siempre hay apoyo para los días difíciles 💙"}
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
            <p>Agenda una cita con un usuario</p>
            <Link to="/citas"><button>Agendar</button></Link>
          </div>
        </div>
      </main>

      <footer className="pie">
        <p><strong>FRASE DEL DÍA ❤️</strong></p>
        <p className="frase-dia">{fraseDelDia}</p>
      </footer>

      {isProfileOpen && (
        <ModalProfile
          profile={profile}
          setProfile={setProfile}
          birthDate={birthDate}
          setBirthDate={setBirthDate}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
    </div>
  );
}

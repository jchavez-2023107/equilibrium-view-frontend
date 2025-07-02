// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom"
import logo from "../../../assets/img/Logo.png";

function HeaderUs() {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-left">
        <Link to={'/main-user'}>
        <img src={logo} alt="Logo Equilibrium" className="logo" /></Link>
        <Link to={'/main-user'}>
        <h1 className="title">EQUILIBRIUM</h1></Link>
        
      </div>
      <div className="header-right">
        <button onClick={() => navigate("/calendar-user")}>
          <span>Calendario</span>
        </button>
        <button onClick={() => navigate("/citas-new-user")}>
          <span>Crear Cita</span>
        </button>
        <button onClick={() => navigate("/citas-lista-user")}>
          <span>Lista de Citas</span>
        </button>
        <button onClick={() => navigate("/citas-trash-user")}>
          <span>Papelera</span>
        </button>
      </div>
    </header>
  )
}

export default HeaderUs

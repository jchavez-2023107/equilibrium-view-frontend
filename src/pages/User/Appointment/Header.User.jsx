// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom"

function HeaderUs() {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-left">
        <Link to={'/main-user'}>
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="title">Equilibrium</h1>
        </Link>
        
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

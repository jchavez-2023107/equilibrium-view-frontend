// src/components/Header.jsx
import { Link, useNavigate } from "react-router-dom"

function HeaderVol() {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-left">
        <Link to={'/main-volunteer'}>
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="title">Equilibrium</h1>
        </Link>
        
      </div>
      <div className="header-right">
        <button onClick={() => navigate("/calendar-vol")}>
          <span>Calendario</span>
        </button>
        <button onClick={() => navigate("/citas-new-vol")}>
          <span>Crear Cita</span>
        </button>
        <button onClick={() => navigate("/citas-lista-vol")}>
          <span>Lista de Citas</span>
        </button>
        <button onClick={() => navigate("/citas-trash-vol")}>
          <span>Papelera</span>
        </button>
      </div>
    </header>
  )
}

export default HeaderVol

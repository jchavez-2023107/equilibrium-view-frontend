// src/components/Header.jsx
import { useNavigate } from "react-router-dom"

function Header() {
  const navigate = useNavigate()

  return (
    <header className="header">
      <div className="header-left">
        <img src="/logo.png" alt="Logo" className="logo" />
        <h1 className="title">Equilibrium</h1>
      </div>
      <div className="header-right">
        <button onClick={() => navigate("/calendar")}>
          <span>Calendario</span>
        </button>
        <button onClick={() => navigate("/citas-new")}>
          <span>Crear Cita</span>
        </button>
        <button onClick={() => navigate("/citas-lista")}>
          <span>Lista de Citas</span>
        </button>
        <button onClick={() => navigate("/citas-trash")}>
          <span>Papelera</span>
        </button>
      </div>
    </header>
  )
}

export default Header

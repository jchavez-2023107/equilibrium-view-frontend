import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from '../../services/api.js';
import './../RegisterVol/RegisterVol.css';
import logo from '../../assets/img/logo.png';

export default function RegisterVolunteer() {
  const [form, setForm] = useState({
    username: "", email: "", password: "", passwordConfirm: "",
    profile: { displayName: "", displayUsername: "", birthDate: "", bio: "", contactNumber: "", especialidad: "" },
    volunteerData: { needs: "", schedules: { horaDesde: "", minutoDesde: "", horaHasta: "", minutoHasta: "" }, days: [] },
  });

  const [error, setError] = useState("");
  const [openSection, setOpenSection] = useState("credenciales");
  const navigate = useNavigate();

  const toggle = section => setOpenSection(openSection === section ? null : section);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name.startsWith("volunteerData.schedules")) {
      const key = name.split(".")[2];
      setForm(prev => ({
        ...prev,
        volunteerData: {
          ...prev.volunteerData,
          schedules: { ...prev.volunteerData.schedules, [key]: value }
        }
      }));
    } else if (name.startsWith("profile.")) {
      const key = name.split(".")[1];
      setForm(prev => ({
        ...prev,
        profile: { ...prev.profile, [key]: value }
      }));
    } else if (name === "volunteerData.needs") {
      setForm(prev => ({
        ...prev,
        volunteerData: { ...prev.volunteerData, needs: value }
      }));
    } else if (name === "volunteerData.days") {
      setForm(prev => ({
        ...prev,
        volunteerData: {
          ...prev.volunteerData,
          days: checked
            ? [...prev.volunteerData.days, value]
            : prev.volunteerData.days.filter(d => d !== value)
        }
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { horaDesde, minutoDesde, horaHasta, minutoHasta } = form.volunteerData.schedules;

    if (form.password !== form.passwordConfirm)
      return setError("Las contraseñas no coinciden");
    if (form.password.length < 5)
      return setError("La contraseña debe tener al menos 5 caracteres");
    if (!form.volunteerData.needs)
      return setError("Debes seleccionar una necesidad");
    if (form.volunteerData.days.length === 0)
      return setError("Debes seleccionar al menos un día");
    if (!horaDesde || !minutoDesde || !horaHasta || !minutoHasta)
      return setError("Debes seleccionar horario desde y hasta");

    const fromMinutes = parseInt(horaDesde) * 60 + parseInt(minutoDesde);
    const toMinutes = parseInt(horaHasta) * 60 + parseInt(minutoHasta);
    if (fromMinutes >= toMinutes)
      return setError("La hora de inicio debe ser menor a la de finalización");

    const payload = {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      passwordConfirm: form.passwordConfirm.trim(),
      profile: { ...form.profile, birthDate: form.profile.birthDate },
      volunteerData: {
        needs: [form.volunteerData.needs],
        schedules: form.volunteerData.days.map(d => ({
          day: d,
          from: `${horaDesde}:${minutoDesde}`,
          to: `${horaHasta}:${minutoHasta}`
        }))
      }
    };

    try {
      const res = await apiFetch("/users/volunteers", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      const loginRes = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          userlogin: payload.username,
          password: payload.password,
        }),
      });
      localStorage.setItem("token", loginRes.token);
      navigate(`/volunteer/complete/${res.volunteer._id}`);
    } catch (err) {
      setError(
        err.payload?.errors
          ? err.payload.errors.map(e => `${e.param || "Error"}: ${e.msg}`).join("\n")
          : err.payload?.message || err.message
      );
    }
  };

  const horas = [...Array(24).keys()].map(h => h.toString().padStart(2, "0"));
  const minutos = [...Array(60).keys()].map(m => m.toString().padStart(2, "0"));

  return (
    <div className="vol-register-container">
      <div className="vol-register-wrapper">
        <div className="vol-left-panel">
          <h1 className="logo">EQUILIBRIUM</h1>
          <img src={logo} alt="Logo" className="vol-register-logo" />
          <p className="welcome-message">¡Únete como<br />voluntario!</p>
        </div>

        <div className="vol-right-panel">
          <h2>Registro Voluntario</h2>
          <form onSubmit={handleSubmit} className="vol-register-form">

            {/* 👉 Sección 1: Credenciales */}
            <div className={`section-header ${openSection === 'credenciales' ? 'open' : ''}`} onClick={() => toggle('credenciales')}>
              Credenciales
            </div>
            {openSection === 'credenciales' && <>
              <div className="input-group"><span>👤</span><input name="username" value={form.username} onChange={handleChange} placeholder="Usuario" required /></div>
              <div className="input-group"><span>📧</span><input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Correo" required /></div>
              <div className="input-group"><span>🔒</span><input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Contraseña" required /></div>
              <div className="input-group"><span>🔒</span><input name="passwordConfirm" type="password" value={form.passwordConfirm} onChange={handleChange} placeholder="Confirmar contraseña" required /></div>
            </>}

            {/* 👉 Sección 2: Perfil */}
            <div className={`section-header ${openSection === 'perfil' ? 'open' : ''}`} onClick={() => toggle('perfil')}>
              Datos de Perfil
            </div>
            {openSection === 'perfil' && <>
              <div className="input-group"><span>👤</span><input name="profile.displayName" value={form.profile.displayName} onChange={handleChange} placeholder="Nombre completo" /></div>
              <div className="input-group"><span>🎭</span><input name="profile.displayUsername" value={form.profile.displayUsername} onChange={handleChange} placeholder="Apodo público" /></div>
              <div className="input-group"><span>🎂</span><input name="profile.birthDate" type="date" value={form.profile.birthDate} onChange={handleChange} required /></div>
              <div className="input-group"><span>📝</span><textarea name="profile.bio" value={form.profile.bio} onChange={handleChange} placeholder="Biografía" /></div>
              <div className="input-group"><span>📱</span><input name="profile.contactNumber" value={form.profile.contactNumber} onChange={handleChange} placeholder="Teléfono" /></div>
              <div className="input-group"><span>⭐</span><input name="profile.especialidad" value={form.profile.especialidad} onChange={handleChange} placeholder="Especialidad" /></div>
            </>}

            {/* 👉 Sección 3: Voluntario */}
            <div className={`section-header ${openSection === 'voluntario' ? 'open' : ''}`} onClick={() => toggle('voluntario')}>
              Datos de Voluntario
            </div>
            {openSection === 'voluntario' && <>
              <div className="input-group"><span>❓</span>
                <select name="volunteerData.needs" value={form.volunteerData.needs} onChange={handleChange} required>
                  <option value="">-- Necesidad --</option>
                  <option value="CHAT">CHARLA</option>
                  <option value="EMERGENCY">EMERGENCIA</option>
                  <option value="APPOINTMENT">CITA</option>
                </select>
              </div>

              <div className="input-group day-checkboxes"><span>📅</span>
                <div className="checkbox-list">
                  {["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"].map(day => (
                    <label key={day}>
                      <input type="checkbox" name="volunteerData.days" value={day} checked={form.volunteerData.days.includes(day)} onChange={handleChange} />
                      {day}
                    </label>
                  ))}
                </div>
              </div>

              <div className="input-group schedule-select"><span>Desde ⏰</span>
                <select name="volunteerData.schedules.horaDesde" value={form.volunteerData.schedules.horaDesde} onChange={handleChange} required>
                  <option value="">Hora</option>{horas.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
                <select name="volunteerData.schedules.minutoDesde" value={form.volunteerData.schedules.minutoDesde} onChange={handleChange} required>
                  <option value="">Min</option>{minutos.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>

              <div className="input-group schedule-select"><span>Hasta ⏰</span>
                <select name="volunteerData.schedules.horaHasta" value={form.volunteerData.schedules.horaHasta} onChange={handleChange} required>
                  <option value="">Hora</option>{horas.map(h => <option key={h} value={h}>{h}</option>)}
                </select>
                <select name="volunteerData.schedules.minutoHasta" value={form.volunteerData.schedules.minutoHasta} onChange={handleChange} required>
                  <option value="">Min</option>{minutos.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </>}

            {error && <p className="error">{error}</p>}
            <button type="submit" className="register-button">Registrarme</button>
          </form>
          <p className="login-link"><a href="/login">¿Ya tienes cuenta? Inicia Sesión</a></p>
        </div>
      </div>
    </div>
  );
}

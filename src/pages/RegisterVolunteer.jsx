import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../services/api.js";

export default function RegisterVolunteer() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    profile: {
      displayName: "",
      displayUsername: "",
      birthDate: "",
      bio: "",
      contactNumber: "",
      especialidad: "",
    },
    volunteerData: {
      needs: "",
      schedules: [{ day: "", from: "", to: "" }],
    },
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value, checked } = e.target;

    // schedules fields
    const schedMatch = name.match(/^volunteerData\.schedules\[(\d+)\]\.(\w+)$/);
    if (schedMatch) {
      const idx = +schedMatch[1],
        field = schedMatch[2];
      setForm((f) => {
        const s = [...f.volunteerData.schedules];
        s[idx] = { ...s[idx], [field]: value };
        return {
          ...f,
          volunteerData: { ...f.volunteerData, schedules: s },
        };
      });
      return;
    }

    // profile.* fields
    if (name.startsWith("profile.")) {
      const key = name.split(".")[1];
      setForm((f) => ({
        ...f,
        profile: { ...f.profile, [key]: value },
      }));
      return;
    }

    // volunteerData.needs
    if (name === "volunteerData.needs") {
      setForm((f) => ({
        ...f,
        volunteerData: { ...f.volunteerData, needs: value },
      }));
      return;
    }

    // top-level fields: username, email, password, passwordConfirm
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // cliente: confirma contraseña
    if (form.password !== form.passwordConfirm) {
      setError("Las contraseñas no coinciden");
      return;
    }
    if (form.password.length < 5) {
      setError("La contraseña debe tener al menos 5 caracteres");
      return;
    }
    if (!form.volunteerData.needs) {
      setError("Debes seleccionar una necesidad");
      return;
    }

    // incluir passwordConfirm en el payload para pasar la validación del backend
    const payload = {
      username: form.username.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      passwordConfirm: form.passwordConfirm.trim(),
      profile: {
        ...form.profile,
        birthDate: form.profile.birthDate, // viene YYYY-MM-DD
      },
      volunteerData: {
        needs: [form.volunteerData.needs],
        schedules: form.volunteerData.schedules,
      },
    };

    console.log("Payload registro voluntario:", payload);

    try {
      const res = await apiFetch("/users/volunteers", {
        method: "POST",
        body: JSON.stringify(payload),
      });
      console.log("Respuesta del servidor:", res);
      // 1) auto-login:
      const { username, password } = payload;
      const loginRes = await apiFetch("/auth/login", {
        method: "POST",
        body: JSON.stringify({ userlogin: username, password }),
      });
      localStorage.setItem("token", loginRes.token);
      // 2) redirijo a la pantalla de completar datos:
      navigate(`/volunteer/complete/${res.volunteer._id}`);
    } catch (err) {
      console.error("Error HTTP status:", err.status);
      console.error("Error payload del backend:", err.payload);
      if (err.payload?.errors) {
        setError(
          err.payload.errors
            .map((e) => `${e.param || "confirm"}: ${e.msg}`)
            .join("\n")
        );
      } else {
        setError(err.payload?.message || err.message);
      }
    }
  };

  return (
    <div>
      <h2>Registro de Voluntario</h2>
      <form onSubmit={handleSubmit}>
        {/* Credenciales */}
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña (min 5 caracteres)"
          required
        />
        <input
          name="passwordConfirm"
          type="password"
          value={form.passwordConfirm}
          onChange={handleChange}
          placeholder="Confirmar Contraseña"
          required
        />

        <hr />

        {/* Perfil */}
        <input
          name="profile.displayName"
          value={form.profile.displayName}
          onChange={handleChange}
          placeholder="Nombre completo"
        />
        <input
          name="profile.displayUsername"
          value={form.profile.displayUsername}
          onChange={handleChange}
          placeholder="Apodo público"
        />
        <input
          name="profile.birthDate"
          type="date"
          value={form.profile.birthDate}
          onChange={handleChange}
          required
        />
        <textarea
          name="profile.bio"
          value={form.profile.bio}
          onChange={handleChange}
          placeholder="Biografía"
        />
        <input
          name="profile.contactNumber"
          value={form.profile.contactNumber}
          onChange={handleChange}
          placeholder="Teléfono (1234-5678)"
        />
        <input
          name="profile.especialidad"
          value={form.profile.especialidad}
          onChange={handleChange}
          placeholder="Especialidad"
        />

        <hr />

        {/* Datos de voluntario */}
        <select
          name="volunteerData.needs"
          value={form.volunteerData.needs}
          onChange={handleChange}
          required
        >
          <option value="">-- Seleccionar necesidad --</option>
          <option value="CHAT">CHAT</option>
          <option value="EMERGENCY">EMERGENCY</option>
          <option value="APPOINTMENT">APPOINTMENT</option>
        </select>

        <div>
          <input
            name="volunteerData.schedules[0].day"
            value={form.volunteerData.schedules[0].day}
            onChange={handleChange}
            placeholder="Día (Lunes)"
          />
          <input
            name="volunteerData.schedules[0].from"
            value={form.volunteerData.schedules[0].from}
            onChange={handleChange}
            placeholder="Desde (09:00)"
          />
          <input
            name="volunteerData.schedules[0].to"
            value={form.volunteerData.schedules[0].to}
            onChange={handleChange}
            placeholder="Hasta (17:00)"
          />
        </div>

        {error && (
          <p style={{ color: "red", whiteSpace: "pre-wrap" }}>{error}</p>
        )}
        <button type="submit">Registrar Voluntario</button>
      </form>
    </div>
  );
}

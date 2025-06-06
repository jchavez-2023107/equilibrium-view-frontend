import { useEffect, useState } from 'react';
import { testConnection } from '../services/api';

function Home() {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    testConnection().then(res => {
      if (res) setStatus(res.status);
    });
  }, []);

  return (
    <div>
      <h1>Bienvenido a EQUILIBRIUM 🧘‍♀️</h1>
      <p>Estado del backend: {status ? status : 'Conectando, soy Joel el Dinosaurio 🦖... '}</p>
    </div>
  );
}

export default Home;

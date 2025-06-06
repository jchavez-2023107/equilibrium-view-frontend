const API_BASE_URL = 'http://localhost:2636/api/v1'; //Puerto 

export const testConnection = async () => {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error de conexión:', error);
    return null;
  }
};

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Usa el hook useNavigate

  // Manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch('https://federico-fazbear.onrender.com/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      setToken(data.token);
      localStorage.setItem('token', data.token); // Guardar token en localStorage
    } else {
      setError(data.error);
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token'); // Eliminar token de localStorage
  };

  // Verificar acceso a ruta protegida
  const accessProtectedRoute = async () => {
    const token = localStorage.getItem('token');

    const response = await fetch('https://federico-fazbear.onrender.com/api/protected', {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    });

    const data = await response.json();
    alert(data.message);
  };

  const handleBackToHomeClick = () => {
    navigate('/'); // Redirige al inicio
  };

  return (
    <div className="login__container">
      <div className="back-to-home-button">
        <button onClick={handleBackToHomeClick}><i class="ri-arrow-left-fill"></i></button>
      </div>
      <div className="form__wrapper">
        <h2 className="text-center">Federico Fazbear</h2>

        {!token ? (
          <form onSubmit={handleLogin}>
            <div className="form__group">
              <label>Correo</label>
              <input
                type="text"
                placeholder="Ingresa tu correo"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form__group">
              <label>Contraseña</label>
              <input
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button type="submit" className="btn__primary">
              Iniciar sesión
            </button>
          </form>
        ) : (
          <div>
            <h2 className="text-success">Sesión iniciada</h2>
            <button className="btn__primary" onClick={handleLogout}>
              Cerrar sesión
            </button>
            <button className="btn__primary ml-3" onClick={accessProtectedRoute}>
              Acceder a ruta protegida
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

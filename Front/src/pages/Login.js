import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // Verificar el token cuando se monta el componente
    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

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
            localStorage.setItem('token', data.token);
        } else {
            setError(data.error);
        }
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    const handleBackToHomeClick = () => {
        navigate('/');
    };

    const handleProfileRedirect = () => {
      if (token) {
          navigate('/user-profile');
      }
  };
  

    return (
        <div className="login__container">
            <div className="back-to-home-button">
                <button onClick={handleBackToHomeClick}>Inicio</button>
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

                        <button onClick={handleProfileRedirect} className="login__icon">
                        Perfil
                        </button>

                        <button className="btn__primary" onClick={handleLogout}>
                            Cerrar sesión
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Login;
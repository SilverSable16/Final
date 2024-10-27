import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './login.css';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [token, setToken] = useState(null);

    const navigate = useNavigate(); // Usa el hook useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        const endpoint = isLogin ? 'login' : 'register';
        const body = isLogin
            ? { username, password }
            : { name, username, password };

        const response = await fetch(`https://federico-fazbear.onrender.com/api/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
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
        navigate('/'); // Redirige al inicio
    };

    return (
        <div className="login__container">
            <div className="back-to-home-button">
                <button onClick={handleBackToHomeClick}>Inicio</button>
            </div>
            <div className="form__wrapper">
                <h2>{isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form__group">
                            <label>Nombre</label>
                            <input
                                type="text"
                                placeholder="Ingresa tu nombre"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    <div className="form__group">
                        <label>Email</label>
                        <input
                            type="email"
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
                        {isLogin ? 'Iniciar Sesión' : 'Registrar'}
                    </button>
                </form>
                <p className="toggle__text">
                    {isLogin ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
                    <span onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Crear Cuenta' : 'Iniciar Sesión'}
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;

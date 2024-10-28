// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';
import Home from './pages/Home';
import Login from './pages/Login';
import MenuPack from './pages/MenuPack';
import Reservas from './pages/Reservas';
import Sucursales from './pages/Sucursales';
import Ayuda from './pages/Ayuda';
import Cart from './components/cart/Cart';
import { CartProvider } from '../src/components/cart/CartContext';
import ErrorBoundary from './pages/ErrorBoundary';
import UserProfile from './pages/UserProfile';
import LoadingScreen from './pages/LoadingScreen';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulamos la carga durante 2 segundos
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <ErrorBoundary>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/menu-pack" element={<MenuPack />} />
                        <Route path="/reservas" element={<Reservas />} />
                        <Route path="/sucursales" element={<Sucursales />} />
                        <Route path="/Ayuda" element={<Ayuda />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/user-profile" element={<UserProfile />} />
                    </Routes>
                </Router>
            </CartProvider>
        </ErrorBoundary>
    );
}

export default App;

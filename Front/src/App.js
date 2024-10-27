import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './app.css';
import Home from './pages/Home';
import Login from './pages/Login';
import MenuPack from './pages/MenuPack';
import Reservas from './pages/Reservas';
import Sucursales from './pages/Sucursales';
import Ayuda from './pages/Ayuda';
import Cart from './components/cart/Cart';
import { CartProvider } from '../src/components/cart/CartContext';// Asegúrate de que la ruta sea correcta
import ErrorBoundary from './pages/ErrorBoundary';
function App() {
    return (
        <ErrorBoundary>
        <CartProvider component>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/menu-pack" element={<MenuPack />} />
                <Route path="/reservas" element={<Reservas />} />
                <Route path="/sucursales" element={<Sucursales />} />
                <Route path="/Ayuda" element={<Ayuda />} />
                <Route path="/cart" element={<Cart />} />

            </Routes>
        </Router>
        </CartProvider>
        </ErrorBoundary>
    );
}

export default App;

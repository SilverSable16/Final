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
import { CartProvider } from '../src/components/cart/CartContext';
import UserProfile from './pages/UserProfile'; // Asegúrate de que la ruta sea correcta // Asegúrate de que la ruta sea correcta
import ErrorBoundary from './pages/ErrorBoundary';
import SuccessPage from './pages/SuccessPage';

function App() {
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
                        <Route path="/success" element={<SuccessPage />} />
                    </Routes>
                </Router>
            </CartProvider>
        </ErrorBoundary>
    );
}

export default App;

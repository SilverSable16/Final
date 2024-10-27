import React, { useRef, useEffect, useState } from 'react';
import './header.css';
import { Container } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../cart/CartContext';
import logo from '../../assets/images/logo2.png';

const navLinks = [
    { label: 'MENÚ', url: '/menu-pack' },
    { label: 'RESERVAS', url: '/reservas' },
    { label: 'SUCURSALES', url: '/sucursales' },
    { label: 'AYUDA', url: '/Ayuda' },
];

const Header = () => {
    const menuRef = useRef();
    const { cartItems } = useCart(); // Obtiene los artículos del carrito
    const menuToggle = () => menuRef.current.classList.toggle('active__menu');
    
    const [cartUpdated, setCartUpdated] = useState(false);

    // Efecto que se activa cuando cartItems cambia
    useEffect(() => {
        if (cartItems.length > 0) {
            setCartUpdated(true);
            const timer = setTimeout(() => {
                setCartUpdated(false); // Resetea la animación después de 500 ms
            }, 500); // Debe coincidir con la duración de la animación

            return () => clearTimeout(timer); // Limpia el temporizador
        }
    }, [cartItems]);

    return (
        <header className="header">
            <Container>
                <div className="navigation">
                    <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                        <Link to="/">
                            <img
                                src={logo}
                                alt="Federico Fazbear Logo"
                                style={{ width: '100px', height: 'auto', marginRight: '10px' }}
                            />
                        </Link>
                        <h2><span></span> Federico Fazbear´s</h2>
                    </div>
                    <div className="nav__menu" ref={menuRef}>
                        <div className="nav__list__wrapper d-flex align-items-center gap-5">
                            <ul className="nav__list">
                                {navLinks.map((item, index) => (
                                    <li className="nav__item" key={index}>
                                        <a href={item.url} onClick={menuToggle}>{item.label}</a>
                                    </li>
                                ))}
                            </ul>
                            <div className="menu_right d-flex align-items-center">
                                <div className="custom__search">
                                    <input type="text" placeholder="Search..." />
                                    <span><i className="ri-search-line"></i></span>
                                </div>
                                <div className={`cart__icon ${cartUpdated ? 'cart-icon-updated' : ''}`} style={{ marginLeft: '15px' }}>
                                    <Link to="/cart">
                                        <i className="ri-shopping-cart-line" style={{ fontSize: '1.5rem' }}></i>
                                        <span className="cart-count">{cartItems.length}</span>
                                    </Link>
                                </div>
                                <div className="login__icon" style={{ marginLeft: '15px' }}>
                                    <Link to="/login">
                                        <i className="ri-user-line" style={{ fontSize: '1.5rem' }}></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mobile_menu">
                        <span><i className="ri-menu-line" onClick={menuToggle}></i></span>
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;

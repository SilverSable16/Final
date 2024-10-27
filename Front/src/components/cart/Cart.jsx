import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../cart/CartContext';
import './cart.css';

const Cart = () => {
    const { cartItems, removeFromCart } = useContext(CartContext);
    const [quantitiesToRemove, setQuantitiesToRemove] = useState({});

    if (cartItems.length === 0) {
        return <div className="empty-cart">El carrito está vacío</div>;
    }

    const handleRemove = (itemId) => {
        const quantityToRemove = quantitiesToRemove[itemId] || 1;
        removeFromCart(itemId, quantityToRemove);
        setQuantitiesToRemove({ ...quantitiesToRemove, [itemId]: 1 }); // Resetea la cantidad a eliminar después de eliminar
    };

    const handleQuantityChange = (itemId, value) => {
        setQuantitiesToRemove({ ...quantitiesToRemove, [itemId]: Math.max(1, value) });
    };

    return (
        <div className="cart-container">
            <h2>Carrito</h2>
            <ul className="cart-items">
                {cartItems.map((item, index) => (
                    <li key={index} className="cart-item">
                        <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
                        <div className="cart-item-details">
                            <h5>{item.nombre}</h5>
                            <p>Precio: Q{item.precio}</p>
                            <p>Cantidad: {item.quantity}</p>
                            <p>Total: Q{(item.precio * item.quantity).toFixed(2)}</p>
                            <input
                                type="number"
                                min="1"
                                value={quantitiesToRemove[item.idAlimento] || 1}
                                onChange={(e) => handleQuantityChange(item.idAlimento, parseInt(e.target.value))}
                            />
                            <button onClick={() => handleRemove(item.idAlimento)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-total">
                <h4>Total: Q{cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0).toFixed(2)}</h4>
            </div>
        </div>
    );
};

const BackToMenuButton = () => (
    <Link to="/" className="back-to-menu">← Volver al Menú</Link>
);

const CartPage = () => (
    <div>
        <BackToMenuButton />
        <Cart />
    </div>
);

export default CartPage;

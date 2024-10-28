// src/pages/SuccessPage.js

import React, { useEffect, useContext } from 'react';
import { CartContext } from '../components/cart/CartContext';
import axios from 'axios';

const SuccessPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);

    useEffect(() => {
        // Datos necesarios (idealmente deberían obtenerse del usuario autenticado)
        const idCliente = 1;
        const idEmpleado = 1;
        const idSucursal = 1;
        const correo = "juan@gmail.com";

        // Cálculo del total
        const total = cartItems.reduce((acc, item) => acc + item.precio * (item.quantity || 1), 0);

        // Preparar el array de productos para el backend
        const productos = cartItems.map(item => ({
            idAlimento: item.idAlimento,
            costo: item.precio * (item.quantity || 1),
            lugarCompra: 'Sucursal Central',
            noReserva: item.noReserva || null,
        }));

        // Función para realizar la compra
        const realizarCompra = async () => {
            const body = {
                idCliente,
                idEmpleado,
                idSucursal,
                productos,
                total,
                correo
            };

            try {
                console.log("Datos de la compra a enviar:", body);
                const response = await axios.post('http://localhost:4000/api/factura/realizar-compra', body);
                
                console.log("Respuesta del servidor:", response.data);
                clearCart();  // Limpiar el carrito después de la compra
            } catch (error) {
                console.error("Error al registrar la compra:", error.response?.data || error.message);
            }
        };

        realizarCompra();
    }, [cartItems, clearCart]);

    return (
        <div>
            <h1>Pago Exitoso</h1>
            <p>Gracias por tu compra. Se ha generado una factura.</p>
        </div>
    );
};

export default SuccessPage;


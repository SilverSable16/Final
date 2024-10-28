// src/pages/SuccessPage.js

import React, { useEffect, useContext } from 'react';
import { CartContext } from '../components/cart/CartContext';
import axios from 'axios';


const SuccessPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);

    useEffect(() => {
        // Datos necesarios (idealmente deberían obtenerse del usuario autenticado)
        const idCliente = parseInt(localStorage.getItem('idCliente'));
        const idEmpleado = null;
        const idSucursal = 1||2;
        const correo = localStorage.getItem('correoCliente');;

        // Cálculo del total
        const total = cartItems.reduce((acc, item) => acc + item.precio * (item.quantity || 1), 0);

        if (isNaN(idCliente) || isNaN(idSucursal) || isNaN(total)) {
            console.error("Uno de los valores numéricos no es válido:", { idCliente, idSucursal, total });
            return;
        }

        // Preparar el array de productos para el backend
        const productos = cartItems.map(item => ({
            idAlimento: item.idAlimento,
            //costo: item.precio * (item.quantity || 1),
            costo: item.quantity,
            lugarCompra: 'Linea',
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
                const response = await axios.post('https://federico-fazbear.onrender.com/api/carrito/compras', body);
                
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


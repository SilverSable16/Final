// src/pages/SuccessPage.js

import React, { useEffect, useContext, useState } from 'react';
import { CartContext } from '../components/cart/CartContext';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './SuccessPage.css';
import { useNavigate } from 'react-router-dom';
import Logo from '../Multi/Logo.png';

const SuccessPage = () => {
    const { cartItems, clearCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [invoiceData, setInvoiceData] = useState(null); // Estado para almacenar datos de la factura

    useEffect(() => {
        const idCliente = localStorage.getItem('idLogeado');
        const idEmpleado = null;
        const idSucursal = 1;
        const correo = localStorage.getItem('correoCliente');

        const total = cartItems.reduce((acc, item) => acc + item.precio * (item.quantity || 1), 0);

        if (isNaN(idCliente) || isNaN(idSucursal) || isNaN(total)) {
            console.error("Uno de los valores numéricos no es válido:", { idCliente, idSucursal, total });
            return;
        }

        const productos = cartItems.map(item => ({
            idAlimento: item.idAlimento,
            nombreAlimento: item.nombre,
            costo: item.precio * (item.quantity || 1),
            lugarCompra: 'Linea',
            noReserva: item.noReserva || null,
        }));

        

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
                setInvoiceData({ productos, total, correo }); // Guardar datos para generar la factura
                clearCart();
            } catch (error) {
                console.error("Error al registrar la compra:", error.response?.data || error.message);
            }
        };

        realizarCompra();
    }, [cartItems, clearCart]);

    // Función para generar e imprimir la factura en PDF
    const generatePDFInvoice = () => {
        if (!invoiceData) return;
    
        const doc = new jsPDF();
    
        const addLogoAndHeader = () => {
            // Agregar el logo
            doc.addImage(Logo, 'JPEG', 14, 10, 30, 30); // Logo en la esquina superior izquierda
    
            // Título de la Factura
            doc.setFontSize(18);
            doc.setTextColor(40, 100, 160);
            doc.text("Factura de Compra", 105, 20, { align: 'center' });
    
            // Nombre de la Empresa
            doc.setFontSize(14);
            doc.text("Federico Fazbear´s", 105, 30, { align: 'center' });
    
            // Detalles del Cliente y Fecha
            doc.setFontSize(12);
            doc.setTextColor(60);
            doc.text(`Cliente: ${invoiceData.correo}`, 14, 50);
            doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 60);
    
            // Configuración de la Tabla
            doc.autoTable({
                startY: 70,
                head: [['Nombre del Producto', 'Cantidad Pedida', 'Precio Unitario', 'Total del Producto']],
                body: invoiceData.productos.map(item => [
                    item.nombreAlimento || "Producto desconocido", // Nombre del producto
                    item.cantidad || 1, // Cantidad pedida
                    `$${(item.costo / (item.cantidad || 1)).toFixed(2)}`, // Precio unitario
                    `$${(item.costo).toFixed(2)}` // Total de ese producto
                ]),
                theme: 'grid',
                headStyles: {
                    fillColor: [40, 100, 160],
                    textColor: [255, 255, 255],
                    fontSize: 12,
                },
                bodyStyles: {
                    fillColor: [245, 245, 245],
                    textColor: [0, 0, 0],
                    fontSize: 10,
                },
                alternateRowStyles: {
                    fillColor: [220, 220, 220]
                },
                margin: { top: 70, left: 14, right: 14 },
            });
    
            // Total de la factura
            doc.setFontSize(14);
            doc.setTextColor(40, 100, 160);
            doc.text(`Total: $${invoiceData.total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    
            // Guardar PDF
            doc.save('factura_compra.pdf');
        };
    
        addLogoAndHeader();
    };
    

    // Función para volver a la página de inicio o realizar otra acción
    const handleBack = () => {
        navigate('/');
    };

    return (
        <div className="success-page">
            <div className="success-icon">✅</div>
            <h1>Pago Exitoso</h1>
            <p>Gracias por tu compra. Se ha generado una factura.</p>
            <button className="back-button" onClick={handleBack}>Volver a Inicio</button>
            <button className="download-button" onClick={generatePDFInvoice}>Descargar Factura en PDF</button>
        </div>
    );
};

export default SuccessPage;

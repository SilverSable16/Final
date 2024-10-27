import React, { useState, useContext } from 'react';
import './mesa-card.css';
import { useCart } from '../components/cart/CartContext'; // Importar el contexto del carrito

const MesaCard = ({ item }) => {
    const { CodigoMesa, NumMesa, Capacidad, imagen } = item;
    const precio = 100; // Precio fijo definido
    const [showForm, setShowForm] = useState(false);
    const [correo, setCorreo] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [fechaReserva, setFechaReserva] = useState('');
    const [idCliente, setIdCliente] = useState(null);
    
    const { addToCart } = useCart(); // Obtener la función addToCart del contexto del carrito

    // Obtener todos los clientes al montar el componente
    const verificarCliente = async () => {
        if (!correo) {
            alert('Por favor, ingrese un correo electrónico.');
            return;
        }

        try {
            const response = await fetch(`https://federico-fazbear.onrender.com/api/cliente/correo/${correo.trim().toLowerCase()}`);
            
            if (!response.ok) {
                const errorMessage = await response.json();
                alert(`Error: ${errorMessage.message}`);
                setIdCliente(null);
                return;
            }

            const data = await response.json();
            setIdCliente(data.cliente.idCliente);

        } catch (error) {
            console.error('Error al verificar cliente:', error);
            alert('Error al verificar cliente: ' + error.message);
            setIdCliente(null);
        }
    };

    // Función para realizar la reserva
    const realizarReserva = async () => {
        if (!correo) {
            alert('Por favor, ingrese un correo electrónico.');
            return;
        }

        if (!idCliente) {
            alert('Cliente no encontrado. Verifique el correo electrónico ingresado.');
            return;
        }

        if (!fechaReserva) {
            alert('Por favor, seleccione una fecha para la reserva.');
            return;
        }

        if (!horaInicio || !horaFin || horaFin <= horaInicio) {
            alert('Por favor, seleccione una hora de inicio y una hora de fin válidas.');
            return;
        }

        const fechaHoraInicio = new Date(`${fechaReserva}T${horaInicio}:00Z`).toISOString();
        const fechaHoraFin = new Date(`${fechaReserva}T${horaFin}:00Z`).toISOString();

        const body = {
            codigoMesaReserva: CodigoMesa,
            id_cliente: idCliente,
            correo,
            cantidadPersonas: Capacidad,
            precio,
            productos: [{  // Cambia aquí para enviar un array de productos
                costo: precio,
                lugarCompra: "Linea",  // Puedes ajustar esto según lo que necesites
                codigoMesaDetalle: CodigoMesa
            }],
            horaInicial: fechaHoraInicio,
            horaFinal: fechaHoraFin,
            fechaReserva,
            DetalleReserva: { // Esta parte no es necesaria para el backend, quítala
                codigo_mesa: CodigoMesa,
                costo: precio,
                fecha_compra: new Date().toISOString(),
                lugar_compra: "Linea"
            }
        };
        

        try {
            const response = await fetch('https://federico-fazbear.onrender.com/api/reserva/compras', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error en la API: ${response.status} - ${errorMessage}`);
            }

            const result = await response.json();
            alert('Reserva realizada con éxito: ' + result.message);
            setShowForm(false);

            // Agregar la reserva al carrito
            const reservaItem = {
                idAlimento: CodigoMesa, // Usar un identificador único para la reserva
                nombre: `Reserva Mesa ${NumMesa}`,
                quantity: 1,
                precio,
                imagen,
                detalles: {
                    fechaReserva,
                    horaInicio,
                    horaFin,
                }
            };

            addToCart(reservaItem); // Agregar la reserva al carrito

        } catch (error) {
            console.error('Error al realizar la reserva:', error);
            alert('Error al realizar la reserva: ' + error.message);
        }
    };

    return (
        <div className={`single__product`}>
            <img src={imagen} alt={`Mesa ${NumMesa}`} className="img-fluid mb-2" />
            <div className="product__content">
                <h6>Mesa {NumMesa}</h6>
                <p>Código de Mesa: <strong>{CodigoMesa}</strong></p>
                <div className="d-flex align-items-center justify-content-between">
                    <span className="price d-flex align-items-center">
                        Capacidad: <span>{Capacidad}</span>
                    </span>
                    <span className="price d-flex align-items-center">
                        Precio: <span>${precio}</span>
                    </span>
                </div>
                <button onClick={() => setShowForm(true)}>Reservar</button>

                {showForm && (
                    <div className="form-container">
                        <button className="close-button" onClick={() => setShowForm(false)}>X</button>
                        <h5>Formulario de Reserva</h5>
                        <input 
                            type="email" 
                            placeholder="Correo electrónico" 
                            value={correo} 
                            onChange={(e) => setCorreo(e.target.value)} 
                            onBlur={verificarCliente} 
                        />
                        <input 
                            type="date" 
                            value={fechaReserva} 
                            onChange={(e) => setFechaReserva(e.target.value)} 
                        />
                        <input 
                            type="time" 
                            value={horaInicio} 
                            onChange={(e) => setHoraInicio(e.target.value)} 
                        />
                        <input 
                            type="time" 
                            value={horaFin} 
                            onChange={(e) => setHoraFin(e.target.value)} 
                        />
                        <button onClick={realizarReserva}>Confirmar Reserva</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MesaCard;

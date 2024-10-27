import React, { useState } from 'react';
import axios from 'axios';
import './mesa-card.css';

const MesaCard = ({ item }) => {
    const { CodigoMesa, NumMesa, Capacidad, imagen } = item;

    const precio = 100; // Precio fijo definido
    const [showForm, setShowForm] = useState(false); // Estado para mostrar el formulario
    const [correo, setCorreo] = useState('');
    const [fechaReserva, setFechaReserva] = useState('');
    const [horaInicial, setHoraInicial] = useState('');
    const [horaFinal, setHoraFinal] = useState('');
    const [cantidadPersonas, setCantidadPersonas] = useState(1);
    const [mensajeError, setMensajeError] = useState('');

    // Función para abrir el formulario de reserva
    const handleReservar = () => {
        setShowForm(true);
    };

    // Función para cerrar el formulario
    const handleCloseForm = () => {
        setShowForm(false);
        setMensajeError('');
    };

    // Función para manejar el envío del formulario
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Buscar el cliente por correo
            const response = await axios.get('https://federico-fazbear.onrender.com/api/cliente/all');
            
            // Verificar que la respuesta contenga el campo 'clientes' y sea un array
            if (!response.data.clientes || !Array.isArray(response.data.clientes)) {
                throw new Error('La respuesta de la API no es una lista válida de clientes');
            }

            const cliente = response.data.clientes.find((c) => c.correo === correo);

            if (!cliente) {
                setMensajeError('No se encontró un cliente con el correo proporcionado.');
                return;
            }

            // Datos para la reserva
            const datosReserva = {
                codigoMesaReserva: CodigoMesa,
                id_cliente: cliente.id_cliente,
                cantidadPersonas,
                precio,
                productos: [
                    {
                        costo: precio,
                        lugarCompra: 'Linea',
                        codigoMesaDetalle: CodigoMesa,
                    },
                ],
                horaInicial, // Debe estar en formato 'HH:mm'
                horaFinal,   // Debe estar en formato 'HH:mm'
                fechaReserva, // Debe estar en formato 'YYYY-MM-DD'
            };
            

            // Realizar la reserva
            const reservaResponse = await axios.post('https://federico-fazbear.onrender.com/api/reserva/compras', datosReserva);

            // Mostrar mensaje de éxito y cerrar el formulario
            alert('Reserva realizada con éxito');
            setShowForm(false);
        } catch (error) {
            console.error('Error al realizar la reserva:', error);
            setMensajeError('Error al realizar la reserva. Por favor, intente nuevamente.');
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
                <button onClick={handleReservar} className="btn-reservar">
                    Reservar
                </button>

                {/* Formulario de reserva */}
                {showForm && (
                    <div className="reservation-form-container">
                        <form onSubmit={handleSubmit} className="reservation-form">
                            <button type="button" onClick={handleCloseForm} className="btn-close">
                                Cerrar
                            </button>
                            <h5>Formulario de Reserva</h5>
                            {mensajeError && <p className="error-message">{mensajeError}</p>}
                            <label>
                                Correo Electrónico:
                                <input
                                    type="email"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Fecha:
                                <input
                                    type="date"
                                    value={fechaReserva}
                                    onChange={(e) => setFechaReserva(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Hora Inicial:
                                <input
                                    type="time"
                                    value={horaInicial}
                                    onChange={(e) => setHoraInicial(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Hora Final:
                                <input
                                    type="time"
                                    value={horaFinal}
                                    onChange={(e) => setHoraFinal(e.target.value)}
                                    required
                                />
                            </label>
                            <button type="submit" className="btn-submit">
                                Confirmar Reserva
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MesaCard;

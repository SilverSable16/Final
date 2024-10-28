import React, { useState, useEffect } from 'react';
import './Detalle.css'; // Asegúrate de tener el archivo CSS correspondiente

const Detalle = ({ reserva }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (reserva) {
            setLoading(false);
        }
    }, [reserva]);

    if (loading) return <div>Cargando detalles de la reserva...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="card detalle__reserva">
            <h2>Detalles de la Reserva</h2>
            <div className="reserva__info">
                <p><strong>No. Reserva:</strong> {reserva.no_reserva}</p>
                <p><strong>Mesa:</strong> {reserva.codigo_mesa}</p>
                <p><strong>Fecha:</strong> {new Date(reserva.fecha_reserva).toLocaleDateString()}</p>
                <p><strong>Hora:</strong> {reserva.hora_reserva}</p>
                <p><strong>Precio:</strong> Q{reserva.precio}</p>
            </div>
        </div>
    );
};

export default Detalle;

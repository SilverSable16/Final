import React, { useState } from 'react';
import axios from 'axios';
import './FacturasCliente.css'; // Asegúrate de tener un archivo CSS para estilos

const FacturasCliente = () => {
    const [correo, setCorreo] = useState(''); // Cambiamos el estado para manejar el correo
    const [facturas, setFacturas] = useState([]);
    const [detallesFactura, setDetallesFactura] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchFacturas = async () => {
        if (!correo) return;

        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`https://federico-fazbear.onrender.com/api/clientes/${correo}/facturas`);
            setFacturas(response.data.facturas); // Configura las facturas
        } catch (err) {
            setError('Error al obtener las facturas');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleFacturaClick = async (noFactura, serieFactura) => {
        setLoading(true);
        setError('');

        try {
            const response = await axios.get(`https://federico-fazbear.onrender.com/api/detalle_factura/${noFactura}/${serieFactura}`);
            setDetallesFactura(response.data.detalles); // Obtener todos los detalles
        } catch (err) {
            setError('Error al obtener los detalles de la factura');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="facturas-cliente">
            <h1>Facturas del Cliente</h1>
            <input
                type="email" // Cambiado a tipo email para validación básica
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="Ingrese correo del Cliente"
                className="input-cliente"
            />
            <button onClick={fetchFacturas} className="button-cargar">Cargar Facturas</button>

            {loading && <p className="loading">Cargando...</p>}
            {error && <p className="error">{error}</p>}

            <div className="facturas-list">
                {facturas.map((factura) => (
                    <div key={`${factura.noFactura}-${factura.serieFactura}`} onClick={() => handleFacturaClick(factura.noFactura, factura.serieFactura)} className="factura-card">
                        <h3>No. Factura: {factura.noFactura}</h3>
                        <p><strong>Serie:</strong> {factura.serieFactura}</p>
                        <p><strong>Fecha:</strong> {new Date(factura.fechaFactura).toLocaleDateString()}</p>
                        <p><strong>Total:</strong> ${factura.total}</p>
                    </div>
                ))}
            </div>

            {detallesFactura.length > 0 && (
                <div className="detalles-factura">
                    <h2>Detalles de la Factura</h2>
                    {detallesFactura.map((detalle, index) => (
                        <div key={index} className="detalle-item">
                            <p><strong>Producto:</strong> {detalle.idAlimento}</p>
                            <p><strong>Reserva:</strong> {detalle.noReserva}</p>
                            <p><strong>Cantidad:</strong> {detalle.costo}</p>
                            <p><strong>Total:</strong> ${detalle.total}</p>
                            <hr />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FacturasCliente;

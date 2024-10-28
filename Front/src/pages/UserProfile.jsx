import React, { useState, useEffect } from 'react';
import Detalle from './Detalle'; // Asegúrate de importar el componente Detalle
import FacturasCliente from './FacturasCliente'; // Importa el componente de Facturas
import './UserProfile.css'; // Importa el archivo CSS
import { useNavigate } from 'react-router-dom'; // Cambiar a useNavigate

const UserProfile = () => {
    const navigate = useNavigate(); // Cambiar a useNavigate
    const [clientData, setClientData] = useState(null);
    const [editData, setEditData] = useState({});
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [reservas, setReservas] = useState([]); // Estado para las reservasTF
    const [loadingReservas, setLoadingReservas] = useState(false); // Estado de carga para reservas
    const [correoCliente, setCorreoCliente] = useState(''); // Para almacenar el correo del cliente
    const [showFacturas, setShowFacturas] = useState(false); // Estado para mostrar facturas

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const storedEmail = localStorage.getItem('correoCliente'); // Asumiendo que guardas el correo en localStorage
                if (!storedEmail) {
                    throw new Error("No se encontró el correo del cliente.");
                }
                setCorreoCliente(storedEmail); // Almacena el correo del cliente

                const token = localStorage.getItem('token');

                const response = await fetch(`https://federico-fazbear.onrender.com/api/cliente/correo/${storedEmail}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Error al obtener los datos del cliente');
                }

                const data = await response.json();
                setClientData(data.cliente);
                setEditData(data.cliente); // Inicializa los datos editables
            } catch (error) {
                setError(error.message);
                console.error("Error en fetchClientData:", error); // Log del error
            }
        };

        fetchClientData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSaveChanges = async () => {
        try {
            if (!clientData) {
                throw new Error("No se encontró la información del cliente");
            }

            const clientId = clientData.id; // Usamos el ID obtenido de la API
            const token = localStorage.getItem('token');

            const response = await fetch(`https://federico-fazbear.onrender.com/api/cliente/update/${clientId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    nombre: editData.nombre,
                    apellido: editData.apellido,
                    direccion: editData.direccion,
                    nit: editData.nit,
                    telefono: parseInt(editData.telefono), // Asegúrate de que el teléfono sea un número
                    fechaNacimiento: new Date(editData.fechaNacimiento).toISOString().split('T')[0], // Formato YYYY-MM-DD
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar los datos del cliente');
            }

            const updatedData = await response.json();
            setClientData(updatedData.cliente);
            setIsEditing(false);
        } catch (error) {
            console.error("Error en la actualización:", error);
            setError(error.message);
        }
    };

    const fetchReservas = async () => {
        if (!correoCliente) {
            setError('Por favor, ingrese un correo de cliente válido.');
            return;
        }

        setLoadingReservas(true);
        setError('');

        try {
            const response = await fetch(`https://federico-fazbear.onrender.com/api/clientesReserva/${correoCliente}/reserva`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de incluir el token en la solicitud
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener las reservas');
            }

            const data = await response.json();
            setReservas(data.reservas || []);
        } catch (err) {
            setError('Error al obtener las reservas');
            console.error(err);
        } finally {
            setLoadingReservas(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); // Elimina el token del localStorage
        localStorage.removeItem('correoCliente'); // Opcional: Elimina el correo del localStorage
        navigate('/Login'); // Redirige a la página principal
    };

    if (error) return <div>Error: {error}</div>;

    return clientData ? (
        <div className="user-profile">
            {/* Botón para redirigir a la página principal */}
            <button 
                className="btn-back" 
                onClick={() => navigate('/')} // Cambiar a navigate
                style={{ position: 'absolute', top: '10px', left: '10px' }}>
                Ir a Inicio
            </button>

            <h2>Perfil del Cliente</h2>

            {isEditing ? (
                <>
                    <input
                        type="text"
                        name="nombre"
                        value={editData.nombre || ''}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                    />
                    <input
                        type="text"
                        name="apellido"
                        value={editData.apellido || ''}
                        onChange={handleInputChange}
                        placeholder="Apellido"
                    />
                    <input
                        type="email"
                        name="correo"
                        value={editData.correo || ''}
                        onChange={handleInputChange}
                        placeholder="Correo"
                    />
                    <input
                        type="text"
                        name="direccion"
                        value={editData.direccion || ''}
                        onChange={handleInputChange}
                        placeholder="Dirección"
                    />
                    <input
                        type="text"
                        name="nit"
                        value={editData.nit || ''}
                        onChange={handleInputChange}
                        placeholder="NIT"
                    />
                    <input
                        type="text"
                        name="telefono"
                        value={editData.telefono || ''}
                        onChange={handleInputChange}
                        placeholder="Teléfono"
                    />
                    
                    <button onClick={handleSaveChanges}>Guardar cambios</button>
                    <button onClick={() => setIsEditing(false)}>Cancelar</button>
                </>
            ) : (
                <>
                    <p>Nombre: {clientData.nombre}</p>
                    <p>Apellido: {clientData.apellido}</p>
                    <p>Correo: {clientData.correo}</p>
                    <p>Dirección: {clientData.direccion}</p>
                    <p>NIT: {clientData.nit}</p>
                    <p>Teléfono: {clientData.telefono}</p>
                    <p>Fecha de Nacimiento: {clientData.fechaNacimiento}</p>

                    <button onClick={() => setIsEditing(true)}>Editar perfil</button>
                    <button onClick={fetchReservas} disabled={loadingReservas}>
                        {loadingReservas ? 'Cargando Reservas...' : 'Cargar Reservas'}
                    </button>
                    <button onClick={() => setShowFacturas((prev) => !prev)}>Ver Facturas</button> {/* Alterna la visibilidad de las facturas */}
                    <button 
                        className="btn-logout" 
                        onClick={handleLogout} 
                        style={{ position: 'absolute', top: '10px', right: '10px' }}>
                        Cerrar Sesión
                    </button> {/* Botón para cerrar sesión */}

                    {reservas.length > 0 && (
                        <div className="reservas-list">
                            <h3>Reservas del Cliente</h3>
                            <div className="reservas-container">
                                {reservas.map((reserva) => (
                                    <Detalle key={reserva.no_reserva} reserva={reserva} />
                                ))}
                            </div>
                        </div>
                    )}
                </>
            )}
            {showFacturas && <FacturasCliente />} {/* Mostrar el componente de facturas si se activa */}
        </div>
    ) : (
        <div>Cargando datos del cliente...</div>
    );
};

export default UserProfile;

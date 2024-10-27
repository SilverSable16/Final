import React, { useState, useEffect } from 'react';

const UserProfile = () => {
    const [clientData, setClientData] = useState(null);
    const [editData, setEditData] = useState({});
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const clientId = '1'; // Cambia esto por el ID dinámico del cliente
                const token = localStorage.getItem('token');

                const response = await fetch(`https://federico-fazbear.onrender.com/api/cliente/onebyid/${clientId}`, {
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
    
            const clientId = '1'; // Usa el ID dinámico
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
                    correo: editData.correo,
                    direccion: editData.direccion,
                    nit: editData.nit,
                    telefono: editData.telefono,
                    fechaNacimiento: editData.fechaNacimiento,
                    fechaCreacion: editData.fechaCreacion,
                    ultimaActualizacion: new Date().toISOString().split('T')[0]
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
    

    if (error) return <div>Error: {error}</div>;

    return clientData ? (
        <div>
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
                </>
            )}
        </div>
    ) : (
        <div>Cargando datos del cliente...</div>
    );
};

export default UserProfile;

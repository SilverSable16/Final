import React, { useState } from 'react';
import axios from 'axios';
import './NuevoRegistro.css'; // Mantén este archivo para estilos específicos si los necesitas

const CrearClienteForm = () => {
    const [formData, setFormData] = useState({
        correo: '',
        nombre: '',
        apellido: '',
        nit: '',
        direccion: '',
        telefono: '',
        fechaNacimiento: '',
        password: '',
        confirmPassword: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setMessage('');

        if (formData.password !== formData.confirmPassword) {
            setError('Las contraseñas no coinciden');
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post('https://federico-fazbear.onrender.com/api/cliente/create', formData);
            setMessage(response.data.message);
            setFormData({
                correo: '',
                nombre: '',
                apellido: '',
                nit: '',
                direccion: '',
                telefono: '',
                fechaNacimiento: '',
                password: '',
                confirmPassword: ''
            });
        } catch (err) {
            setError('Error al crear Cliente y Usuario');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form__wrapper"> {/* Aplicar el mismo estilo del formulario */}
            <h2>Crear Cliente y Usuario</h2>
            <form onSubmit={handleSubmit}>
                <div className="form__group">
                    <label>Correo</label>
                    <input
                        type="email"
                        name="correo"
                        value={formData.correo}
                        onChange={handleChange}
                        placeholder="Correo"
                        required
                    />
                </div>
                <div className="form__group">
                    <label>Nombre</label>
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        placeholder="Nombre"
                        required
                    />
                </div>
                <div className="form__group">
                    <label>Apellido</label>
                    <input
                        type="text"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleChange}
                        placeholder="Apellido"
                        required
                    />
                </div>
                <div className="form__group">
                    <label>NIT</label>
                    <input
                        type="text"
                        name="nit"
                        value={formData.nit}
                        onChange={handleChange}
                        placeholder="NIT"
                        required
                    />
                </div>
                <div className="form__group">
                    <label>Dirección</label>
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleChange}
                        placeholder="Dirección"
                        required
                    />
                </div>
                <div className="form__group">
                    <label>Teléfono</label>
                    <input
                        type="text"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="Teléfono"
                        required
                    />
                </div>
                <div className="form__group">
                    <label>Fecha de Nacimiento</label>
                    <input
                        type="date"
                        name="fechaNacimiento"
                        value={formData.fechaNacimiento}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form__group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Contraseña"
                        required
                    />
                </div>
                <div className="form__group">
                    <label>Confirmar Contraseña</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirmar Contraseña"
                        required
                    />
                </div>
                <button type="submit" className="btn__primary" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Cliente y Usuario'}
                </button>
            </form>

            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default CrearClienteForm;

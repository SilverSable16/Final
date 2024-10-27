import React from 'react';
import Header from '../components/header/Header'; // Importa el Header
import Footer from '../components/footer/Footer';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import './sucursales.css'; // Archivo CSS para los estilos de la página
import antigua from '../Multi/antigua.jpg';
import cayala from '../Multi/cayala.jpg';
import zona10 from '../Multi/zona10.jpg';


const sucursalesData = [
    {
        id: 1,
        nombre: 'Sucursal Centro',
        direccion: 'Av. Principal 123, Ciudad',
        telefono: '(123) 456-7890',
        horario: 'Lunes a Viernes: 9:00 AM - 8:00 PM',
        imagen: antigua,// Ruta de la imagen
    },
    {
        id: 2,
        nombre: 'Sucursal Norte',
        direccion: 'Calle Secundaria 456, Ciudad',
        telefono: '(123) 456-7891',
        horario: 'Lunes a Sábado: 10:00 AM - 6:00 PM',
        imagen: cayala, // Ruta de la imagen
    },
    {
        id: 3,
        nombre: 'Sucursal Sur',
        direccion: 'Calle Tercera 789, Ciudad',
        telefono: '(123) 456-7892',
        horario: 'Martes a Domingo: 11:00 AM - 7:00 PM',
        imagen: zona10, // Ruta de la imagen
    },
];
const Sucursales = () => {
    const navigate = useNavigate();

    const handleReservarClick = () => {
        navigate('/Reservas');
    };

    return (
        <div>
            <Header />
            
            <main>
                <div className="sucursales-container">
                    <div className="sucursales-list">
                        {sucursalesData.map((sucursal) => (
                            <div key={sucursal.id} className="sucursal-card">
                                <img 
                                    src={sucursal.imagen} 
                                    alt={`Imagen de ${sucursal.nombre}`} 
                                    className="sucursal-imagen" 
                                />
                                <div className="sucursal-info">
                                    <h3>{sucursal.nombre}</h3>
                                    <p><strong>Dirección:</strong> {sucursal.direccion}</p>
                                    <p><strong>Teléfono:</strong> {sucursal.telefono}</p>
                                    <p><strong>Horario:</strong> {sucursal.horario}</p>
                                    <button className="reservar-btn" onClick={handleReservarClick}>
                                        Hacer Reserva
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            
            <Footer />
        </div>
    );
};

export default Sucursales;
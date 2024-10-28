import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import MesaCard from './MesaCard'; 
import MesaCardConsulta from './MesaCardConsulta'; // Importar el nuevo componente
import antigua from '../Multi/antigua.jpg';
import cayala from '../Multi/cayala.jpg';
import './reservas.css';

const Reservas = () => {
    const [filter, setFilter] = useState('1'); // Inicialmente, la sucursal central (1)
    const [mesas, setMesas] = useState([]);
    const [fechaConsulta, setFechaConsulta] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [availableTables, setAvailableTables] = useState([]);

    const fetchMesas = async () => {
        try {
            const response = await fetch('https://federico-fazbear.onrender.com/api/mesa/all');
            const data = await response.json();
            console.log('Respuesta de la API:', data);
            
            if (Array.isArray(data.mesas)) {
                setMesas(data.mesas);
            } else {
                console.error('La respuesta de la API no contiene un array en "mesas":', data);
                setMesas([]);
            }
        } catch (error) {
            console.error('Error al obtener las mesas:', error);
        }
    };

    // Filtrar mesas según la sucursal seleccionada
    const filteredMesas = mesas
        .filter(mesa => mesa.Sucursal === parseInt(filter, 10))
        .map(mesa => ({
            ...mesa,
            imagen: filter === '1' ? cayala : antigua // Agregar la imagen según la sucursal
        }));

    useEffect(() => {
        fetchMesas();
    }, []); // Solo se ejecuta al cargar el componente

    // Función para verificar disponibilidad de mesas
    const verificarDisponibilidad = async () => {
        if (!fechaConsulta || !horaInicio || !horaFin) {
            alert("Por favor, completa todos los campos.");
            return;
        }
        
        const formattedDate = fechaConsulta.split('-').reverse().join('/');
        
        try {
            const response = await fetch('https://federico-fazbear.onrender.com/api/mesasdisponibles/verificar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fechaConsulta: formattedDate, horaInicio, horaFin }),
            });
    
            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`Error en la API: ${response.status} - ${errorMessage}`);
            }
    
            const data = await response.json();
            console.log('Resultados de la verificación:', data);
    
            // Filtra las mesas ocupadas basadas en los resultados de la consulta
            const ocupadas = new Set(data.result.map(item => item.CODIGO_MESA)); // Asegúrate que CODIGO_MESA es correcto
    
            // Impresión para depuración
            console.log('Mesas filtradas:', filteredMesas);
            console.log('Códigos de mesas ocupadas:', Array.from(ocupadas));
    
            setAvailableTables(filteredMesas.map(mesa => ({
                ...mesa,
                estado: ocupadas.has(mesa.CodigoMesa) ? 'Ocupada' : 'Disponible',
            })));
        } catch (error) {
            console.error('Error al verificar disponibilidad:', error);
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <Header />
            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="text-center mb-4">
                            <h3 className="menu__title">Mapa de Mesas</h3>
                        </Col>
                        <Col lg="12" className="text-center mb-5">
                            <button
                                className={`filter-btn ${filter === '1' ? 'active__btn' : ''}`}
                                onClick={() => setFilter('1')}
                            >
                                Sucursal Central
                            </button>
                            <button
                                className={`filter-btn ${filter === '2' ? 'active__btn' : ''}`}
                                onClick={() => setFilter('2')}
                            >
                                Sucursal Norte
                            </button>
                        </Col>
                        {filteredMesas.length > 0 ? (
                            filteredMesas.map(mesa => (
                                <Col lg="3" md="4" sm="6" xs="6" key={mesa.CodigoMesa} className="mb-4">
                                    <MesaCard item={mesa} /> {/* Tarjeta para el mapa de mesas */}
                                </Col>
                            ))
                        ) : (
                            <Col lg="12" className="text-center">
                                <p>No hay mesas disponibles para la sucursal seleccionada.</p>
                            </Col>
                        )}
                        <Col lg="12" className="mb-4 text-center">
                            <h5 className="menu__title">Verificar Disponibilidad</h5>
                            <input type="date" onChange={(e) => setFechaConsulta(e.target.value)} />
                            <input type="time" onChange={(e) => setHoraInicio(e.target.value)} />
                            <input type="time" onChange={(e) => setHoraFin(e.target.value)} />
                            <button onClick={verificarDisponibilidad} className="verificar-btn">Verificar</button>
                        </Col>
                        {/* Mostrar las mesas según su disponibilidad */}
                        {availableTables.length > 0 ? (
                            availableTables.map(mesa => (
                                <Col lg="3" md="4" sm="6" xs="6" key={mesa.CodigoMesa} className="mb-4">
                                    <MesaCardConsulta item={mesa} /> {/* Tarjeta para las mesas disponibles */}
                                </Col>
                            ))
                        ) : (
                            <Col lg="12" className="text-center">
                                <p>No hay mesas disponibles para la sucursal seleccionada.</p>
                            </Col>
                        )}
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    );
}

export default Reservas;

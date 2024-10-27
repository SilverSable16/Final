// MesaCardConsulta.js
import React from 'react';
import './mesa-card-consulta.css'; // Asegúrate de crear este archivo CSS

const MesaCardConsulta = ({ item }) => {
    const { CodigoMesa, NumMesa, Capacidad, estado, imagen } = item;

    return (
        <div className={`single__product ${estado === 'Ocupada' ? 'ocupada' : 'disponible'}`}>
            <img src={imagen} alt={`Mesa ${NumMesa}`} className="img-fluid mb-2" />
            <div className="product__content">
                <h6>Mesa {NumMesa}</h6>
                <p>Código de Mesa: <strong>{CodigoMesa}</strong></p>
                <div className="d-flex align-items-center justify-content-between">
                    <span className="price d-flex align-items-center">
                        Capacidad: <span>{Capacidad}</span>
                    </span>
                    <span className="estado" style={{ color: estado === 'Ocupada' ? 'red' : 'green' }}>{estado}</span>
                </div>
            </div>
        </div>
    );
};

export default MesaCardConsulta;

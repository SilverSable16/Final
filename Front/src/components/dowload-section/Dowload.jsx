import React from "react";
import './dowload.css';
import appImg from '../../assets/images/app.png';
import { Container, Row, Col } from "reactstrap";

const Dowload = () => {
    return ( // Asegúrate de incluir el "return" aquí
        <Container className="app__container">
            <Row>
                <Col lg='6' md='6'>
                    <div className="app__img">
                        <img src={appImg} alt="" />
                    </div>
                </Col>

                <Col lg='6' md='6'>
                    <div className="app__content">
                        <h5>Descarga nuestra app</h5>
                        <h2 className="app__content">¡No pases hambre nunca! Descarga nuestra aplicación móvil para pedir comida deliciosa</h2>
                        <p>Muy pronto, podrás disfrutar de nuestras deliciosas pizzas desde la palma de tu mano con nuestra nueva app móvil. Hacer tus pedidos será aún más fácil, rápido y conveniente. </p>
                        
                        <div className="app__btns d-flex align-items-center gap-5">
                            <button
                                className="btn__apple d-flex align-items-center gap-3">
                                <i className="ri-apple-line"></i> Apple Store
                            </button>

                            <button
                                className="btn__google d-flex align-items-center gap-3">
                                <i className="ri-google-play-line"></i> Google Play
                            </button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Dowload;

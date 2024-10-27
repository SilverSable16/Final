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
                        <h5>Download our app</h5>
                        <h2 className="app__content">Never Feel Hungry! Download our mobile app to order Delicious Food</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit ducimus iste minus quidem optio natus, ullam omnis! Esse, sint quia.</p>
                        
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

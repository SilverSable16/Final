import React from "react";
import {Container, Row, Col} from 'reactstrap'
import sliderImg02 from "../../Multi/slider2.png";
import "./choose-us.css"
const ChooseUs = () => {
    return <section>
        <Container>
            <Row>
                <Col lg='6' md='6'>
                    <img src={sliderImg02} alt="" className="w-100" />
                </Col>

                <Col lg='6' md='6'>
                <div className="choose__content">
                    <h4>¿Quienes somos?</h4>
                    <h2>Echa un vistazo a los beneficios que te ofrecemos</h2>
                    <p>En nuestra pizzería, no solo nos enfocamos en ofrecerte las mejores pizzas, sino también en brindarte una experiencia excepcional. Aquí tienes algunos de los beneficios que te esperan cuando decides disfrutar de nuestras delicias:</p>
                </div>
                <div className="features mt-4">
                    <div className="feature1 d-flex align-items-center gap-5">
                        <div className="single__feature">
                            <span><i class="ri-truck-line"></i></span>
                            <h6>Entrega gratuita a domicilio</h6>
                            <p>Disfruta de tus pizzas favoritas sin preocuparte por el costo de envío. Ofrecemos entrega gratuita a domicilio para que puedas saborear nuestras delicias en la comodidad de tu hogar.</p>
                        </div>
                        
                        <div className="single__feature">
                            <span className="single__icon-two">
                                <i class="ri-money-dollar-circle-line"></i></span>
                            <h6>Devolución y reembolso</h6>
                            <p>En el caso de que un producto esté dañado o incorrecto, aceptamos devoluciones. Simplemente contacta a nuestro equipo de atención al cliente y te guiaremos en el proceso de devolución. Te pedimos que conserves el producto original y su empaque, si es posible.</p>
                        </div>

                    </div>
                </div>

                <div className="features mt-4">
                    <div className="feature1 d-flex align-items-center gap-5">
                        <div className="single__feature">
                            <span className="single__icon-3">
                                <i class="ri-secure-payment-line"></i></span>
                            <h6>Pago seguro</h6>
                            <p>Utilizamos tecnología de encriptación avanzada para proteger tus datos personales y de pago. Cada transacción se procesa de manera segura, asegurando que tu información esté siempre a salvo.</p>
                        </div>
                        
                        <div className="single__feature">
                            <span className="single__icon-4">
                            <i class="ri-24-hours-line"></i></span>
                            <h6>soporte las 24/7</h6>
                            <p>Nuestro equipo de atención al cliente está disponible las 24 horas del día, todos los días de la semana. Ya sea que tengas preguntas sobre nuestro menú, necesites ayuda con un pedido o quieras resolver alguna inquietud, estamos aquí para ti.</p>
                        </div>

                    </div>
                </div>
                </Col>
            </Row>

        </Container>
    </section>
}
export default ChooseUs;
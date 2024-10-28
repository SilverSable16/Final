import React from "react";
import { Container, Row, Col } from "reactstrap";
import './testimonial.css'
import testimonialImg from '../../assets/images/review1.png'
import Slider from "react-slick";
const Testimonial = () => {
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };
    return (
        <section>
            <Container>
                <Row>
                    <Col lg="8" sm='12' md='12' className="m-auto">
                    <div className="slider__wrapper d-flex align-items-center gap-5 ">
                        <div className="slider__content w-50">
                        <h2 className="mb-4">Lo que nuestras clientes están diciendo</h2>
                        <Slider {...settings}>
                            <div>
                                <div className="single__testimonial">
                                    <p className="review__content">
                                        "¡Excelente servicio! Hice mi pedido en la madrugada, y no solo me sorprendió la rapidez, sino también la calidad de la pizza a cualquier hora. Me encanta que ofrezcan soporte 24/7 y siempre tengan promociones. Recomendadísimo para cualquier ocasión."
                                    </p>
                                    <h6>Mariana R.</h6>
                                </div>
                            </div>
    
                            <div>
                                <div className="single__testimonial">
                                    <p className="review__content">
                                        "La mejor pizza que he probado en mucho tiempo. La masa es perfecta, crujiente por fuera y suave por dentro, y los ingredientes son frescos y de muy buena calidad. Además, la entrega fue rápida y gratuita. Definitivamente se ha convertido en mi lugar favorito para pedir pizza."
                                    </p>
                                    <h6>Juan M</h6>
                                </div>
                            </div>
                        </Slider>
                        </div>
                        <div className="slider__img w-50">
                        <img src={testimonialImg} alt="" className="w-100" />
                        </div>
                    </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}
export default Testimonial
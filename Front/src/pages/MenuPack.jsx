import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Header from '../components/header/Header'; // Importa el Header
import Footer from '../components/footer/Footer'; // Importa el Footer
import ProductCard from '../components/product-card/ProductCard';
import { useCart } from '../components/cart/CartContext'; // Asegúrate de que esta ruta sea correcta
import './menu-pack.css';

const MenuPack = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState(1); // Filtrando por idTipoMenu
    const { cartItems } = useCart(); // Aquí obtenemos los items del carrito

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('https://federico-fazbear.onrender.com/api/menugeneral/all');
                if (!response.ok) {
                    throw new Error('Error al cargar el menú');
                }
                const data = await response.json();
                setProducts(data.menuGenerals);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <Header />
            <section>
                <Container>
                    <Row>
                        <Col lg="12" className="text-center mb-4">
                            <h3 className="menu__title">Nuestras Cartas</h3>
                        </Col>
                        <Col lg="12" className="text-center mb-5">
                            <button className={`filter-btn ${filter === 1 ? 'active__btn' : ''}`} onClick={() => setFilter(1)}>Almuerzos</button>
                            <button className={`filter-btn ${filter === 2 ? 'active__btn' : ''}`} onClick={() => setFilter(2)}>Postres</button>
                            <button className={`filter-btn ${filter === 3 ? 'active__btn' : ''}`} onClick={() => setFilter(3)}>Desayunos</button>
                            <button className={`filter-btn ${filter === 4 ? 'active__btn' : ''}`} onClick={() => setFilter(4)}>Bebidas</button>
                            <button className={`filter-btn ${filter === 5 ? 'active__btn' : ''}`} onClick={() => setFilter(5)}>Infantil</button>
                        </Col>
                        {
                            products.filter(item => item.idTipoMenu === filter).map(item => (
                                <Col lg="3" md="4" sm="6" xs="6" key={item.idAlimento} className="mb-4">
                                    <ProductCard item={item} />
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </section>
            <Footer />
        </>
    );
}

export default MenuPack;

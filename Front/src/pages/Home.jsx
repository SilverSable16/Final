import React, { Fragment } from 'react';

import Header from '../components/header/Header';
import HeroSlider from '../components/hero-slider/HeroSlider';
import PopularMenu from '../components/popular-menu/PopularMenu';
import ChooseUs from '../components/choose-us/ChooseUs';
import Testimonial from '../components/testimonials/Testimonials';
import Dowload from '../components/dowload-section/Dowload';
import Footer from '../components/footer/Footer';

const Home = () => {
    return (
        <Fragment>
            <Header />
            <HeroSlider />
            <PopularMenu />
            <ChooseUs />
            <Testimonial />
            <Dowload />
            <Footer />
        </Fragment>
    );
};

export default Home;

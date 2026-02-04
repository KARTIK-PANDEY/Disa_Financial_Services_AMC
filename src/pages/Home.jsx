import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Mission from '../components/Mission';
import Team from '../components/Team';
import SIPCalculator from '../components/SIPCalculator';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <div className="home-page">
            <Hero />
            <Services />
            <Mission />
            <Team />
            <SIPCalculator />
            <Contact />
        </div>
    );
};

export default Home;

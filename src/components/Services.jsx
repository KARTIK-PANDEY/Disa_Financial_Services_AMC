// src/components/Services.jsx
import React from 'react';
import './Services.css';

const services = [
    {
        title: "Mutual Funds",
        description: "Diversify your portfolio with expert-curated mutual fund schemes tailored to your risk profile.",
        icon: "📈"
    },
    {
        title: "SIP Investment",
        description: "Start small and grow big. Disciplined monthly investments for long-term wealth creation.",
        icon: "💰"
    },
    {
        title: "Retirement Planning",
        description: "Secure your golden years with our customized retirement solutions and pension plans.",
        icon: "🏖️"
    },
    {
        title: "Tax Saving",
        description: "Save tax while you grow wealth. Invest in ELSS and other tax-efficient instruments.",
        icon: "🛡️"
    }
];

const Services = () => {
    return (
        <section className="services-section" id="services">
            <div className="container">
                <h2 className="section-title">Our Services</h2>
                <div className="services-grid">
                    {services.map((service, index) => (
                        <div className="service-card" key={index}>
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.description}</p>
                            <a href="#contact" className="service-link">Learn More →</a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;

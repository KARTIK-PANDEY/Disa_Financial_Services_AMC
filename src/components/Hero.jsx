// src/components/Hero.jsx
import React from "react";
import "./Hero.css";
import heroBg from "../assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section
      className="hero"
      id="home"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      <div className="hero-overlay"></div>

      <div className="container hero-content">
        {/* Top Badge */}
        <div className="hero-badge">
          🛡️ Trusted Mutual Fund & SIP Advisors
        </div>

        {/* Heading */}
        <h1 className="hero-title">
          Empowering Your
          <br />
          <span className="text-highlight">Financial Future</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          DISA Financial Services Pvt. Ltd. helps you build long-term wealth
          through SIPs, Mutual Funds, Goal Planning, and expert financial
          guidance tailored to your future.
        </p>

        {/* Buttons */}
        <div className="hero-btns">
          <a href="#services" className="btn btn-primary">
            Our Services →
          </a>

          <a href="#contact" className="btn btn-outline">
            Contact Us
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Happy Investors</p>
          </div>

          <div className="stat-item">
            <h3>15+</h3>
            <p>Years Experience</p>
          </div>

          <div className="stat-item">
            <h3>100%</h3>
            <p>Trusted Guidance</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-col">
                        <h3>Disa Financial Services <br />Pvt. Ltd.</h3>
                        <p>Empowering investors with standard financial services and expert mutual fund guidance.</p>
                    </div>
                    <div className="footer-col">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#services">Services</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Services</h4>
                        <ul>
                            <li><a href="#">Mutual Funds</a></li>
                            <li><a href="#">SIP Returns</a></li>
                            <li><a href="#">Equity Trading</a></li>
                            <li><a href="#">Insurance</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Use</a></li>
                            <li><a href="#">Disclaimer</a></li>
                            <li><a href="#">AMFI Registration</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Disa Financial Services Pvt. Ltd. All rights reserved.</p>
                    <p>Designed for Excellence and Wealth Creation.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React, { useState } from 'react';
import { contactService } from '../services/api';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await contactService.submitContact(formData);

            // Reset form and show success
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', message: '' });

            // Hide success message after 3 seconds
            setTimeout(() => setStatus(''), 3000);
        } catch (error) {
            console.error("Error submitting contact form", error);
            alert("Failed to send message. Please try again.");
        }
    };

    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <h2 className="section-title">Get In Touch</h2>
                <div className="contact-content">
                    <div className="contact-info">
                        <h3>We're here to help you grow.</h3>
                        <p>Have questions about Mutual Funds or need expert financial advice? Reach out to us today.</p>

                        <div className="info-item">
                            <i className="fas fa-map-marker-alt" style={{ fontStyle: 'normal' }}>📍</i>
                            <div>
                                <h4>Head Office</h4>
                                <p>C- 12,First Floor Shyam Market, Pandri, Raipur, Chhattisgarh - 492004</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-phone" style={{ fontStyle: 'normal' }}>📞</i>
                            <div>
                                <h4>Call Us</h4>
                                <p>+91 98765 43210</p>
                            </div>
                        </div>
                        <div className="info-item">
                            <i className="fas fa-envelope" style={{ fontStyle: 'normal' }}>✉️</i>
                            <div>
                                <h4>Email Us</h4>
                                <p>kartik0pandey00@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <form className="contact-form" onSubmit={handleSubmit}>
                        {status === 'success' && (
                            <div className="alert-success" style={{
                                padding: '1rem',
                                background: 'rgba(201, 162, 39, 0.2)',
                                border: '1px solid var(--highlight-color)',
                                borderRadius: '8px',
                                marginBottom: '1rem',
                                color: 'var(--text-main)',
                                textAlign: 'center'
                            }}>
                                Thank you! Your message has been recorded.
                            </div>
                        )}
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Your Phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        ></textarea>
                        <button type="submit" className="btn btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;

import React from 'react';
import { Target, Eye, Heart, TrendingUp, Shield, Users, Award, Compass } from 'lucide-react';
import './Mission.css';

const Mission = () => {
    return (
        <section className="mission-section" id="mission">
            <div className="container">
                {/* Main Mission Statement */}
                <div className="mission-hero">
                    <div className="mission-icon-wrapper">
                        <Compass className="mission-main-icon" size={64} />
                    </div>
                    <h2 className="section-title">Our Mission</h2>
                    <p className="mission-statement">
                        Empowering individuals and businesses to achieve financial freedom through
                        expert guidance, innovative investment solutions, and unwavering commitment
                        to your success.
                    </p>
                </div>

                {/* Vision, Mission, Values Grid */}
                <div className="mission-grid">
                    {/* Vision */}
                    <div className="mission-card vision-card">
                        <div className="mission-card-header">
                            <div className="mission-icon">
                                <Eye size={32} />
                            </div>
                            <h3 className="mission-card-title">Our Vision</h3>
                        </div>
                        <p className="mission-card-content">
                            To be India's most trusted financial services partner, recognized for
                            transforming lives through smart investment strategies and personalized
                            wealth management solutions.
                        </p>
                        <div className="mission-card-footer">
                            <span className="mission-badge">Future Forward</span>
                        </div>
                    </div>

                    {/* Core Mission */}
                    <div className="mission-card core-mission-card">
                        <div className="mission-card-header">
                            <div className="mission-icon">
                                <Target size={32} />
                            </div>
                            <h3 className="mission-card-title">Our Goal</h3>
                        </div>
                        <p className="mission-card-content">
                            Provide accessible, transparent, and results-driven investment opportunities
                            that help our clients build sustainable wealth and secure their financial future
                            with confidence.
                        </p>
                        <div className="mission-card-footer">
                            <span className="mission-badge">Client-Centric</span>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="mission-card values-card">
                        <div className="mission-card-header">
                            <div className="mission-icon">
                                <Heart size={32} />
                            </div>
                            <h3 className="mission-card-title">Our Values</h3>
                        </div>
                        <p className="mission-card-content">
                            Integrity, transparency, and excellence drive everything we do. We believe
                            in building lasting relationships based on trust, ethical practices, and
                            delivering exceptional value to our clients.
                        </p>
                        <div className="mission-card-footer">
                            <span className="mission-badge">Trust & Integrity</span>
                        </div>
                    </div>
                </div>

                {/* Key Commitments */}
                <div className="commitments-section">
                    <h3 className="commitments-title">What We Promise</h3>
                    <div className="commitments-grid">
                        <div className="commitment-item">
                            <div className="commitment-icon">
                                <Shield size={28} />
                            </div>
                            <h4>Security First</h4>
                            <p>Your investments are protected with industry-leading security measures</p>
                        </div>

                        <div className="commitment-item">
                            <div className="commitment-icon">
                                <TrendingUp size={28} />
                            </div>
                            <h4>Growth Focused</h4>
                            <p>Strategic investment plans designed to maximize your returns</p>
                        </div>

                        <div className="commitment-item">
                            <div className="commitment-icon">
                                <Users size={28} />
                            </div>
                            <h4>Expert Guidance</h4>
                            <p>Personalized advice from certified financial professionals</p>
                        </div>

                        <div className="commitment-item">
                            <div className="commitment-icon">
                                <Award size={28} />
                            </div>
                            <h4>Proven Results</h4>
                            <p>Track record of delivering consistent value to our clients</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Mission;

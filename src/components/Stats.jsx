import React from 'react';
import { Shield, TrendingUp } from 'lucide-react';
import './Stats.css';

const Stats = () => {
    return (
        <section className="stats-section">
            <div className="container">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-icon-wrapper">
                            <Shield className="stat-icon" size={40} />
                        </div>
                        <h2 className="stat-value">100+</h2>
                        <p className="stat-label">Years of Combined Experience</p>
                        <p className="stat-description">Our leadership team brings a century of collective market wisdom and strategic financial planning to secure your future.</p>
                    </div>
                    <div className="stat-card highlight-card">
                        <div className="stat-icon-wrapper">
                            <TrendingUp className="stat-icon" size={40} />
                        </div>
                        <h2 className="stat-value">111+</h2>
                        <p className="stat-label">Crorepati Clients</p>
                        <p className="stat-description">We have successfully guided over a hundred families to achieve and exceed their milestone of creating 1 Crore wealth through our schemes and funds.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;

import React from 'react';
import { Linkedin, Mail, Award } from 'lucide-react';
import './Team.css';

const teamMembers = [
    {
        name: "Sanjiv Rathi",
        position: "Chief Executive Officer & Founder",
        role: "CEO",
        description: "With over 30 years of experience in financial services, Sanjiv Rathi leads our strategic vision and growth initiatives.",
        image: "src/assets/Sanjiv Rathi sir Photo.jpeg",
        linkedin: "https://www.linkedin.com/in/sanjiv-rathi-4335a135/",
        email: "sanjiv.rathi@disafinancial.com",
        achievements: "MBA in Finance, Certified Financial Planner"
    },
    {
        name: "Alka Gopawar",
        position: "Head of Mutual Fund Distribution",
        role: "Head of Mutual Fund Distribution",
        description: "Expert in financial planning and risk management with 15+ years of experience in the investment sector.",
        image: "src/assets/alka mam.jpg.jpeg",
        linkedin: "# ",
        email: "alka.gopawar@disafinancial.com",
        achievements: "CA, CFA Charterholder"
    },
    {
        name: "Loknath Sahu",
        position: "Head of Sales",
        role: "Head of Sales",
        description: "Leads our investment strategies with a proven track record in portfolio management and market analysis.",
        image: "src/assets/loknath sir.jpg.jpeg",
        linkedin: "#",
        email: "lok.nath.sahu@disafinancial.com",
        achievements: "CFA, Investment Banking Expert"
    },
    {
        name: "Kirti Srivastava",
        position: "Head of Finance",
        role: "Head of Finance",
        description: "Passionate about delivering exceptional client experiences and building long-lasting relationships.",
        image: "src/assets/kirti mam.jpg.jpeg",
        linkedin: "#",
        email: "kirti.srivastava@disafinancial.com",
        achievements: "MBA, Customer Excellence Award Winner"
    },
    {
        name: "Anita ",
        position: "Head of Operations",
        role: "Executive Board",
        description: "Ensures operational excellence and compliance across all our financial services and processes.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        linkedin: "#",
        email: "vikram.singh@disafinancial.com",
        achievements: "Operations Management Specialist"
    },
    {
        name: "",
        position: "Head of Research & Analytics",
        role: "Executive Board",
        description: "Drives data-driven insights and market research to support informed investment decisions.",
        image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop",
        linkedin: "#",
        email: "anjali.mehta@disafinancial.com",
        achievements: "PhD in Economics, Market Analysis Expert"
    }
];

const Team = () => {
    return (
        <section className="team-section" id="team">
            <div className="container">
                <h2 className="section-title">Our Leadership Team</h2>
                <p className="team-subtitle">
                    Meet the experts dedicated to your financial success
                </p>

                <div className="team-grid">
                    {teamMembers.map((member, index) => (
                        <div className="team-card" key={index}>
                            <div className="team-card-inner">
                                {/* Front of Card */}
                                <div className="team-card-front">
                                    <div className="team-image-wrapper">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="team-image"
                                        />
                                        <div className="team-overlay">
                                            <div className="team-role-badge">{member.role}</div>
                                        </div>
                                    </div>
                                    <div className="team-info">
                                        <h3 className="team-name">{member.name}</h3>
                                        <p className="team-position">{member.position}</p>
                                        <div className="team-achievements">
                                            <Award size={16} />
                                            <span>{member.achievements}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Back of Card */}
                                <div className="team-card-back">
                                    <div className="team-back-content">
                                        <h3 className="team-name">{member.name}</h3>
                                        <p className="team-position">{member.position}</p>
                                        <p className="team-description">{member.description}</p>
                                        <div className="team-contact">
                                            <a href={member.linkedin} className="team-social-link" aria-label="LinkedIn">
                                                <Linkedin size={20} />
                                            </a>
                                            <a href={`mailto:${member.email}`} className="team-social-link" aria-label="Email">
                                                <Mail size={20} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;

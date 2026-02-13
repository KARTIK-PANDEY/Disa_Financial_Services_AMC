import React from 'react';
import { Building2, Landmark, ShieldCheck, TrendingUp, Wallet, Globe, Award, Briefcase, PieChart, BarChart } from 'lucide-react';
import './Partners.css';

const partners = [
    { name: "SBI Mutual Fund", icon: Landmark },
    { name: "HDFC Mutual Fund", icon: Building2 },
    { name: "ICICI Prudential MF", icon: TrendingUp },
    { name: "Nippon India Mutual Fund", icon: Globe },
    { name: "Kotak Mutual Fund", icon: Wallet },
    { name: "Aditya Birla Sun Life", icon: Award },
    { name: "Axis Mutual Fund", icon: BarChart },
    { name: "UTI Mutual Fund", icon: PieChart },
    { name: "Bandhan Mutual Fund", icon: Briefcase },
    { name: "DSP Mutual Fund", icon: TrendingUp },
    { name: "Tata Mutual Fund", icon: Building2 },
    { name: "Franklin Templeton", icon: Globe },
    { name: "HSBC Mutual Fund", icon: Landmark },
    { name: "Mirae Asset MF", icon: Wallet },
    { name: "Invesco Mutual Fund", icon: ShieldCheck },
    { name: "Canara Robeco MF", icon: Award },
    { name: "Sundaram Mutual Fund", icon: BarChart },
    { name: "Edelweiss Mutual Fund", icon: PieChart },
    { name: "JM Financial MF", icon: Briefcase },
    { name: "Motilal Oswal MF", icon: TrendingUp },
    { name: "LIC Mutual Fund", icon: ShieldCheck },
    { name: "Baroda BNP Paribas", icon: Building2 },
    { name: "Quantum Mutual Fund", icon: PieChart },
    { name: "Taurus Mutual Fund", icon: BarChart },
    { name: "Shriram Mutual Fund", icon: Wallet },
    { name: "WhiteOak Capital", icon: Globe },
    { name: "Trust Mutual Fund", icon: Award },
    { name: "Navi Mutual Fund", icon: Landmark },
    { name: "Groww Mutual Fund", icon: Wallet },
    { name: "PPFAS Mutual Fund", icon: PieChart },
    { name: "Quant Mutual Fund", icon: BarChart },
    { name: "ITI Mutual Fund", icon: TrendingUp },
    { name: "NJ Mutual Fund", icon: Building2 },
    { name: "Samco Mutual Fund", icon: Award },
    { name: "Zerodha Fund House", icon: Globe },
    { name: "Bajaj Finserv MF", icon: Wallet },
    { name: "Helios Mutual Fund", icon: PieChart },
    { name: "LIC of India", icon: ShieldCheck },
    { name: "Star Health Insurance", icon: Globe },
    { name: "Care Health Insurance", icon: ShieldCheck },
    { name: "Niva Bupa", icon: Award },
    { name: "HDFC ERGO", icon: Building2 },
    { name: "Bajaj Allianz", icon: ShieldCheck }
];

const Partners = () => {
    // Duplicate the partners array for seamless looping
    const allPartners = [...partners, ...partners];

    return (
        <section className="partners-section" id="partners">
            <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="section-title">Brands We Represent</h2>
                <p className="team-subtitle">
                    Partnering with 40+ leading Asset Management Companies and Insurance Providers
                </p>
            </div>

            <div className="marquee-container">
                <div className="marquee-content shadow-marquee">
                    {allPartners.map((partner, index) => {
                        const Icon = partner.icon;
                        return (
                            <div className="partner-card" key={index}>
                                <div className="partner-logo-wrapper">
                                    <Icon size={20} className="partner-icon" />
                                    <span className="partner-logo-text">{partner.name}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Partners;

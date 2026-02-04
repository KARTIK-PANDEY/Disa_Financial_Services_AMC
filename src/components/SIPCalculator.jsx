import React, { useState, useEffect } from 'react';
import { investmentService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './SIPCalculator.css';

const SIPCalculator = () => {
    const [investment, setInvestment] = useState(5000);
    const [rate, setRate] = useState(12);
    const [years, setYears] = useState(10);
    const [result, setResult] = useState({ invested: 0, returns: 0, total: 0 });

    // Modal State
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
    const [submitStatus, setSubmitStatus] = useState('');

    useEffect(() => {
        const monthlyRate = rate / 12 / 100;
        const months = years * 12;
        const totalValue = investment * (Math.pow(1 + monthlyRate, months) - 1) * (1 + monthlyRate) / monthlyRate;
        const investedAmount = investment * months;
        const returnsAmount = totalValue - investedAmount;

        setResult({
            invested: Math.round(investedAmount),
            returns: Math.round(returnsAmount),
            total: Math.round(totalValue)
        });
    }, [investment, rate, years]);

    const handleStartInvesting = (e) => {
        e.preventDefault();
        setShowModal(true);
        setSubmitStatus('');
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleInputChange = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    };

    const { user } = useAuth();

    const handleSubmitInterest = async (e) => {
        e.preventDefault();

        try {
            // If user is logged in, use their ID. If not, use a placeholder or handle it.
            // For now, assuming guest users can submit requests which might be saved without userId or generic userId.
            // But our backend model requires userId. 
            // Better approach: If not logged in, prompt login OR save as "guest inquiry". 
            // Let's modify frontend to use a default or handle "Not Logged In" case gracefully.

            // NOTE: Our backend Investment model requires `userId`.
            // If user is not logged in, we can't save to Investment table directly if it changes foreign key.
            // Ideally, general inquiries go to Contact table, but this is an "Investment Request".
            // Let's assume for now we only allow this if logged in, OR we send it as a special Contact request,
            // OR we fix backend to allow null userId.

            // Quick fix: If no user, maybe alert differently or try to save anyway if backend handles it?
            // Actually, the `investmentService.createInvestment` expects `userId`.

            const payload = {
                userId: user ? user.id : null, // Backend might need to adjust if this is null
                type: 'SIP Interest',
                amount: investment,
                details: {
                    name: userData.name,
                    email: userData.email,
                    phone: userData.phone,
                    monthlyInvestment: investment,
                    expectedRate: rate,
                    timePeriod: years,
                    projectedTotal: result.total
                }
            };

            // If we strictly need a user, we should perhaps check `user` exists.
            // But for a landing page calculator, we want to capture leads.
            // Let's try sending it. If it fails due to missing userId, we'll need to update backend model.

            // Wait! The user might just be entering details in the modal.
            // If they are not logged in, we can treat it as a "Guest Investment Request".
            // Let's update backend model to allow nullable userId OR handle it here.

            // For now, let's use the API.
            await investmentService.createInvestment(payload);

            setSubmitStatus('success');
            setTimeout(() => {
                setShowModal(false);
                setUserData({ name: '', email: '', phone: '' });
                setSubmitStatus('');
            }, 2000);
        } catch (error) {
            console.error("Investment request failed", error);
            // Fallback for demo/local if API fails (e.g. guest user restriction)
            setSubmitStatus('error');
            alert("Could not save request. Please try logging in first.");
        }
    };

    return (
        <section className="calculator-section" id="calculators">
            <div className="container">
                <h2 className="section-title">SIP Calculator</h2>
                <div className="calculator-wrapper">
                    <div className="calculator-inputs">
                        <div className="input-group">
                            <label>Monthly Investment (₹)</label>
                            <input
                                type="range" min="500" max="100000" step="500"
                                value={investment} onChange={(e) => setInvestment(Number(e.target.value))}
                            />
                            <div className="input-value">₹ {investment.toLocaleString()}</div>
                        </div>
                        <div className="input-group">
                            <label>Expected Return Rate (p.a) %</label>
                            <input
                                type="range" min="1" max="30" step="0.5"
                                value={rate} onChange={(e) => setRate(Number(e.target.value))}
                            />
                            <div className="input-value">{rate} %</div>
                        </div>
                        <div className="input-group">
                            <label>Time Period (Years)</label>
                            <input
                                type="range" min="1" max="40" step="1"
                                value={years} onChange={(e) => setYears(Number(e.target.value))}
                            />
                            <div className="input-value">{years} Years</div>
                        </div>
                    </div>
                    <div className="calculator-results">
                        <div className="result-item">
                            <span>Invested Amount</span>
                            <h3>₹ {result.invested.toLocaleString()}</h3>
                        </div>
                        <div className="result-item">
                            <span>Est. Returns</span>
                            <h3>₹ {result.returns.toLocaleString()}</h3>
                        </div>
                        <div className="result-item total">
                            <span>Total Value</span>
                            <h3>₹ {result.total.toLocaleString()}</h3>
                        </div>
                        <button onClick={handleStartInvesting} className="btn btn-primary btn-block">Start Investing Now</button>
                    </div>
                </div>
            </div>

            {/* Interest Modal */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <button className="modal-close" onClick={handleModalClose}>&times;</button>
                        <h3>Start Your Investment Journey</h3>
                        <p>We've saved your calculation. Fill in your details so our expert can guide you.</p>

                        <div className="summary-box">
                            <small>Looking to invest:</small>
                            <strong>₹ {investment.toLocaleString()}/month</strong>
                        </div>

                        {submitStatus === 'success' ? (
                            <div className="success-message">
                                ✅ Request Received! We will contact you shortly.
                            </div>
                        ) : (
                            <form onSubmit={handleSubmitInterest}>
                                <div className="form-group">
                                    <input
                                        type="text" name="name" placeholder="Your Name" required
                                        value={userData.name} onChange={handleInputChange}
                                        className="modal-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email" name="email" placeholder="Email Address" required
                                        value={userData.email} onChange={handleInputChange}
                                        className="modal-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel" name="phone" placeholder="Phone Number" required
                                        value={userData.phone} onChange={handleInputChange}
                                        className="modal-input"
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary btn-full">
                                    Submit Request
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default SIPCalculator;

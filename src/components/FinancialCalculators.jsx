import React, { useState, useEffect } from 'react';
import './FinancialCalculators.css';

const FinancialCalculators = () => {
    const [activeTab, setActiveTab] = useState('sip');

    // State for all calculators
    // SIP
    const [sipAmount, setSipAmount] = useState(5000);
    const [sipRate, setSipRate] = useState(12);
    const [sipYears, setSipYears] = useState(10);

    // Lumpsum
    const [lumpsumAmount, setLumpsumAmount] = useState(100000);
    const [lumpsumRate, setLumpsumRate] = useState(12);
    const [lumpsumYears, setLumpsumYears] = useState(10);

    // Goal
    const [goalAmount, setGoalAmount] = useState(1000000);
    const [goalRate, setGoalRate] = useState(12);
    const [goalYears, setGoalYears] = useState(10);

    // Step Up SIP
    const [stepUpAmount, setStepUpAmount] = useState(5000);
    const [stepUpRate, setStepUpRate] = useState(12);
    const [stepUpYears, setStepUpYears] = useState(10);
    const [stepUpInc, setStepUpInc] = useState(10); // Annual increase percentage

    // SWP
    const [swpAmount, setSwpAmount] = useState(500000);
    const [swpWithdrawal, setSwpWithdrawal] = useState(5000);
    const [swpRate, setSwpRate] = useState(8);
    const [swpYears, setSwpYears] = useState(10);

    // Results State
    const [result, setResult] = useState({ invested: 0, returns: 0, total: 0 });
    const [monthlyRequired, setMonthlyRequired] = useState(0);

    // Calculation Logic
    useEffect(() => {
        calculateResult();
    }, [activeTab, sipAmount, sipRate, sipYears, lumpsumAmount, lumpsumRate, lumpsumYears, goalAmount, goalRate, goalYears, stepUpAmount, stepUpRate, stepUpYears, stepUpInc, swpAmount, swpWithdrawal, swpRate, swpYears]);

    const calculateResult = () => {
        if (activeTab === 'sip') {
            const monthlyRate = sipRate / 12 / 100;
            const months = sipYears * 12;
            const totalValue = sipAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
            const investedAmount = sipAmount * months;
            setResult({
                invested: Math.round(investedAmount),
                returns: Math.round(totalValue - investedAmount),
                total: Math.round(totalValue)
            });
        } else if (activeTab === 'lumpsum') {
            const totalValue = lumpsumAmount * Math.pow(1 + (lumpsumRate / 100), lumpsumYears);
            setResult({
                invested: Math.round(lumpsumAmount),
                returns: Math.round(totalValue - lumpsumAmount),
                total: Math.round(totalValue)
            });
        } else if (activeTab === 'goal') {
            // Goal SIP: Amount = P * ({[1+i]^n - 1} / i) * (1+i)
            // We need to find P (Monthly Investment)
            const monthlyRate = goalRate / 12 / 100;
            const months = goalYears * 12;
            const factor = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
            const requiredMonthly = goalAmount / factor;

            setMonthlyRequired(Math.round(requiredMonthly));
            setResult({
                invested: Math.round(requiredMonthly * months),
                returns: Math.round(goalAmount - (requiredMonthly * months)),
                total: Math.round(goalAmount)
            });
        } else if (activeTab === 'stepup') {
            // Step Up SIP formula is complex, simplified iteration
            let currentSip = stepUpAmount;
            let totalVal = 0;
            let totalInvested = 0;
            const monthlyRate = stepUpRate / 12 / 100;

            for (let y = 1; y <= stepUpYears; y++) {
                // For each year, calculate FV of that year's SIPs
                // FV of 12 payments of `currentSip` at end of `stepUpYears - y + 1` years? No.
                // Easier: Simulate month by month
                // Or: Calculate FV of this year's SIPs at end of term

                // Let's use simple iterative simulation for accuracy
                // Actually, standard formula for Step Up SIP:
                /*
                   FV = P * [ (1+r)^n - (1+i)^n ] / (r-i) * (1+r) ... roughly?
                   Let's stick to iteration for clarity and correctness
                */
            }

            // Iterative approach
            let corpus = 0;
            let invested = 0;
            let currentMonthlySip = stepUpAmount;

            for (let m = 1; m <= stepUpYears * 12; m++) {
                corpus = (corpus + currentMonthlySip) * (1 + monthlyRate);
                invested += currentMonthlySip;

                if (m % 12 === 0) {
                    currentMonthlySip = currentMonthlySip * (1 + stepUpInc / 100);
                }
            }

            setResult({
                invested: Math.round(invested),
                returns: Math.round(corpus - invested),
                total: Math.round(corpus)
            });
        } else if (activeTab === 'swp') {
            const monthlyRate = swpRate / 12 / 100;
            let currentBalance = swpAmount;
            let totalWithdrawn = 0;

            for (let m = 0; m < swpYears * 12; m++) {
                // Withdraw first (Conservative) or Growth first?
                // Standard SWP: Investment grows, then withdrawal. Or Withdrawal happens, then rest grows.
                // Let's assume Month End Withdrawal.
                // Balance = Balance * (1 + r) - Withdrawal

                // Growth for the month
                currentBalance = currentBalance * (1 + monthlyRate);

                // Withdrawal
                currentBalance = currentBalance - swpWithdrawal;

                totalWithdrawn += swpWithdrawal;

                if (currentBalance < 0) {
                    currentBalance = 0;
                    break;
                }
            }

            setResult({
                invested: Math.round(swpAmount), // Initial Investment
                returns: Math.round(totalWithdrawn), // Total Withdrawn
                total: Math.round(currentBalance) // Final Value
            });
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <section className="calculators-section" id="calculators">
            <div className="container">
                <h2 className="section-title">Financial Calculators</h2>
                <div className="calculators-container">
                    <div className="calculator-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'sip' ? 'active' : ''}`}
                            onClick={() => setActiveTab('sip')}
                        >
                            SIP Calculator
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'lumpsum' ? 'active' : ''}`}
                            onClick={() => setActiveTab('lumpsum')}
                        >
                            Lumpsum
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'goal' ? 'active' : ''}`}
                            onClick={() => setActiveTab('goal')}
                        >
                            Goal Planner
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'stepup' ? 'active' : ''}`}
                            onClick={() => setActiveTab('stepup')}
                        >
                            Step Up SIP
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'swp' ? 'active' : ''}`}
                            onClick={() => setActiveTab('swp')}
                        >
                            SWP (Withdrawal)
                        </button>
                    </div>

                    <div className="calculator-body">
                        {/* SIP Calculator Interface */}
                        {activeTab === 'sip' && (
                            <div className="calculator-wrapper">
                                <div className="calculator-inputs">
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Monthly Investment</label>
                                            <span className="input-value">{formatCurrency(sipAmount)}</span>
                                        </div>
                                        <input
                                            type="range" min="500" max="100000" step="500"
                                            value={sipAmount} onChange={(e) => setSipAmount(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Expected Return (p.a)</label>
                                            <span className="input-value">{sipRate}%</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="30" step="0.5"
                                            value={sipRate} onChange={(e) => setSipRate(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Time Period</label>
                                            <span className="input-value">{sipYears} Years</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="40" step="1"
                                            value={sipYears} onChange={(e) => setSipYears(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                </div>
                                <ResultCard result={result} label="Total Corpus" />
                            </div>
                        )}

                        {/* Lumpsum Calculator Interface */}
                        {activeTab === 'lumpsum' && (
                            <div className="calculator-wrapper">
                                <div className="calculator-inputs">
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Total Investment</label>
                                            <span className="input-value">{formatCurrency(lumpsumAmount)}</span>
                                        </div>
                                        <input
                                            type="range" min="5000" max="10000000" step="5000"
                                            value={lumpsumAmount} onChange={(e) => setLumpsumAmount(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Expected Return (p.a)</label>
                                            <span className="input-value">{lumpsumRate}%</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="30" step="0.5"
                                            value={lumpsumRate} onChange={(e) => setLumpsumRate(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Time Period</label>
                                            <span className="input-value">{lumpsumYears} Years</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="40" step="1"
                                            value={lumpsumYears} onChange={(e) => setLumpsumYears(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                </div>
                                <ResultCard result={result} label="Total Corpus" />
                            </div>
                        )}

                        {/* Goal Calculator Interface */}
                        {activeTab === 'goal' && (
                            <div className="calculator-wrapper">
                                <div className="calculator-inputs">
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Target Goal Amount</label>
                                            <span className="input-value">{formatCurrency(goalAmount)}</span>
                                        </div>
                                        <input
                                            type="range" min="100000" max="50000000" step="100000"
                                            value={goalAmount} onChange={(e) => setGoalAmount(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Expected Return (p.a)</label>
                                            <span className="input-value">{goalRate}%</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="30" step="0.5"
                                            value={goalRate} onChange={(e) => setGoalRate(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Time to Reach Goal</label>
                                            <span className="input-value">{goalYears} Years</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="40" step="1"
                                            value={goalYears} onChange={(e) => setGoalYears(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                </div>
                                <div className="calculator-results">
                                    <div className="results-card">
                                        <h4>You Need To Invest</h4>
                                        <div className="result-total">
                                            <h3>{formatCurrency(monthlyRequired)}</h3>
                                            <span>Monthly SIP Required</span>
                                        </div>
                                        <div className="result-row" style={{ marginTop: '2rem' }}>
                                            <span>Total Goal Amount:</span>
                                            <strong>{formatCurrency(result.total)}</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step Up Calculator Interface */}
                        {activeTab === 'stepup' && (
                            <div className="calculator-wrapper">
                                <div className="calculator-inputs">
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Monthly Investment</label>
                                            <span className="input-value">{formatCurrency(stepUpAmount)}</span>
                                        </div>
                                        <input
                                            type="range" min="500" max="100000" step="500"
                                            value={stepUpAmount} onChange={(e) => setStepUpAmount(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Annual Step Up</label>
                                            <span className="input-value">{stepUpInc}%</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="50" step="1"
                                            value={stepUpInc} onChange={(e) => setStepUpInc(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Expected Return (p.a)</label>
                                            <span className="input-value">{stepUpRate}%</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="30" step="0.5"
                                            value={stepUpRate} onChange={(e) => setStepUpRate(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Time Period</label>
                                            <span className="input-value">{stepUpYears} Years</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="40" step="1"
                                            value={stepUpYears} onChange={(e) => setStepUpYears(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                </div>
                                <ResultCard result={result} label="Total Corpus" />
                            </div>
                        )}

                        {/* SWP Calculator Interface */}
                        {activeTab === 'swp' && (
                            <div className="calculator-wrapper">
                                <div className="calculator-inputs">
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Total Investment</label>
                                            <span className="input-value">{formatCurrency(swpAmount)}</span>
                                        </div>
                                        <input
                                            type="range" min="100000" max="10000000" step="5000"
                                            value={swpAmount} onChange={(e) => setSwpAmount(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Monthly Withdrawal</label>
                                            <span className="input-value">{formatCurrency(swpWithdrawal)}</span>
                                        </div>
                                        <input
                                            type="range" min="1000" max="100000" step="500"
                                            value={swpWithdrawal} onChange={(e) => setSwpWithdrawal(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Expected Return (p.a)</label>
                                            <span className="input-value">{swpRate}%</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="15" step="0.5"
                                            value={swpRate} onChange={(e) => setSwpRate(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                    <div className="input-group">
                                        <div className="input-header">
                                            <label>Time Period</label>
                                            <span className="input-value">{swpYears} Years</span>
                                        </div>
                                        <input
                                            type="range" min="1" max="30" step="1"
                                            value={swpYears} onChange={(e) => setSwpYears(Number(e.target.value))}
                                            className="range-slider"
                                        />
                                    </div>
                                </div>

                                {/* Custom Result for SWP */}
                                <div className="calculator-results">
                                    <div className="results-card">
                                        <h4>SWP Summary</h4>
                                        <div style={{ marginTop: '2rem' }}>
                                            <div className="result-row">
                                                <span>Initial Investment:</span>
                                                <strong>{formatCurrency(result.invested)}</strong>
                                            </div>
                                            <div className="result-row">
                                                <span>Total Withdrawn:</span>
                                                <strong style={{ color: 'var(--highlight-color)' }}>{formatCurrency(result.returns)}</strong>
                                            </div>
                                            <div className="result-total">
                                                <span>Final Value Remaining</span>
                                                <h3>{formatCurrency(result.total)}</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                    <div className="note">
                        *Disclaimer: Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The results are estimates based on assumed rate of return.
                    </div>
                </div>
            </div>
        </section>
    );
};

// Sub-component for displaying results to avoid code duplication
const ResultCard = ({ result, label }) => {
    // Simple pie chart logic
    const total = result.total || 1;
    const investPercent = (result.invested / total) * 100;

    // CSS Conic Gradient for Pie Chart
    // Highlight color (returns) starts from 0, ends at investPercent?
    // No. Invested is usually Grey/Base, Returns is Highlight.
    // Let's make Invested = Grey, Returns = Highlight.
    // Conic gradient: (Highlight 0% deg, Highlight X% deg, Grey X% deg, Grey 100%)

    // Actually, usually:
    // Invested: Grey/Blue
    // Returns: Bright/Highlight

    // Let's use Theme colors.
    // Highlight = Gold/Amber.
    // Base = Grey.

    // If investPercent is 60%, then 0-60% is Invested, 60-100% is Returns.

    const chartStyle = {
        background: `conic-gradient(#cbd5e1 0% ${investPercent}%, var(--highlight-color) ${investPercent}% 100%)`
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="calculator-results">
            <div className="results-card">
                <div className="chart-placeholder" style={chartStyle}>
                    {/* Inner circle is handled by CSS ::after */}
                </div>

                <div className="chart-legend">
                    <div className="legend-item">
                        <span className="legend-color" style={{ background: '#cbd5e1' }}></span>
                        <span>Invested</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-color" style={{ background: 'var(--highlight-color)' }}></span>
                        <span>Returns</span>
                    </div>
                </div>

                <div className="result-row">
                    <span>Invested Amount</span>
                    <strong>{formatCurrency(result.invested)}</strong>
                </div>
                <div className="result-row">
                    <span>Est. Returns</span>
                    <strong>{formatCurrency(result.returns)}</strong>
                </div>
                <div className="result-total">
                    <span>{label}</span>
                    <h3>{formatCurrency(result.total)}</h3>
                </div>
            </div>
        </div>
    );
};

export default FinancialCalculators;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { investmentService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import "./SIPCalculator.css";

const SIPCalculator = () => {
  const [investment, setInvestment] = useState(5000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);

  const [result, setResult] = useState({
    invested: 0,
    returns: 0,
    total: 0,
  });

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [submitStatus, setSubmitStatus] = useState("");

  // Gemini AI State
  const [aiExplanation, setAiExplanation] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  const { user } = useAuth();

  const API_URL = `${
    import.meta.env.VITE_API_URL || "http://localhost:5000"
  }/api/sip/explain`;

  // SIP Calculation
  useEffect(() => {
    const monthlyRate = rate / 12 / 100;
    const months = years * 12;

    const totalValue =
      investment *
      ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
      (1 + monthlyRate);

    const investedAmount = investment * months;
    const returnsAmount = totalValue - investedAmount;

    setResult({
      invested: Math.round(investedAmount),
      returns: Math.round(returnsAmount),
      total: Math.round(totalValue),
    });
  }, [investment, rate, years]);

  // Modal Functions
  const handleStartInvesting = (e) => {
    e.preventDefault();
    setShowModal(true);
    setSubmitStatus("");
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit Investment Interest
  const handleSubmitInterest = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        userId: user ? user.id : null,
        type: "SIP Interest",
        amount: investment,
        details: {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          monthlyInvestment: investment,
          expectedRate: rate,
          timePeriod: years,
          projectedTotal: result.total,
        },
      };

      await investmentService.createInvestment(payload);

      setSubmitStatus("success");

      setTimeout(() => {
        setShowModal(false);
        setUserData({ name: "", email: "", phone: "" });
        setSubmitStatus("");
      }, 2000);
    } catch (error) {
      console.error("Investment request failed", error);
      setSubmitStatus("error");
      alert("Could not save request. Please try logging in first.");
    }
  };

  // Gemini AI Explanation
  const handleExplainWithAI = async () => {
    setLoadingAI(true);
    setAiExplanation("");

    try {
      const response = await axios.post(API_URL, {
        monthlyInvestment: investment,
        years: years,
        expectedReturn: rate,
        maturityAmount: result.total,
      });

      setAiExplanation(response.data.explanation);
    } catch (error) {
      console.error("AI Explanation Error:", error);

      setAiExplanation(
        "Sorry! DISA AI couldn't generate an explanation right now. Please try again."
      );
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <section className="calculator-section" id="calculators">
      <div className="container">
        <h2 className="section-title">SIP Calculator</h2>

        <div className="calculator-wrapper">
          {/* Calculator Inputs */}
          <div className="calculator-inputs">
            <div className="input-group">
              <label>Monthly Investment (₹)</label>

              <input
                type="range"
                min="500"
                max="100000"
                step="500"
                value={investment}
                onChange={(e) => setInvestment(Number(e.target.value))}
              />

              <div className="input-value">
                ₹ {investment.toLocaleString()}
              </div>
            </div>

            <div className="input-group">
              <label>Expected Return Rate (p.a)</label>

              <input
                type="range"
                min="1"
                max="30"
                step="0.5"
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
              />

              <div className="input-value">{rate}%</div>
            </div>

            <div className="input-group">
              <label>Time Period (Years)</label>

              <input
                type="range"
                min="1"
                max="40"
                step="1"
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
              />

              <div className="input-value">{years} Years</div>
            </div>
          </div>

          {/* Calculator Results */}
          <div className="calculator-results">
            <div className="result-item">
              <span>Invested Amount</span>
              <h3>₹ {result.invested.toLocaleString()}</h3>
            </div>

            <div className="result-item">
              <span>Estimated Returns</span>
              <h3>₹ {result.returns.toLocaleString()}</h3>
            </div>

            <div className="result-item total">
              <span>Total Value</span>
              <h3>₹ {result.total.toLocaleString()}</h3>
            </div>

            {/* Existing Button */}
            <button
              onClick={handleStartInvesting}
              className="btn btn-primary btn-block"
            >
              Start Investing Now
            </button>

            {/* New Gemini AI Button */}
            <button
              className="sip-ai-btn"
              onClick={handleExplainWithAI}
              disabled={loadingAI}
            >
              {loadingAI
                ? "Generating AI Explanation..."
                : "✨ Explain with DISA AI"}
            </button>

            {/* AI Explanation Card */}
            {aiExplanation && (
              <div className="ai-explanation-card">
                <h3>🤖 DISA AI Explanation</h3>

                {aiExplanation.split("\n").map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Investment Interest Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={handleModalClose}
            >
              &times;
            </button>

            <h3>Start Your Investment Journey</h3>

            <p>
              We've saved your calculation. Fill in your details so our
              expert can guide you.
            </p>

            <div className="summary-box">
              <small>Looking to invest:</small>

              <strong>
                ₹ {investment.toLocaleString()}/month
              </strong>
            </div>

            {submitStatus === "success" ? (
              <div className="success-message">
                ✅ Request Received! We will contact you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmitInterest}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    required
                    value={userData.name}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    required
                    value={userData.email}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={userData.phone}
                    onChange={handleInputChange}
                    className="modal-input"
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-full"
                >
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

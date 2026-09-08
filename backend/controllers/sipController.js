const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const explainSip = async (req, res) => {
  try {
    const { monthlyInvestment, years, expectedReturn, maturityAmount } = req.body;

    const prompt = `
You are DISA Financial Services AI Assistant.

Explain this SIP result in simple English.

Investment Details:
- Monthly SIP: ₹${monthlyInvestment}
- Duration: ${years} years
- Expected Return: ${expectedReturn}%
- Estimated Maturity Amount: ₹${maturityAmount}

Give:
1. Summary.
2. Wealth gained.
3. Total investment.
4. Power of compounding.
5. One financial tip from DISA.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash-lite",
      contents: prompt,
    });

    res.json({
      success: true,
      explanation: response.text,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      explanation: "Unable to generate explanation.",
    });
  }
};

module.exports = { explainSip };
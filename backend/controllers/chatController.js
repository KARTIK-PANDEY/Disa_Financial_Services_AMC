const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Retry Gemini if the model is temporarily busy
async function getGeminiReply(prompt) {
  const MAX_RETRIES = 3;

  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
      });

      return response.text;
    } catch (err) {
      // Retry only if Gemini is overloaded
      if (err.status === 503 && i < MAX_RETRIES - 1) {
        console.log(`Gemini busy. Retrying... (${i + 1})`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        continue;
      }

      throw err;
    }
  }
}

const chatWithGemini = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        reply: "Message is required.",
      });
    }

    const prompt = `
You are DISA Financial Services AI Assistant.

About DISA Financial Services:
- Indian financial services company.
- Services include Mutual Funds, SIP, Stock Broking, Insurance and Financial Planning.
- Always answer professionally.
- Keep answers under 150 words unless the user asks for details.
- Use bullet points when explaining concepts.
- Never guarantee returns.
- End investment advice with:
  "For personalized investment planning, please contact a DISA Financial Services advisor."

User Question:
${message}
`;

    const reply = await getGeminiReply(prompt);

    return res.status(200).json({
      success: true,
      reply,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);

    return res.status(error.status || 500).json({
      success: false,
      status: error.status || 500,
      error: error.message,
      reply: "Sorry, I'm unable to respond right now.",
    });
  }
};

module.exports = { chatWithGemini };
require('dotenv').config();
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('frontend')); // Serve static files from 'frontend'
app.use(express.json());

const genAI = new GoogleGenerativeAI("AIzaSyCknw7IQPP39UzK9huDscA5JsQwv5GOMeg");

const SYSTEM_INSTRUCTION = "Meet Baymax, your friendly and supportive AI assistant, designed with a warm, approachable demeanor and a comforting presence. Baymax combines empathy with advanced capabilities to offer you the best support. Whether you need medical advice, emotional comfort, practical help, or just a friendly chat, Baymax is here to assist with a gentle touch and a caring heart. With his versatile skills and soothing personality, Baymax is more than just an assistant—he’s your trusted companion in any situation.";

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: SYSTEM_INSTRUCTION,
});

app.post('/generate', async (req, res) => {
  try {
    const userPrompt = req.body.prompt;

    const result = await model.generateContent(userPrompt);
    const response = await result.response;

    res.json({ response: await response.text() });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while generating text.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

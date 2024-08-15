const express = require('express');
const path = require('path');
const { getGeminiResponse } = require('./gemini_api.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../frontend')));
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const { message: userMessage } = req.body;

        if (!userMessage) {
            return res.status(400).json({ error: 'Message is required' });
        }

        const geminiResponse = await getGeminiResponse(userMessage);

        // Ensure the response is a string and correctly formatted
        res.json({ response: geminiResponse.toString() });

    } catch (error) {
        console.error('Error fetching Gemini response:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

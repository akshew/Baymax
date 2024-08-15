const axios = require('axios');
const { geminiApiKey } = require('../config/keys.js');

async function getGeminiResponse(prompt) {
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiApiKey}`, 
      {
          contents: [
            {
              parts: [
                {
                  text: prompt
                }
              ]
            }
          ]
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
    );

    const generatedText = response?.data?.candidates?.[0]?.content || 'No response text found';

    return generatedText;  // Ensure we are returning just the string

  } catch (error) {
    console.error('Error fetching Gemini API:', error.response ? error.response.data : error.message);
    return 'An error occurred while fetching the response';
  }
}

module.exports = { getGeminiResponse };

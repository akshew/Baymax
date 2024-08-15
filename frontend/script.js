document.getElementById('sendBtn').addEventListener('click', sendMessage);

document.getElementById('prompt').addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
});

async function sendMessage() {
  const prompt = document.getElementById('prompt').value;
  const responseElement = document.getElementById('messages');

  if (prompt.trim() === '') {
    return; 
  }


  const userMessage = document.createElement('div');
  userMessage.classList.add('message', 'user');
  userMessage.innerText = prompt;
  responseElement.appendChild(userMessage);

  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (data.response) {
      const newMessage = document.createElement('div');
      newMessage.classList.add('message', 'bot');
      newMessage.innerText = data.response;
      responseElement.appendChild(newMessage);
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error:', error);
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('message', 'bot');
    errorMessage.innerText = `An error occurred: ${error.message || 'Unknown error'}`;
    responseElement.appendChild(errorMessage);
  }

  document.getElementById('prompt').value = ''; 

  responseElement.scrollTop = responseElement.scrollHeight;
}

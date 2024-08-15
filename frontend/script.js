document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("userInput");
    const sendButton = document.getElementById("sendBtn");
    const messagesArea = document.getElementById("messages");

    const sendMessage = async () => {
        const message = inputField.value.trim();
        if (message !== "") {
            appendMessage("user", message);
            inputField.value = "";

            try {
                const response = await fetch("/api/chat", {  // Call your server endpoint here
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ message })
                });

                const data = await response.json();
                console.log("API Response:", data);  // Log the full API response for debugging

                // Ensure the response is accessed and displayed as a string
                if (typeof data.response === 'string') {
                    appendMessage("bot", data.response);
                } else {
                    appendMessage("bot", "Sorry, I couldn't generate a response.");
                }
            } catch (error) {
                console.error("Error:", error);
                appendMessage("bot", "Sorry, there was an error processing your request.");
            }
        }
    };

    const appendMessage = (sender, message) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = message;  // Ensure message is a string
        messagesArea.appendChild(messageElement);
        messagesArea.scrollTop = messagesArea.scrollHeight;
    };

    sendButton.addEventListener("click", sendMessage);

    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

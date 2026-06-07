// 1. DOM Elements mapped perfectly to your index.html IDs
const chatBot = document.getElementById('chatBox');
const sendBtn = document.getElementById('sendBtn');
const chatInput = document.getElementById('userInput');

// 2. Add Event Listener to the Send Button
if (sendBtn && chatInput) {
    sendBtn.addEventListener('click', () => {
        const userQuestion = chatInput.value.trim();
        if (!userQuestion) return;

        // Display user message in UI
        appendMessage(userQuestion, 'user-message');
        chatInput.value = ''; // Clear input field

        // Trigger the backend API call
        getBotResponse(userQuestion);
    });

    // Allow pressing "Enter" key to send messages too
    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendBtn.click();
        }
    });
}

// 3. Main Function to Communicate with Render Backend Engine
async function getBotResponse(userQuestion) {
    // Create the loading visual indicator cleanly
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('message', 'bot-message');
    loadingDiv.innerText = "Consulting the gaming gods... 🧠🎮";
    
    if (chatBot) {
        chatBot.appendChild(loadingDiv);
        chatBot.scrollTop = chatBot.scrollHeight;
    }

    try {
        const backendURL = 'https://aven-ai.onrender.com/api/chat';

        const response = await fetch(backendURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: userQuestion })
        });

        const data = await response.json();
        
        // Remove loading state safely
        if (loadingDiv.parentNode) {
            loadingDiv.remove();
        }

        // Check response data keys and append to UI safely
        if (data && data.reply) {
            appendMessage(data.reply, 'bot-message');
        } else if (data && data.response) {
            appendMessage(data.response, 'bot-message');
        } else if (data && data.error) {
            appendMessage(`Error: ${data.error}`, 'bot-message');
        } else {
            appendMessage("Hmm, I couldn't process a valid response. Try asking something else!", 'bot-message');
        }

    } catch (error) {
        console.error("Connection Error:", error);
        
        // Remove loading state safely on crash
        if (loadingDiv.parentNode) {
            loadingDiv.remove();
        }
        appendMessage("Oops! Something went wrong connecting to AVEN core. Please try again later.", 'bot-message');
    }
}

// 4. Helper Function to dynamically render elements to layout screen
function appendMessage(text, className) {
    if (!chatBot) return;
    
    const msgElement = document.createElement('div');
    msgElement.classList.add('message', className);
    msgElement.innerText = text;
    
    chatBot.appendChild(msgElement);
    chatBot.scrollTop = chatBot.scrollHeight; // Auto-scroll to latest message
}

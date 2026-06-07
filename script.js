async function getBotResponse(userQuestion){
    const loadingDiv = document.createElement('div');
    LoadingDiv.classList.add('message', 'bot-message');
    LoadingDiv.innerText = "Consulting the gaming gods... 🧠🎮";
    chatBot.appendChild(loadingDiv);
    chatBot.scrollTop = chatBot.scrollHeight;

    try {
        const backendURL = 'https://aven-ai.onrender.com/api/chat';

        const response = await fetch(backendURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ question: userQuestion })
        });

        const data = await response.json();
        loadingDiv.remove();

        if (data.reply) {
            appendMessage(data.reply, 'bot-message');
        } else {
            appendMessage("Hmm, I couldn't get a response. Try asking something else!", 'bot-message');
        }

    } catch (error) {
        console.error(error);
        loadingDiv.remove();
        appendMessage("Oops! Something went wrong. Please try again later.", 'bot-message');
    }
}

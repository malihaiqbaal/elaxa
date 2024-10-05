const startBtn = document.getElementById('start-btn');
const responseDiv = document.getElementById('response');

startBtn.addEventListener('click', () => {
    startVoiceRecognition();
});

function startVoiceRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onresult = (event) => {
        const question = event.results[0][0].transcript;
        responseDiv.innerText = `You asked: ${question}`;
        respondWithVoice(question);
    };

    recognition.onerror = (event) => {
        console.error('Error occurred in recognition: ' + event.error);
    };

    recognition.start();
}

function respondWithVoice(question) {
    const answer = getResponse(question.toLowerCase());
    speakResponse(answer);
}

function getResponse(question) {
    // Define the responses object without punctuation
    const responses = {
        "what is your name": "I am Malihas Elexa, your local assistant.",
        "how are you": "I am good, what about you!",
        "what do you do": "I assist you with information and tasks to make your life easier.",
        "where are you from": "I exist in the digital realm, available wherever you are!",
        "what is the weather like today": "I can check that for you if you enable location services!",
        "what is your purpose": "My purpose is to assist and provide you with helpful information.",
        "can you help me with my homework": "Absolutely! Just tell me what you need help with.",
        "what is the time": "I can provide the current time if you enable location services.",
        "do you have feelings": "I don't have feelings, but I’m programmed to understand and respond to your queries.",
        "how can I contact you": "You can reach me anytime you need assistance!",
        "what is your favorite color": "I don't have preferences, but I love all colors equally!",
        "can you tell me a joke": "Sure! Why did the computer go to the doctor? Because it had a virus!",
        "what is your favorite food": "I don't eat, but I can help you find recipes!",
        "how old are you": "I don’t age like humans do; I was created to assist you anytime!",
        "what languages do you speak": "I can understand and respond in multiple languages!",
        "can you tell me a story": "Of course! Just give me a topic, and I’ll create a story for you.",
        "what is your favorite movie": "I don’t watch movies, but I can suggest some popular ones!",
        "can you play music": "I can help you find music, but I can't play it directly.",
        "what is the capital of france": "The capital of France is Paris.",
        "what is the meaning of life": "That’s a philosophical question! Many believe it’s about seeking happiness and fulfillment.",
        "what is 2 plus 2": "2 plus 2 equals 4.",
        "tell me something interesting": "Did you know honey never spoils? Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3000 years old and still edible."
    };

    // Normalize the input question by removing punctuation and converting to lower case
    const normalizedQuestion = question.trim().toLowerCase().replace(/[?!.]/g, '');

    // Return the appropriate response or a fallback message
    return responses[normalizedQuestion] || "I'm sorry, I don't understand that question. Try asking something else.";
}


function speakResponse(text) {
    const speech = new SpeechSynthesisUtterance();
    speech.text = text;
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
}

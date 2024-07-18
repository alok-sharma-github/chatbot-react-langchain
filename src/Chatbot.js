// src/Chatbot.js
import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
  };

  const sendMessage = () => {
    if (userInput.trim()) {
      const userMessage = { text: userInput, type: "user" };
      setMessages([...messages, userMessage]);
      setUserInput("");
      setTimeout(() => {
        const botMessage = { text: getBotResponse(userInput), type: "bot" };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  const getBotResponse = (userMessage) => {
    const responses = {
      hello: "Hello! How can I assist you today?",
      hi: "Hi there! What can I do for you?",
      "how are you": "I am just a bot, but I am here to help you!",
      bye: "Goodbye! Have a great day!",
    };
    return (
      responses[userMessage.toLowerCase()] ||
      "I'm sorry, I didn't understand that."
    );
  };

  return (
    <div>
      {!chatbotVisible && (
        <button id="open-chatbot-btn" onClick={toggleChatbot}>
          💬
        </button>
      )}
      {chatbotVisible && (
        <div id="chatbot-container">
          <div id="chatbot-header">
            <div className="chatbot-info-container">
              <img
                src="https://cdn.dribbble.com/users/275794/screenshots/3128598/gbot_800.png"
                alt="Chatbot Avatar"
                id="chatbot-avatar"
              />
              <div>
                <h2 id="chatbot-name">Kaka</h2>
                <p id="chatbot-status">Online</p>
              </div>
            </div>
            <span id="chatbot-close-btn" onClick={toggleChatbot}>
              &times;
            </span>
          </div>
          <div id="chatbot-body">
            <div id="chatbot-messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.type}-message`}>
                  {message.text}
                </div>
              ))}
            </div>
          </div>
          <div id="chatbot-footer">
            <input
              type="text"
              id="user-input"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button id="send-btn" onClick={sendMessage}>
              🏹
            </button>
          </div>
          <div id="chatbot-powered">
            <span>Powered by Alok Sharma</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;

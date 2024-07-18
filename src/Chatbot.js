import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [chatbotVisible, setChatbotVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [sessionID, setSessionID] = useState("default_session"); // Initial session ID

  const toggleChatbot = () => {
    setChatbotVisible(!chatbotVisible);
    if (!chatbotVisible) {
      // Clear messages when chatbot is closed
      setMessages([]);
    }
  };

  const sendMessage = () => {
    if (userInput.trim()) {
      const userMessage = { text: userInput, type: "user" };
      setMessages([...messages, userMessage]);
      setUserInput("");

      // Prepare the data object to send to Flask backend
      const data = {
        query: userInput,
        session_id: sessionID,
      };

      // Example fetch call to send data to Flask backend
      fetch("http://localhost:5000/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          const botMessage = { text: data.answer, type: "bot" };
          setMessages((prevMessages) => [...prevMessages, botMessage]);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          // Handle errors if any
        });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
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

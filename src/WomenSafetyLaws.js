import React, { useState } from "react";
import "./WomenSafetyLaws.css";

const WomenSafetyLaws = () => {
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("general");
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { role: "user", content: message };
    setChatHistory([...chatHistory, userMessage]);

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, category }),
      });

      const data = await response.json();
      const botMessage = { role: "bot", content: data.response };

      setChatHistory([...chatHistory, userMessage, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage("");
  };

  return (
    <div className="app">
      <div className="chat-container">
        <h1>AI Chat Assistant</h1>

        <div className="category-selector">
          <label>Choose Category: </label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="general">General</option>
            <option value="legal">Legal Advice</option>
            <option value="safety">Safety Tips</option>
          </select>
        </div>

        <div className="input-area">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
        
        <div className="chat-box">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}
            >
              <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
              <div dangerouslySetInnerHTML={{ __html: msg.content }} />
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}



export default WomenSafetyLaws;

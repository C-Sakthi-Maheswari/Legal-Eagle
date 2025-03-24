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
    <div className="chat-container">
    <h1>AI Chat Assistant</h1>

    {/* Category Selector */}
    <div className="category-selector" style={{marginBottom:"20px",marginTop:"10px"}}>
      <label>Choose Category: </label>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="general">General</option>
        <option value="legal">Legal Advice</option>
        <option value="safety">Safety Tips</option>
      </select>
    </div>

    {/* Chat Box */}
    <div className="chat-box">
  {chatHistory.map((msg, index) => (
    <div 
      key={index} 
      className={`message ${msg.role === "user" ? "user-message" : "bot-message"}`}
    >
      <strong>{msg.role === "user" ? "You: " : "Bot: "}</strong>
      <div className="message-content">
        {msg.content
          .replace(/<br\s*\/?>/gi, "\n") // Remove <br> tags
          .split("\n") // Split by newline
          .map((line, i) => (
            <p key={i}>{line}</p>
          ))}
      </div>
    </div>
  ))}
</div>


    {/* Input Area */}
    <div className="input-area">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="What are my legal rights in my work place..."
      />
      <button onClick={handleSendMessage}>➤</button>
    </div>
  </div>
  );
}



export default WomenSafetyLaws;

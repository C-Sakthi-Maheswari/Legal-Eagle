import React, { useState } from "react";
import "./WomenSafetyLaws.css";

const WomenSafetyLaws = () => {
  const [expanded, setExpanded] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const laws = [
    {
      title: "Protection of Women from Domestic Violence Act, 2005",
      description:
        "This law ensures protection for women from physical, emotional, sexual, or economic abuse at home.",
    },
    {
      title:
        "Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013",
      description:
        "A comprehensive law to protect women from harassment at their workplace.",
    },
    {
      title: "Indian Penal Code Section 354D - Stalking",
      description:
        "Addresses stalking and harassment, ensuring punishment for such behavior.",
    },
  ];

  const toggleExpand = (index) => {
    setExpanded(expanded === index ? null : index);
  };

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    // Add user's message to the chat
    const userMessage = { sender: "user", text: inputMessage };
    setMessages((prev) => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botMessage = {
        sender: "bot",
        text: `You asked: "${inputMessage}". Let me find the best legal advice for you.`,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);

    setInputMessage(""); // Clear input
  };

  return (
    <div className="container">
      {/* Women Safety Laws Section */}
      <div className="laws-section">
        <h2>Women Safety Laws</h2>
        <p>Access essential laws and resources for women’s safety.</p>
        <div className="laws">
          {laws.map((law, index) => (
            <div key={index} className="law-item">
              <button className="law-title" onClick={() => toggleExpand(index)}>
                {law.title}
              </button>
              {expanded === index && (
                <p className="law-description">{law.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Chatbot Widget */}
      <div className={`chatbot-widget ${chatOpen ? "open" : ""}`}>
        <div className="chatbot-header" onClick={toggleChat}>
          {chatOpen ? "Close Chatbot" : "Need Help? Chat with us"}
        </div>
        {chatOpen && (
          <div className="chatbot-body">
            <div className="chatbot-messages">
              {messages.map((msg, index) => (
                <div key={index} className={`chatbot-message ${msg.sender}`}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chatbot-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WomenSafetyLaws;

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
    {
      title: "The Dowry Prohibition Act, 1961",
      description:
        "This law prohibits the request, payment, or acceptance of a dowry during marriage.",
    },
    {
      title: "Maternity Benefit (Amendment) Act, 2017",
      description:
        "This act ensures maternity leave and benefits to women working in both organized and unorganized sectors.",
    },
    {
      title: "The Equal Remuneration Act, 1976",
      description:
        "This law mandates equal pay for equal work for both men and women.",
    },
    {
      title: "The Prohibition of Child Marriage Act, 2006",
      description:
        "Prohibits child marriages and provides for the protection of minors in case of such marriages.",
    },
    {
      title: "The Indian Divorce Act, 1869",
      description:
        "Provides legal provisions for Christian women seeking a divorce.",
    },
    {
      title: "The Sexual Offences (Special Courts) Act, 2016",
      description:
        "A fast-track court mechanism to expedite trials of sexual offences against women.",
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

    // Simulate bot response based on message
    setTimeout(() => {
      let botMessage;
      if (inputMessage.toLowerCase().includes("laws")) {
        botMessage = {
          sender: "bot",
          text: `You asked about laws. Here are some examples: ${laws
            .map((law) => law.title)
            .join(", ")}.`,
        };
      } else if (inputMessage.toLowerCase().includes("domestic violence")) {
        botMessage = {
          sender: "bot",
          text: `The Protection of Women from Domestic Violence Act, 2005, provides protection from domestic abuse. Let me know if you want more details.`,
        };
      } else {
        botMessage = {
          sender: "bot",
          text: `You asked: "${inputMessage}". Let me find the best legal advice for you.`,
        };
      }
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

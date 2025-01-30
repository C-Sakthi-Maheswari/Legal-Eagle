import React, { useState, useEffect } from "react";
import "./WomenSafetyLaws.css";

const WomenSafetyLaws = () => {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const laws = [
    {
      title: "Protection of Women from Domestic Violence Act, 2005",
      description: "This law ensures protection for women from physical, emotional, sexual, or economic abuse at home. Women facing abuse can seek protection orders and legal assistance.",
      safetyMeasures: [
        "Seek a protection order from the court.",
        "Contact the police for immediate safety.",
        "Reach out to women’s support organizations for assistance."
      ]
    },
    {
      title: "Sexual Harassment of Women at Workplace Act, 2013",
      description: "A comprehensive law to protect women from harassment at their workplace. Women can file complaints with the Internal Complaints Committee (ICC) or the Local Complaints Committee (LCC).",
      safetyMeasures: [
        "Report incidents to the Internal Complaints Committee (ICC).",
        "Ensure your workplace has proper grievance redressal mechanisms.",
        "Seek legal assistance if needed."
      ]
    },
    {
      title: "Indian Penal Code Section 354D - Stalking",
      description: "Addresses stalking and harassment, ensuring punishment for such behavior. Victims can report stalking to the police and seek restraining orders.",
      safetyMeasures: [
        "File a police report if you are being stalked.",
        "Obtain a restraining order from the court.",
        "Stay vigilant and inform trusted individuals about the situation."
      ]
    },
    {
      title: "The Dowry Prohibition Act, 1961",
      description: "This law prohibits the request, payment, or acceptance of a dowry during marriage. Women can report dowry harassment to the police and seek legal action.",
      safetyMeasures: [
        "Report dowry harassment to the police.",
        "Seek help from women’s welfare organizations.",
        "Approach family courts for protection and relief."
      ]
    },
    {
      title: "Maternity Benefit (Amendment) Act, 2017",
      description: "This act ensures maternity leave and benefits to women working in both organized and unorganized sectors. Employers are required to provide paid maternity leave.",
      safetyMeasures: [
        "Ensure you are aware of your maternity leave rights.",
        "Contact your HR department for support.",
        "If faced with discrimination, file a complaint with labor courts."
      ]
    },
    {
      title: "The Equal Remuneration Act, 1976",
      description: "This law mandates equal pay for equal work for both men and women. Women facing wage discrimination can file complaints with labor courts.",
      safetyMeasures: [
        "Request a salary audit in your workplace.",
        "Report pay disparity to labor authorities.",
        "Seek legal counsel to understand your rights."
      ]
    },
    {
      title: "The Prohibition of Child Marriage Act, 2006",
      description: "Prohibits child marriages and provides for the protection of minors in case of such marriages. Victims can report underage marriages to child welfare committees.",
      safetyMeasures: [
        "Report suspected child marriages to child welfare committees.",
        "Reach out to child protection services for immediate help.",
        "Seek legal advice to annul the marriage."
      ]
    },
    {
      title: "The Indian Divorce Act, 1869",
      description: "Provides legal provisions for Christian women seeking a divorce. Women can approach family courts for divorce and maintenance claims.",
      safetyMeasures: [
        "Consult a lawyer specializing in divorce law.",
        "Approach family courts for divorce and alimony claims.",
        "Stay in contact with a trusted family member or friend for support."
      ]
    },
    {
      title: "The Sexual Offences (Special Courts) Act, 2016",
      description: "A fast-track court mechanism to expedite trials of sexual offences against women. Victims can seek speedy justice through these courts.",
      safetyMeasures: [
        "Report sexual offences immediately to the police.",
        "Make use of fast-track courts for quicker justice.",
        "Seek medical and psychological support post-assault."
      ]
    }
  ];

  useEffect(() => {
    if (chatOpen) {
      setMessages([{ sender: "bot", text: "Hello! How can I assist you?" }]);
    }
  }, [chatOpen]);

  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };

  const handleOptionClick = (law) => {
    setMessages((prev) => [
      ...prev,
      { sender: "bot", text: `${law.title}: ${law.description}` },
      { sender: "bot", text: "Safety Measures:" },
      ...law.safetyMeasures.map((measure) => ({ sender: "bot", text: `- ${measure}` }))
    ]);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    setMessages((prev) => [...prev, { sender: "user", text: inputMessage }]);

    setTimeout(() => {
      let botMessage;
      if (inputMessage.toLowerCase() === "hello") {
        botMessage = { sender: "bot", text: "Hello! Here are some legal options you might find useful:" };
        setMessages((prev) => [
          ...prev,
          botMessage,
          ...laws.map((law) => ({ sender: "bot", text: law.title, onClick: () => handleOptionClick(law) }))
        ]);
      } else {
        botMessage = { sender: "bot", text: `You asked: "${inputMessage}". Let me find the best legal advice for you.` };
        setMessages((prev) => [...prev, botMessage]);
      }
    }, 1000);

    setInputMessage("");
  };

  return (
    <div className="container">
      <div className={`chatbot-container ${chatOpen ? "open" : ""}`} style={{ position: "fixed", bottom: "20px", left: "20px", width: "300px", background: "white", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)" }}>
        <div className="chatbot-header" onClick={toggleChat} style={{ background: "#007bff", color: "white", padding: "10px", textAlign: "center", cursor: "pointer", borderTopLeftRadius: "10px", borderTopRightRadius: "10px" }}>
          {chatOpen ? "Close Chatbot" : "Chat with us"}
        </div>
        {chatOpen && (
          <div className="chatbot-body" style={{ padding: "10px" }}>
            <div className="chatbot-messages" style={{ maxHeight: "200px", overflowY: "auto" }}>
              {messages.map((msg, index) => (
                <div key={index} className={`chatbot-message ${msg.sender}`} style={{ margin: "5px 0", padding: "8px", borderRadius: "5px", background: msg.sender === "bot" ? "#f1f1f1" : "#007bff", color: msg.sender === "bot" ? "black" : "white" }} onClick={msg.onClick}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="chatbot-input" style={{ display: "flex", marginTop: "10px" }}>
              <input
                type="text"
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                style={{ flex: "1", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
              <button onClick={handleSendMessage} style={{ marginLeft: "5px", padding: "5px 10px", background: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WomenSafetyLaws;

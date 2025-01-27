//import React from 'react';
import './VoiceTranslation.css';

// function VoiceTranslation() {
//   return (
//     <div>
//       <h2>Voice Recognition & Translation</h2>
//       <p>Convert spoken words into text and translate legal content.</p>
//     </div>
//   );
// }

// export default VoiceTranslation;
import React, { useState } from "react";

function VoiceTranslation() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const startRecognition = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US"; // Set the recognition language
    recognition.interimResults = false; // Only capture final results
    recognition.continuous = false; // Stop after capturing input

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Error occurred during recognition: ", event.error);
      alert("Voice recognition failed. Please try again.");
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript; // Get the captured text
      setText(transcript);
    };

    recognition.start();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Voice Recognition & Translation</h2>
      <p>Click the button below to start speaking.</p>

      <button
        onClick={startRecognition}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: isListening ? "#007bff" : "#28a745",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        disabled={isListening}
      >
        {isListening ? "Listening..." : "Start Listening"}
      </button>

      {text && (
        <div style={{ marginTop: "20px" }}>
          <h3>Recognized Text:</h3>
          <p style={{ fontSize: "18px", color: "#333" }}>{text}</p>
        </div>
      )}
    </div>
  );
}

export default VoiceTranslation;

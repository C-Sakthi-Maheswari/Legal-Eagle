 import './VoiceTranslation.css';

import React, { useState } from "react";

function VoiceTranslation() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("hi-IN"); // Default to Hindi
  const [targetLanguage, setTargetLanguage] = useState("es"); // Default to Spanish

  const recognitionLanguages = [
    { code: "hi-IN", label: "Hindi" },
    { code: "ta-IN", label: "Tamil" },
    { code: "te-IN", label: "Telugu" },
    { code: "ml-IN", label: "Malayalam" },
    { code: "bn-IN", label: "Bengali" },
    { code: "mr-IN", label: "Marathi" },
    { code: "gu-IN", label: "Gujarati" },
    { code: "pa-IN", label: "Punjabi" },
    { code: "ur-IN", label: "Urdu" },
    { code: "kn-IN", label: "Kannada" },
    { code: "or-IN", label: "Odia" },
    { code: "as-IN", label: "Assamese" },
  ];

  const translationLanguages = [
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "de", label: "German" },
    { code: "zh", label: "Chinese" },
    { code: "hi", label: "Hindi" },
    { code: "en", label: "English" },
  ];

  const startRecognition = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language; // Set recognition language
    recognition.interimResults = false;
    recognition.continuous = false;

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
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      translateText(transcript); // Translate the text
    };

    recognition.start();
  };

  const translateText = (inputText) => {
    const translations = {
      es: `Translated to Spanish: ${inputText}`,
      fr: `Translated to French: ${inputText}`,
      de: `Translated to German: ${inputText}`,
      zh: `Translated to Chinese: ${inputText}`,
      hi: `Translated to Hindi: ${inputText}`,
      en: `Translated to English: ${inputText}`,
    };
    setTranslatedText(translations[targetLanguage] || "Translation not available.");
    
    // Read aloud the translated text
    readAloud(translations[targetLanguage] || "Translation not available.");
  };

  const readAloud = (textToRead) => {
    const utterance = new SpeechSynthesisUtterance(textToRead);
    // Set the language for Speech Synthesis (match the translation language)
    if (targetLanguage === "es") {
      utterance.lang = "es-ES"; // Spanish
    } else if (targetLanguage === "fr") {
      utterance.lang = "fr-FR"; // French
    } else if (targetLanguage === "de") {
      utterance.lang = "de-DE"; // German
    } else if (targetLanguage === "zh") {
      utterance.lang = "zh-CN"; // Chinese
    } else if (targetLanguage === "hi") {
      utterance.lang = "hi-IN"; // Hindi
    } else {
      utterance.lang = "en-US"; // Default to English
    }

    // Speak the translated text
    window.speechSynthesis.speak(utterance);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleTargetLanguageChange = (e) => {
    setTargetLanguage(e.target.value);
  };

  return (
    <div  className="container" style={{ textAlign: "center", padding: "20px" }}>
      <div className='Voice-trans'>
      <h2 className="Voice-reco">Voice Recognition & Translation</h2>
      <div className="title">
          <div className="circle"></div>
      <p>Choose a language and click the button to start speaking.</p>
          </div>

      <div className='language-container'>
      <div className="select-language" >
        <label htmlFor="language-select">
          Recognition Language:
        </label>
        <select
          id="language-select"
          value={language}
          onChange={handleLanguageChange}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          {recognitionLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>

     
      <div className="select-language" >
        <label htmlFor="target-language-select" >
          Translation Language:
        </label>
        <select
          id="target-language-select"
          value={targetLanguage}
          onChange={handleTargetLanguageChange}
          style={{
            padding: "8px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          {translationLanguages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
      </div>
      

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
        <div className="goldenbox" style={{ marginTop: "20px" }}>
          <h3>Recognized Text:</h3>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <p style={{ fontSize: "18px", color: "#333" }}>{text}</p>
          </div>
        </div>
      )}

      {translatedText && (
        <div className="goldenbox" style={{ marginTop: "20px" }}>
          <h3>Translated Text:</h3>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#e6f7ff",
            }}
          >
            <p style={{ fontSize: "18px", color: "#333" }}>{translatedText}</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default VoiceTranslation;

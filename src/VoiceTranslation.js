import './VoiceTranslation.css';
import React, { useState } from "react";

function VoiceTranslation() {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("ta"); // Default Tamil
  const [targetLanguage, setTargetLanguage] = useState("en"); // Default English
  const [loading, setLoading] = useState(false);

  // Supported languages (matching Helsinki-NLP model codes)
  const recognitionLanguages = [
    { code: "hi", label: "Hindi" },
    { code: "ta", label: "Tamil" },
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
    { code: "es", label: "Spanish" }
  ];

  const translationLanguages = [
    { code: "en", label: "English" },
    { code: "fr", label: "French" },
    { code: "es", label: "Spanish" },
    { code: "ta", label: "Tamil" },
    { code: "hi", label: "Hindi" }
  ];

  const startRecognition = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = (event) => {
      console.error("Recognition Error: ", event.error);
      alert("Voice recognition failed.");
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      translateText(transcript);
    };

    recognition.start();
  };

  const translateText = async (inputText) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: inputText,
          source_language: language,  // Now properly handled by backend
          target_language: targetLanguage
        }),
      });

      const data = await response.json();
      if (data.translated_text) {
        setTranslatedText(data.translated_text);
        readAloud(data.translated_text);
      } else {
        setTranslatedText("Translation failed.");
      }
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Error in translation.");
    }
    setLoading(false);
  };

  const readAloud = (textToRead) => {
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = targetLanguage;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="container" style={{ textAlign: "center", padding: "20px" }}>
      <div className='Voice-trans'>
        <h2 className="Voice-reco">Voice Recognition & Translation</h2>
        <div className="title">
          <p>Choose a language and start speaking.</p>
        </div>

        <div className='language-container'>
          <div className="select-language">
            <label>Recognition Language:</label>
            <select value={language} onChange={(e) => setLanguage(e.target.value)}>
              {recognitionLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>

          <div className="select-language">
            <label>Translation Language:</label>
            <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
              {translationLanguages.map((lang) => (
                <option key={lang.code} value={lang.code}>{lang.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button onClick={startRecognition} disabled={isListening}>
          {isListening ? "Listening..." : "Start Listening"}
        </button>

        {loading && <p>Translating...</p>}

        {text && (
          <div className="goldenbox">
            <h3>Recognized Text:</h3>
            <p>{text}</p>
          </div>
        )}

        {translatedText && (
          <div className="goldenbox">
            <h3>Translated Text:</h3>
            <p>{translatedText}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VoiceTranslation;

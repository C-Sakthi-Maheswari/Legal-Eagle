import React, { useState } from "react";

function HistoricalManuscripts() {
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRecognizeText = async () => {
    if (!image) {
      alert("Please upload an image first.");
      return;
    }

    setIsProcessing(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", image);

      // Send image to backend for OCR processing
      const response = await fetch("http://127.0.0.1:5011/ocr", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Failed to recognize text. Status: ${response.status}`);
      }

      const result = await response.json();
      setRecognizedText(result.recognized_text || "");
      setIsProcessing(false);
    } catch (err) {
      console.error("Error during fetch:", err);
      setError(`Failed to recognize text. ${err.message}`);
      setIsProcessing(false);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px", padding: "20px" }}>
      <h2>Historical Manuscripts Text Recognition</h2>
      <p>
        Upload an image of a historical manuscript or document to extract
        text.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{
          marginBottom: "20px",
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid #ccc",
        }}
      />

      <button
        onClick={handleRecognizeText}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          borderRadius: "5px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        disabled={isProcessing}
      >
        {isProcessing ? "Recognizing Text..." : "Recognize Text"}
      </button>

      {error && (
        <div
          style={{
            marginTop: "20px",
            color: "red",
            fontWeight: "bold",
          }}
        >
          {error}
        </div>
      )}

      {recognizedText && (
        <div style={{ marginTop: "20px" }}>
          <h3>Recognized Text:</h3>
          <div
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "#f9f9f9",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            <p style={{ fontSize: "16px", color: "#333" }}>{recognizedText}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoricalManuscripts;

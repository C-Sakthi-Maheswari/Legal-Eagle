//import React from 'react';
import './HistoricalManuscripts.css';

// function HistoricalManuscripts() {
//   return (
//     <div>
//       <h2>Read Old Handwritten Manuscripts</h2>
//       <p>Transform traditional handwritten manuscripts into legible and accessible texts.</p>
//     </div>
//   );
// }

// export default HistoricalManuscripts;
import React, { useState } from "react";
import Tesseract from "tesseract.js";

// Convert image to grayscale and apply thresholding
const preprocessImage = (image) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();
  
  return new Promise((resolve) => {
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      // Convert to grayscale
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = data[i + 1] = data[i + 2] = avg; // Set R, G, B to grayscale value
      }

      // Apply thresholding
      const threshold = 128;
      for (let i = 0; i < data.length; i += 4) {
        const brightness = data[i];
        const newColor = brightness > threshold ? 255 : 0;
        data[i] = data[i + 1] = data[i + 2] = newColor; // Set R, G, B to thresholded value
      }
      
      ctx.putImageData(imageData, 0, 0);
      resolve(canvas.toDataURL()); // Return base64 image
    };
    img.src = URL.createObjectURL(image);
  });
};

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
      // Preprocess image (grayscale + threshold)
      const processedImage = await preprocessImage(image);
      
      // Recognize text using Tesseract.js
      Tesseract.recognize(
        processedImage,
        "eng", // Language code
        {
          logger: (m) => console.log(m), // Log the progress
        }
      )
        .then(({ data: { text } }) => {
          setRecognizedText(text);
          setIsProcessing(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to recognize text. Please try again.");
          setIsProcessing(false);
        });
    } catch (err) {
      console.error("Preprocessing error:", err);
      setError("Failed to preprocess image. Please try again.");
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

import React, { useState } from "react";
import { ClipboardCopy } from 'lucide-react';
import "./HistoricalManuscripts.css";

function HistoricalManuscripts() {
  const [image, setImage] = useState(null);
  const [recognizedText, setRecognizedText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");


  const copyToClipboard = () => {
    navigator.clipboard.writeText(recognizedText);
    alert('Text copied to clipboard!');
  };


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
    <div className="container">
      <div className="tamil-docu-page">
      <h2 className="histo-docu">Historical Manuscripts Text Recognition</h2>
      <div className="box-layout">
        <div className="title">
        <div className="circle"></div>
      <p>
        Upload an image of a historical manuscript or document to extract
        text.
      </p>
        </div>
     
     
      
      <div className='file-uploading'>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
       
      />

      <button
        onClick={handleRecognizeText}
        className='upload-btn'
        
        disabled={isProcessing}
      >
        {isProcessing ? "Recognizing Text..." : "Recognize Text"}
      </button>
      </div>
      

      {error && (
        <div
          
        >
          {error}
        </div>
      )}
      <h3 className="extracted-text-label">Recognized Text:</h3>
        <div className="extracted-text-container">
          {(
            <div style={{ marginTop: "20px" }}>
              
              <div
              
              >
                <p >{recognizedText}</p>
              <button onClick={copyToClipboard} className="flex items-center gap-2">
                      <ClipboardCopy size={20} /> Copy Text
                    </button>
              </div>
            </div>
          )}
        
        </div>
          </div>
      </div>
    </div>
  );
}

export default HistoricalManuscripts;

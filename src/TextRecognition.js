import React, { useState, useEffect } from 'react';
import './TextRecognition.css';
import { ClipboardCopy,Check } from 'lucide-react';

const TextRecognition = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('en'); // Default to English

  const handleLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
    setTranslatedText('');
  };

  const handleTranslate = async () => {
    if (!text) {
      setTranslatedText('No text to translate.');
      return;
    }

    try {
      const response = await fetch(`/translate/${encodeURIComponent(text)}/${targetLanguage}`, {
        method: 'GET', // Using GET instead of POST since we're passing data in the URL
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTranslatedText(data.translated_text);

    } catch (error) {
      console.error('Translation error:', error);
      setTranslatedText(`Translation error: ${error.message}`);
    }
  };

  useEffect(() => {
    fetch('/members') // Adjust URL as per your backend
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Assuming your backend sends { "members": [...] }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setText('No file selected.');
      return;
    }

    // Create a FormData object to send the file to the backend
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send the file to the backend (replace with your actual backend URL)
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      // Handle the response from the backend
      const data = await response.json();

      if (response.ok) {
        setText(data.extracted_text); // Store extracted text
      } else {
        setText('Error extracting text.');
      }
    } catch (error) {
      console.error('Error:', error);
      setText('Error uploading file.');
    }
  };

  // Function to split the text into sentences, split at periods followed by a capital letter
  const splitTextIntoBulletPoints = (text) => {
    // Split text based on periods followed by a capital letter
    const sentences = text.split(/(?<=\.)\s+(?=[A-Z])/).filter(Boolean);
    return sentences;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(text);
    alert('Text copied to clipboard!');
  };
  const copyToClipboard2 = () => {
    navigator.clipboard.writeText(translatedText);
    alert('Text copied to clipboard!');
  };

  return (
    <div className="container">
    <div className="text-recognition-page">
      <h2 className="text-reco" style={{fontFamily:"Playfair Display"}}>Text Recognition</h2>
      <div className="box-layout">
        <div className="title">
          <div className="circle">1</div>
          <p>Upload the file the needs to be simplified</p>
        </div>
        <div className="file-uploading">
        
      <form onSubmit={handleSubmit}>
      <input
    type="file"
    id="file-upload"
    className="file-input"
    accept=".pdf"
    onChange={handleFileChange}
  />
  <button type="submit" className="upload-btn"   style={{ height:"40px",width:"40px",padding: '3px 6px', fontSize: '12px', borderRadius: '4px'}} >
   <Check size={20} /> {/* Tick mark icon */}
     </button>
      </form>
        </div>
     
        <h3 className="extracted-box">Extracted Text:</h3>
      <div className="result-box">
        
        {text ? (
          <ul>
            {splitTextIntoBulletPoints(text).map((sentence, index) => (
              <li key={index}>{sentence}.</li> // Display sentences as bullet points with period
            ))}
          </ul>
        ) : (
          <p>No text extracted.</p>
        )}
       <button onClick={copyToClipboard} className="flex items-center gap-2">
        <ClipboardCopy size={20} /> Copy Text
      </button>
      </div>
      </div>
      
      <div>
      <div className="box-layout" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="title" style={{marginTop:"20px"}}>
          <div className="circle">2</div>
          <p>Select a language to translate into</p>
         
          
        </div>
        <div className="file-uploading">
        <h3>Translate to:</h3>
        <select value={targetLanguage} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="mr">Marathi</option>
        </select>
        <button type="button" onClick={handleTranslate} disabled={!text} 
          style={{
            display: "block", 
            marginRight: "0px", // Ensures it's aligned left
            height: "30px",
            width: "70px",
            padding: "3px 3px",
            fontSize: "12px",
            borderRadius: "4px"
          }}>
          Translate
        </button>
        </div>
        
       
        
          <h3 className='extracted-box'>Translated Text:</h3>
          <div className='result-box'>
          {translatedText ? (
            <ul>
              {splitTextIntoBulletPoints(translatedText).map((sentence, index) => (
                <li key={index}>{sentence}.</li> // Display translated sentences as bullet points
              ))}
            </ul>
          ) : (
            <p>No translation available.</p>
          )}
          <button onClick={copyToClipboard2} className="flex items-center gap-2">
        <ClipboardCopy size={20} /> Copy Text
        </button>
        </div>
      </div>
      </div>
      </div>


   
    </div>
  );
};

export default TextRecognition;

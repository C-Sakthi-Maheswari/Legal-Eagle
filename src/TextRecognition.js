import React, { useState, useEffect } from 'react';
import './TextRecognition.css';

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

  return (
    <div className="text-recognition-page">
      <h2>Text Recognition</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
        />
        <button type="submit">Upload PDF</button>
      </form>
      
      <div>
        <h3>Extracted Text:</h3>
        {text ? (
          <ul>
            {splitTextIntoBulletPoints(text).map((sentence, index) => (
              <li key={index}>{sentence}.</li> // Display sentences as bullet points with period
            ))}
          </ul>
        ) : (
          <p>No text extracted.</p>
        )}
      </div>

      <div>
        <h3>Translate to:</h3>
        <select value={targetLanguage} onChange={handleLanguageChange}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="ml">Malayalam</option>
          <option value="bn">Bengali</option>
          <option value="mr">Marathi</option>
          <option value="pa">Punjabi</option>
        </select>
        <button type="button" onClick={handleTranslate} disabled={!text}>
          Translate
        </button>
        <div>
          <h3>Translated Text:</h3>
          {translatedText ? (
            <ul>
              {splitTextIntoBulletPoints(translatedText).map((sentence, index) => (
                <li key={index}>{sentence}.</li> // Display translated sentences as bullet points
              ))}
            </ul>
          ) : (
            <p>No translation available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TextRecognition;

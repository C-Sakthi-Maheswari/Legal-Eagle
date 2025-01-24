///import React from 'react';
import './TextRecognition.css';


// function TextRecognition() {
//   return (
//     <div>
//       <h2>Text Recognition & Simplification</h2>
//       <p>Recognize and simplify complex legal documents with ease.</p>
//     </div>
//   );
// }

// export default TextRecognition;
import React, { useState } from 'react';

const TextRecognition = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just simulate some extracted text
    if (file) {
      setText('Simulated extracted text from the PDF: \nLorem ipsum dolor sit amet, consectetur adipiscing elit.');
    } else {
      setText('No file selected.');
    }
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
        <p>{text}</p>
      </div>
    </div>
  );
};

export default TextRecognition;

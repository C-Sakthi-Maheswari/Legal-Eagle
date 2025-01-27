import React,{ useState, useEffect } from 'react';
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


const TextRecognition = () => {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');


  useEffect(() => {
    fetch('/members') // Adjust URL as per your backend
      .then((response) => response.json())
      .then((data) => {
        console.log(data);// Assuming your backend sends { "members": [...] }
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
        setText(data.extracted_text);  // Display the extracted text
      } else {
        setText('Error extracting text.');
      }
    } catch (error) {
      console.error('Error:', error);
      setText('Error uploading file.');
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

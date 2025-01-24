import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import pages for each option
import TextRecognition from './TextRecognition';
import VoiceTranslation from './VoiceTranslation';
import HistoricalManuscripts from './HistoricalManuscripts';
import WomenSafetyLaws from './WomenSafetyLaws';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Legal Eagle</h1>
          <p>Your trusted assistant for legal and historical document processing</p>
        </header>

        <main className="App-main">
          <div className="options">
            <div className="option-card">
              <Link to="/text-recognition">
                <h2>Text Recognition & Simplification</h2>
                <p>Recognize and simplify complex legal documents with ease.</p>
              </Link>
            </div>
            <div className="option-card">
              <Link to="/voice-translation">
                <h2>Voice Recognition & Translation</h2>
                <p>Convert spoken words into text and translate legal content.</p>
              </Link>
            </div>
            <div className="option-card">
              <Link to="/historical-manuscripts">
                <h2>Read Old Handwritten Manuscripts</h2>
                <p>Transform traditional handwritten manuscripts into legible and accessible texts.</p>
              </Link>
            </div>
            <div className="option-card">
              <Link to="/women-safety">
                <h2>Women Safety Law & Order</h2>
                <p>Access essential laws and resources for women’s safety.</p>
              </Link>
            </div>
          </div>
        </main>

        {/* Define Routes for each page */}
        <Routes>
          <Route path="/text-recognition" element={<TextRecognition />} />
          <Route path="/voice-translation" element={<VoiceTranslation />} />
          <Route path="/historical-manuscripts" element={<HistoricalManuscripts />} />
          <Route path="/women-safety" element={<WomenSafetyLaws />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;

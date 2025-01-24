import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
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
                <button>Text Recognition & Simplification</button>
              </Link>
              <p>Recognize and simplify complex legal documents with ease.</p>
            </div>
            <div className="option-card">
              <Link to="/voice-recognition">
                <button>Voice Recognition & Translation</button>
              </Link>
              <p>Convert spoken words into text and translate legal content.</p>
            </div>
            <div className="option-card">
              <Link to="/historical-manuscripts">
                <button>Read Old Handwritten Manuscripts</button>
              </Link>
              <p>Transform traditional handwritten manuscripts into legible and accessible texts.</p>
            </div>
            <div className="option-card">
              <Link to="/women-safety">
                <button>Women Safety Law & Order</button>
              </Link>
              <p>Access essential laws and resources for women’s safety.</p>
            </div>
          </div>
        </main>

        <footer className="App-footer">
          <p>© 2025 Legal Eagle. All rights reserved.</p>
        </footer>

        <Routes>
          <Route path="/text-recognition" element={<TextRecognition />} />
          <Route path="/voice-recognition" element={<VoiceTranslation />} />
          <Route path="/historical-manuscripts" element={<HistoricalManuscripts />} />
          <Route path="/women-safety" element={<WomenSafetyLaws />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

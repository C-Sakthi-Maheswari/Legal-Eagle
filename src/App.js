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
          <div className="options-row">
            <Link to="/text-recognition" className="option-card">
              <h2>Text Recognition</h2>
              <p>Recognize and simplify legal documents.</p>
            </Link>
            <Link to="/voice-translation" className="option-card">
              <h2>Voice Translation</h2>
              <p>Convert spoken words to text and translate.</p>
            </Link>
            <Link to="/historical-manuscripts" className="option-card">
              <h2>Historical Manuscripts</h2>
              <p>Read traditional handwritten texts.</p>
            </Link>
            <Link to="/women-safety" className="option-card">
              <h2>Women Safety Laws</h2>
              <p>Access essential laws for women’s safety.</p>
            </Link>
          </div>
        </main>

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
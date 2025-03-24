import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./NavBar";
import TextRecognition from "./TextRecognition";
import VoiceTranslation from "./VoiceTranslation";
import HistoricalManuscripts from "./HistoricalManuscripts";
import WomenSafetyLaws from "./WomenSafetyLaws";
import Home from "./Home.js";
import "./App.css";


function App() {
  return (
    <div>
      
      <Router>
      <Navbar />
      <Routes>
      <Route path="/home" element={<Home />} />
        <Route path="/text-recognition" element={<TextRecognition />} />
        <Route path="/voice-translation" element={<VoiceTranslation />} />
        <Route path="/historical-manuscripts" element={<HistoricalManuscripts />} />
        <Route path="/women-safety" element={<WomenSafetyLaws />} />
      </Routes>
    </Router>
    </div>
    
  );
}

export default App;
import React from 'react'
import "./Home.css";
// import legalDocBg from "./images/legal_docu_bg.jpg"
import { useNavigate } from "react-router-dom"; // Import useNavigate
function Home() {
    const navigate = useNavigate(); // Hook for navigation
  return (
    <div className="container">

        <div className="introduction-box">
            <h2>Welcome to</h2>
            <h2 className="legal-eagle">Legal Eagle</h2>

            </div>
            <p>Legal documents can be complex and overwhelming—but they don’t have to be. LegalEagle is your AI-powered assistant, transforming dense legal language into clear, simple, and accessible content.</p>
        
        <div className='card-boxes'>
            <div className="box">
                <h3 className="card-title">Document Simplification and Translation</h3>
                <p className="card-description">Easily simplify complex legal text and translate it into multiple languages with AI-powered accuracy.</p>
                <button className="card-btn" onClick={() => navigate("/text-recognition")}>try it now</button>
            </div>
            <div className="box">
                <h3 className="card-title">Speech Recognition and Translation</h3>
                <p className="card-description">Read out your legal documents, the text gets translated into multiple languages and also read aloud</p>
                <button className="card-btn" onClick={() => navigate("/voice-translation")}>try it now</button>
            </div>
            <div className="box">
                <h3 className="card-title">Tamil Documents Digitization</h3>
                <p className="card-description">Scan old crashed Tamil Documents and get the clear text extracted from them</p>
                <button className="card-btn" onClick={() => navigate("/historical-manuscripts")}>try it now</button>
            </div>
            <div className="box">
                <h3 className="card-title">Women Safety Chatbot</h3>
                <p className="card-description">Chat with us and get instant legal advice, essential laws and safety tips exclusively for women.</p>
                <button className="card-btn" onClick={() => navigate("/women-safety")}>try it now</button>
            </div>
        </div>
        
    </div>
  )
}

export default Home
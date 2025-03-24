import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import { Home, FileText, Mic, Bot, Languages } from 'lucide-react';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <img src="/your-logo.png" alt="Logo" className="logo-img" /> 
        </div>
        <h1 className="logo-text">Legal Eagle</h1>
      </div>
      <div className="navbar-right">
        <Link to="/home" className="nav-icon">
          <Home />
        </Link>
        <Link to="/text-recognition" className="nav-icon">
          <FileText />
        </Link>
        <Link to="/voice-translation" className="nav-icon">
          <Mic />
        </Link>
        <Link to="/historical-manuscripts" className="nav-icon">
          <Languages />
        </Link>
        <Link to="/women-safety" className="nav-icon">
          <Bot />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

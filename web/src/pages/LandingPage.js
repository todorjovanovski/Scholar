import React from 'react';
import { useNavigate } from 'react-router-dom';
import scholarLogo from '../assets/scholarLogo.png';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <img src={scholarLogo} alt="Scholar" className="logo" />
      <div className="button-container">
        <button className="button" onClick={() => navigate('/upload')}>
          Upload a PDF
        </button>
        <button className="button" onClick={() => navigate('/ask')}>
          Ask about FINKI
        </button>
      </div>
      <p className="description">
        Upload a PDF file that our chat bot can help you with or ask something about our faculty
      </p>
    </div>
  );
}

export default LandingPage; 
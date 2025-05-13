import React from 'react';
import { useNavigate } from 'react-router-dom';

function AskPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Ask about FINKI</h1>
      <div className="ask-section">
        {/* Question functionality will be added here */}
        <p>Question functionality coming soon...</p>
      </div>
      <button className="button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}

export default AskPage; 
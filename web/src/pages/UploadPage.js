import React from 'react';
import { useNavigate } from 'react-router-dom';

function UploadPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Upload PDF</h1>
      <div className="upload-section">
        {/* Upload functionality will be added here */}
        <p>Upload functionality coming soon...</p>
      </div>
      <button className="button" onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}

export default UploadPage; 
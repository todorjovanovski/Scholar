import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './Flashcard.css';

const Flashcard = ({ question, answer, onClose}) => {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>{question}</h3>
        <p>{answer}</p>
      </div>
    </div>,
    document.body
  );
};

export default Flashcard;

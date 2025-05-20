import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./AskPage.css";

function AskPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage = {
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // TODO: Replace with actual API call to your backend
      // This is where you'll send the user's message to your backend
      // and get the response based on the FINKI website data
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated delay

      const botMessage = {
        text: "I'm a placeholder response. Soon I'll be able to answer questions about FINKI using the website data!",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting response:", error);
      const errorMessage = {
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: "bot",
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="container">
      <h1>Ask about FINKI</h1>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-avatar">
                {message.sender === "user" ? "U" : "F"}
              </div>
              <div className="message-content">{message.text}</div>
            </div>
          ))}
          {isTyping && (
            <div className="message bot">
              <div className="message-avatar">F</div>
              <div className="typing-indicator">
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
                <div className="typing-dot"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input-container">
          <form onSubmit={handleSubmit} className="chat-input-form">
            <textarea
              className="chat-input"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask anything about FINKI..."
              rows={1}
            />
            <button type="submit" className="send-button">
              →
            </button>
          </form>
        </div>
      </div>
      <button className="button" onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  );
}

export default AskPage;

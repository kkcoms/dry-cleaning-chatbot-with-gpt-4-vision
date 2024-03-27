"use client";

import React, { useState } from 'react';
import Sandbox from './sandbox';
import ChatbotIcon from './ChatbotIcon';

// Inline styles
const chatbotWidgetStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  zIndex: 9999,
  cursor: 'pointer',
};

const chatbotIconStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  backgroundColor: '#007bff',
  padding: '20px',
  color: '#fff',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  animation: 'pulsate 2s infinite',
};

const chatbotIconTextStyle = {
  position: 'absolute',
  width: '100%',
  top: '80px',
  textAlign: 'center',
  fontSize: '14px',
  color: '#fff',
  pointerEvents: 'none',
};

const chatbotContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '450px',
  height: '700px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
  overflow: 'hidden',
};

const chatHeaderStyle = {
  padding: '16px',
  backgroundColor: '#f1f1f1',
  borderBottom: '1px solid #ddd',
  fontSize: '16px',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const minimizeButtonStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  display: 'flex',
};

const chatMessagesStyle = {
  overflowY: 'auto',
  padding: '16px',
};

const ChatbotWidget = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <div style={chatbotWidgetStyle}>
      {isChatbotOpen ? (
        <div style={chatbotContainerStyle}>
          {/* Chat header */}
          <div style={chatHeaderStyle}>
            🤖 Dry Cleaning Chatbot - AI Vision Powered
            <button onClick={toggleChatbot} style={minimizeButtonStyle}>
              {/* Minimize icon SVG */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          {/* Chat messages */}
          <div style={chatMessagesStyle}>
            <Sandbox />
          </div>
        </div>
      ) : (
        <div style={chatbotIconStyle} onClick={toggleChatbot} role="button" tabIndex="0" aria-label="Open chatbot">
          <ChatbotIcon />
          {/* <span style={chatbotIconTextStyle}>How can I assist you?</span> */}
        </div>
      )}
    </div>
  );
};

export default ChatbotWidget;
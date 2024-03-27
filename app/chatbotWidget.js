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
   
          <div style={chatMessagesStyle}>
            <Sandbox />
          </div>
    </div>
  );
};

export default ChatbotWidget;
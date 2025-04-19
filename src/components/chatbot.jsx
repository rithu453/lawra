import React, { useState, useEffect, useRef } from 'react';
import './chatbot1.css';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load messages from localStorage on initial render
  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('lawra-chat-history')) || [];
    
    if (savedMessages.length > 0) {
      // Convert timestamp strings back to Date objects
      const processedMessages = savedMessages.map(msg => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }));
      setMessages(processedMessages);
    } else {
      // Set welcome message if no history exists
      const welcomeMessage = {
        text: "Hello! I am LAWRA, your legal assistant for Indian law information. How can I help you today?",
        user: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      localStorage.setItem('lawra-chat-history', JSON.stringify([welcomeMessage]));
    }
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('lawra-chat-history', JSON.stringify(messages));
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim()) {
      const newMessage = { text: input, user: 'user', timestamp: new Date() };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInput('');
      setLoading(true);

      try {
        console.log('Sending message to backend...');
        const result = await axios.post(
          'http://127.0.0.1:8000/query',  // Use your backend URL
          { query: input },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        // Add short delay for UX
        setTimeout(() => {
          const botMessage = {
            text: result.data.response,  // Make sure this matches your backend response
            user: 'bot',
            timestamp: new Date(),
          };
          const updatedMessagesWithBot = [...updatedMessages, botMessage];
          setMessages(updatedMessagesWithBot);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error querying the backend:', error);
        const errorMessage = {
          text: 'Sorry, I encountered an error. Please try again later.',
          user: 'bot',
          timestamp: new Date(),
        };
        const updatedMessagesWithError = [...updatedMessages, errorMessage];
        setMessages(updatedMessagesWithError);
        setLoading(false);
      }
    }
  };

  // Clear chat history
  const clearHistory = () => {
    const welcomeMessage = {
      text: "Chat history cleared. How can I help you today?",
      user: 'bot',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    localStorage.setItem('lawra-chat-history', JSON.stringify([welcomeMessage]));
  };

  return (
    <div className="chatbot">
      <div className="chatbot-container">
        <main className="chatbot-main" style={{ width: '100%' }}>
          <header className="chatbot-header">
            <h2>LAWRA - Indian Legal Assistant</h2>
            <button className="clear-history-btn" onClick={clearHistory}>Clear History</button>
          </header>
          <div className="chat-window">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`chat-message ${message.user}`}>
                  <div className="message-text">{message.text}</div>
                  <span className="message-timestamp">{new Date(message.timestamp).toLocaleTimeString()}</span>
                </div>
              ))}
              {loading && (
                <div className="chat-message bot loading">
                  <div className="message-text">
                    <span className="typing-indicator">Thinking</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="chat-input">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !loading) {
                    handleSend();
                  }
                }}
                placeholder="Ask about Indian law..."
                disabled={loading}
              />
              <button onClick={handleSend} disabled={loading}>Send</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chatbot;

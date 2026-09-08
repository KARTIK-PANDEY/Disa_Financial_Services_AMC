import React, { useState, useRef, useEffect } from "react";
import { X, Send, Bot, Sparkles } from "lucide-react";
import "./ChatBot.css";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const ChatBot = () => {
  const { user } = useAuth();

  const API_URL = `${
    import.meta.env.VITE_API_URL || "http://localhost:5000"
  }/api/chat`;

  const suggestions = [
    "Calculate SIP",
    "Best Mutual Funds",
    "Stock Portfolio",
    "Contact Advisor",
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! 👋 I'm DISA AI Assistant. Ask me anything about Mutual Funds, SIPs, Stocks, Insurance, or Financial Planning.",
      sender: "bot",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const hasGreetedRef = useRef(false);

  const toggleChat = () => setIsOpen(!isOpen);

  // Welcome logged-in user
  useEffect(() => {
    if (isOpen && user && !hasGreetedRef.current) {
      setIsTyping(true);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text: `Welcome back, ${
              user.name || "User"
            }! 👋 How can I assist you with your investments today?`,
            sender: "bot",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          },
        ]);

        setIsTyping(false);
      }, 1000);

      hasGreetedRef.current = true;
    }
  }, [isOpen, user]);

  // Auto Scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Send message to Gemini
  const sendToGemini = async (question) => {
    setIsTyping(true);

    try {
      const response = await axios.post(API_URL, {
        message: question,
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.reply,
        sender: "bot",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      let errorMessage =
        "Sorry, DISA AI is currently unavailable. Please try again shortly.";

      if (error.response?.status === 503) {
        errorMessage =
          "DISA AI is experiencing high demand. Please try again in a few seconds.";
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: errorMessage,
          sender: "bot",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Send from input
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim() || isTyping) return;

    const userText = inputValue;

    const userMessage = {
      id: Date.now(),
      text: userText,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    await sendToGemini(userText);
  };

  // Send from suggestion chip
  const handleSuggestionClick = async (question) => {
    const userMessage = {
      id: Date.now(),
      text: question,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, userMessage]);
    await sendToGemini(question);
  };

  return (
    <div className={`chatbot-wrapper ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <div className="chatbot-window">

          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-title">
              <Bot size={32} className="bot-icon-main" />

              <div>
                <span>DISA AI Assistant</span>
                <small className="powered-by">
                  Powered by Gemini AI
                </small>
              </div>
            </div>

            <button
              onClick={toggleChat}
              className="chatbot-close-btn"
              aria-label="Close Chat"
            >
              <X size={24} />
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages">
            <div className="messages-container">

              {messages.map((msg) => (
                <div key={msg.id} className={`message ${msg.sender}`}>
                  {msg.text.split("\n").map((line, index) => (
                    <p key={index} className="message-line">
                      {line}
                    </p>
                  ))}

                  <small className="message-time">{msg.time}</small>
                </div>
              ))}

              {/* Suggestions shown only at beginning */}
              {messages.length === 1 && (
                <div className="chat-suggestions">
                  {suggestions.map((item) => (
                    <button
                      key={item}
                      className="suggestion-btn"
                      onClick={() => handleSuggestionClick(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}

              {/* Typing Animation */}
              {isTyping && (
                <div className="typing-indicator">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              )}

              <div ref={messagesEndRef}></div>
            </div>
          </div>

          {/* Input */}
          <form className="chatbot-input-area" onSubmit={handleSendMessage}>
            <div className="input-container">
              <input
                ref={inputRef}
                type="text"
                className="chatbot-input"
                placeholder="Ask about Mutual Funds, SIPs, Stocks..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <button
                type="submit"
                className="chatbot-send-btn"
                disabled={!inputValue.trim() || isTyping}
              >
                <Send size={22} />
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="chatbot-toggle-btn"
          aria-label="Open Chat"
        >
          <div className="btn-glow"></div>

          <div className="chatbot-btn-content">
            <Bot size={28} className="chatbot-btn-icon" />
            <span className="chatbot-btn-text">ASK DISA</span>
          </div>

          <Sparkles size={22} className="chatbot-btn-sparkle" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;
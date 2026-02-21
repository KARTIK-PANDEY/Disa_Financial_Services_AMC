import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import './ChatBot.css';
import { useAuth } from '../context/AuthContext';
import { findAnswer } from '../utils/chatbotData';

const ChatBot = () => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hello! checking our services? I'm Disa Assistant. How can I help you today?", sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const hasGreetedRef = useRef(false);

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen && user && !hasGreetedRef.current) {
            setIsTyping(true);
            setTimeout(() => {
                setMessages(prev => [
                    ...prev,
                    { id: Date.now(), text: `Welcome back, ${user.name || 'User'}! How can I assist you with your investments today?`, sender: 'bot' }
                ]);
                setIsTyping(false);
            }, 1000);
            hasGreetedRef.current = true;
        }
    }, [isOpen, user]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            text: inputValue,
            sender: 'user'
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponseText = findAnswer(userMessage.text);
            const botMessage = {
                id: Date.now() + 1,
                text: botResponseText,
                sender: 'bot'
            };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <div className={`chatbot-wrapper ${isOpen ? 'open' : ''}`}>
            {/* Chat Window */}
            {isOpen ? (
                <div className="chatbot-window">
                    <div className="chatbot-header">
                        <div className="chatbot-title">
                            <Bot size={32} className="bot-icon-main" />
                            <span>Disa <span>Assistant</span></span>
                        </div>
                        <button onClick={toggleChat} className="chatbot-close-btn" aria-label="Close Chat">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="chatbot-messages">
                        <div className="messages-container">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`message ${msg.sender}`}>
                                    {msg.text.split('\n').map((line, i) => (
                                        <React.Fragment key={i}>
                                            {line}
                                            {i < msg.text.split('\n').length - 1 && <br />}
                                        </React.Fragment>
                                    ))}
                                </div>
                            ))}
                            {isTyping && (
                                <div className="typing-indicator">
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                    <div className="typing-dot"></div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    <form className="chatbot-input-area" onSubmit={handleSendMessage}>
                        <div className="input-container">
                            <input
                                ref={inputRef}
                                type="text"
                                className="chatbot-input"
                                placeholder="Ask about Mutual Funds, SIPs, or our Team..."
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button type="submit" className="chatbot-send-btn" disabled={!inputValue.trim() || isTyping}>
                                <Send size={24} />
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                /* Toggle Button with Animation Layers */
                <button onClick={toggleChat} className="chatbot-toggle-btn" aria-label="Open Chat">
                    <div className="btn-glow"></div>
                    <Sparkles size={32} />
                    <Bot size={28} style={{ position: 'absolute', top: '15px', right: '15px', opacity: 0.3 }} />
                </button>
            )}
        </div>
    );
};

export default ChatBot;

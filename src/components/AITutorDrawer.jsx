import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Bot, X, Send, Sparkles, Code, CheckCircle, HelpCircle } from 'lucide-react';

export default function AITutorDrawer({ isOpen, onClose, topicTitle, codeSnippet }) {
  const { API_BASE } = useAuth();
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'ai',
      text: '👋 Hello! I am your AI Doubts Assistant. Ask me anything about C, C++, Python, JavaScript, Java, or SQL from base to advanced concepts!'
    }
  ]);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;

    const userText = question;
    setChatHistory(prev => [...prev, { sender: 'user', text: userText }]);
    setQuestion('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/ai/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userText,
          topicTitle: topicTitle || 'General Programming',
          codeSnippet
        })
      });
      const data = await res.json();
      setChatHistory(prev => [...prev, { sender: 'ai', text: data.answer || 'Topic guidance provided!' }]);
    } catch (err) {
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `💡 **AI Explanation (Offline Mode)**:\n\nGreat question! In programming, always break the problem down into standard steps:\n1. Declare variables with correct scope.\n2. Apply loops or conditional branches.\n3. Verify execution logic with test inputs.`
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    'Explain Pointers & Memory in C/C++',
    'What is the difference between Array and Vector?',
    'How do Python decorators work?',
    'Explain Object Oriented Programming Pillars'
  ];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'flex-end',
      background: 'rgba(0, 0, 0, 0.6)',
      backdropFilter: 'blur(4px)'
    }}>
      <div style={{
        width: '450px',
        maxWidth: '90vw',
        height: '100vh',
        background: '#0d1322',
        borderLeft: '1px solid rgba(139, 92, 246, 0.3)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.8)',
        animation: 'fadeIn 0.2s ease forwards'
      }}>
        {/* Drawer Header */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          background: 'rgba(15, 23, 42, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Bot size={20} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                AI Doubts Tutor <Sparkles size={14} color="#c084fc" />
              </h3>
              <span style={{ fontSize: '11px', color: '#94a3b8' }}>
                {topicTitle ? `Topic: ${topicTitle}` : 'Interactive Doubts Solver'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: '6px'
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Body */}
        <div style={{
          flex: 1,
          padding: '20px',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {chatHistory.map((msg, idx) => (
            <div
              key={idx}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                background: msg.sender === 'user'
                  ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
                  : 'rgba(30, 41, 59, 0.9)',
                border: msg.sender === 'user'
                  ? 'none'
                  : '1px solid rgba(255, 255, 255, 0.1)',
                padding: '14px 16px',
                borderRadius: msg.sender === 'user' ? '16px 16px 2px 16px' : '16px 16px 16px 2px',
                color: '#f8fafc',
                fontSize: '13px',
                whiteSpace: 'pre-line',
                lineHeight: '1.6'
              }}
            >
              {msg.text}
            </div>
          ))}

          {loading && (
            <div style={{
              alignSelf: 'flex-start',
              background: 'rgba(30, 41, 59, 0.9)',
              padding: '12px 16px',
              borderRadius: '16px 16px 16px 2px',
              color: '#c084fc',
              fontSize: '13px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Sparkles className="pulsing-glow" size={16} />
              AI is analyzing concepts & generating response...
            </div>
          )}
        </div>

        {/* Suggested Quick Doubts */}
        <div style={{ padding: '0 20px', marginBottom: '10px' }}>
          <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', marginBottom: '6px' }}>
            SUGGESTED DOUBTS:
          </div>
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => setQuestion(q)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '6px',
                  padding: '4px 8px',
                  fontSize: '11px',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          style={{
            padding: '16px 20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            background: 'rgba(15, 23, 42, 0.9)',
            display: 'flex',
            gap: '10px'
          }}
        >
          <input
            type="text"
            className="glass-input"
            placeholder="Ask AI your programming doubt..."
            value={question}
            onChange={e => setQuestion(e.target.value)}
          />
          <button
            type="submit"
            className="btn-primary"
            style={{ padding: '0 16px', flexShrink: 0 }}
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}

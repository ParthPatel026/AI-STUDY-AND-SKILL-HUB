import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Terminal, Lock, Mail, User, GraduationCap, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function AuthPage({ onAuthSuccess }) {
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState('Government Engineering College');
  const [department, setDepartment] = useState('Computer Science & Engineering');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    let result;
    if (isLogin) {
      result = await login(email, password);
    } else {
      if (!name || !email || !password) {
        setError('Please fill in all required fields.');
        setLoading(false);
        return;
      }
      result = await register(name, email, password, college, department);
    }

    setLoading(false);
    if (result.success) {
      if (onAuthSuccess) onAuthSuccess();
    } else {
      setError(result.error || 'Authentication failed.');
    }
  };

  const handleDemoFill = () => {
    setEmail('student@college.edu');
    setPassword('password123');
    setName('Alex Developer');
    setIsLogin(true);
  };

  return (
    <div style={{
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      position: 'relative'
    }}>
      <div style={{
        width: '1000px',
        maxWidth: '100%',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '0',
        background: 'rgba(13, 19, 34, 0.9)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)'
      }}>
        {/* Left Side: Code/Study Branding Panel */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px',
              boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)'
            }}>
              <Terminal size={26} color="#fff" />
            </div>

            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#fff', marginBottom: '12px', lineHeight: '1.2' }}>
              AI Study & Skill Hub
            </h2>
            <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '32px' }}>
              Comprehensive learning portal designed for college students. Master C, C++, Python, JavaScript, Java & SQL from Base to Advanced with AI doubt resolution and live coding tests.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Topic-wise Base to Advance Learning Roadmaps',
                'Embedded Course Video Lectures for each topic',
                'Skill Testing Platform with instant test cases evaluation',
                'AI Doubts Solver available 24/7'
              ].map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e1', fontSize: '13px' }}>
                  <CheckCircle2 size={18} color="#10b981" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            marginTop: '40px',
            padding: '14px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px border rgba(99, 102, 241, 0.3)',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ fontSize: '12px', color: '#c7d2fe' }}>
              <strong>Demo Presentation Account:</strong><br />
              student@college.edu / password123
            </div>
            <button
              onClick={handleDemoFill}
              style={{
                background: '#6366f1',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Autofill
            </button>
          </div>
        </div>

        {/* Right Side: Auth Form */}
        <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Tab Switcher */}
          <div style={{
            display: 'flex',
            background: 'rgba(15, 23, 42, 0.8)',
            borderRadius: '12px',
            padding: '4px',
            marginBottom: '28px'
          }}>
            <button
              type="button"
              onClick={() => { setIsLogin(true); setError(''); }}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                borderRadius: '8px',
                background: isLogin ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'transparent',
                color: isLogin ? '#fff' : '#94a3b8',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setIsLogin(false); setError(''); }}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                borderRadius: '8px',
                background: !isLogin ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' : 'transparent',
                color: !isLogin ? '#fff' : '#94a3b8',
                fontWeight: '600',
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Register Account
            </button>
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', marginBottom: '6px' }}>
            {isLogin ? 'Welcome Back, Student!' : 'Create Student Account'}
          </h3>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>
            {isLogin ? 'Sign in to track your skill tests & course progress.' : 'Register to start learning languages & testing code.'}
          </p>

          {error && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#fca5a5',
              padding: '10px 14px',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '18px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {!isLogin && (
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                  Full Student Name
                </label>
                <input
                  type="text"
                  className="glass-input"
                  placeholder="e.g. Alex Sharma"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                />
              </div>
            )}

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                className="glass-input"
                placeholder="student@college.edu"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                Password
              </label>
              <input
                type="password"
                className="glass-input"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {!isLogin && (
              <>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    College / Institute Name
                  </label>
                  <input
                    type="text"
                    className="glass-input"
                    placeholder="Government Engineering College"
                    value={college}
                    onChange={e => setCollege(e.target.value)}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '600', color: '#cbd5e1', marginBottom: '6px' }}>
                    Department / Branch
                  </label>
                  <input
                    type="text"
                    className="glass-input"
                    placeholder="Computer Science & Engineering"
                    value={department}
                    onChange={e => setDepartment(e.target.value)}
                  />
                </div>
              </>
            )}

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
              style={{ marginTop: '8px', padding: '14px', fontSize: '15px' }}
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In to Dashboard' : 'Complete Registration')}
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

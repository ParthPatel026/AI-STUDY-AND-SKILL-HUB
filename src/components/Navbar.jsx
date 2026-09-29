import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Terminal, LayoutDashboard, BookOpen, Code, User, LogOut, Bot, Sparkles, ExternalLink } from 'lucide-react';

export default function Navbar({ activePage, setActivePage, onOpenAITutor, onOpenRandomAnchor }) {
  const { user, logout } = useAuth();

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'learn', label: 'Learn Phase (Languages)', icon: BookOpen },
    { id: 'coding', label: 'Skill Testing Platform', icon: Code },
    { id: 'profile', label: 'Student Profile', icon: User }
  ];

  return (
    <header style={{
      background: 'rgba(9, 13, 22, 0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'sticky',
      top: 0,
      zIndex: 40,
      padding: '0 24px'
    }}>
      <div style={{
        maxContent: '1400px',
        margin: '0 auto',
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand Logo */}
        <div
          onClick={() => setActivePage('dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)'
          }}>
            <Terminal size={22} color="#ffffff" />
          </div>
          <div>
            <h1 style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '-0.5px', color: '#fff', margin: 0 }}>
              AI STUDY & SKILL HUB
            </h1>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
              College Minor Project • Base to Advance
            </span>
          </div>
        </div>

        {/* Center Nav Links */}
        <nav style={{ display: 'flex', gap: '8px' }}>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  border: 'none',
                  background: isActive ? 'rgba(99, 102, 241, 0.18)' : 'transparent',
                  color: isActive ? '#818cf8' : '#94a3b8',
                  fontWeight: isActive ? '600' : '500',
                  fontSize: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  borderBottom: isActive ? '2px solid #6366f1' : '2px solid transparent'
                }}
              >
                <Icon size={16} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Random Anchor Trigger */}
          <button
            onClick={onOpenRandomAnchor}
            title="Open Random Anchor / External Resource"
            style={{
              background: 'rgba(6, 182, 212, 0.12)',
              color: '#06b6d4',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ExternalLink size={14} />
            Random Anchor Tag
          </button>

          {/* AI Tutor Assistant Trigger */}
          <button
            onClick={onOpenAITutor}
            style={{
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(99, 102, 241, 0.2) 100%)',
              color: '#c084fc',
              border: '1px solid rgba(139, 92, 246, 0.4)',
              borderRadius: '10px',
              padding: '8px 14px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Bot size={16} />
            <Sparkles size={12} />
            AI Doubts Solver
          </button>

          {/* User Profile / Auth Action */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '8px' }}>
              <div style={{
                textAlign: 'right',
                display: 'none',
                '@media(min-width: 900px)': { display: 'block' }
              }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: '#f8fafc' }}>{user.name}</div>
                <div style={{ fontSize: '11px', color: '#10b981' }}>Score: {user.totalScore || 0} pts</div>
              </div>
              <button
                onClick={logout}
                title="Log Out"
                style={{
                  background: 'rgba(239, 68, 68, 0.12)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: '10px',
                  padding: '8px',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setActivePage('auth')}
              className="btn-primary"
              style={{ padding: '8px 16px', fontSize: '13px' }}
            >
              Sign In / Register
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

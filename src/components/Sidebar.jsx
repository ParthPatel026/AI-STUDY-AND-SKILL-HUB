import React from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Flame, Award, BookOpen, ExternalLink, RefreshCw, Zap, Layers,
  Terminal, Code2, Cpu, Database, FileCode
} from 'lucide-react';

export default function Sidebar({ activePage, setActivePage, setSelectedLanguage, onOpenRandomAnchor }) {
  const { user } = useAuth();

  const languages = [
    { id: 'c', name: 'C Programming', icon: FileCode, count: '5 Topics', color: '#3b82f6' },
    { id: 'cpp', name: 'C++ Modern', icon: Code2, count: '4 Topics', color: '#8b5cf6' },
    { id: 'python', name: 'Python 3', icon: Terminal, count: '6 Topics', color: '#f59e0b' },
    { id: 'javascript', name: 'JS & React', icon: Layers, count: '5 Topics', color: '#06b6d4' },
    { id: 'java', name: 'Java OOP', icon: Cpu, count: '4 Topics', color: '#ef4444' },
    { id: 'sql', name: 'SQL & DB', icon: Database, count: '3 Topics', color: '#10b981' }
  ];

  return (
    <aside style={{
      width: '260px',
      background: 'rgba(13, 19, 34, 0.75)',
      backdropFilter: 'blur(12px)',
      borderRight: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '24px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      minHeight: 'calc(100vh - 70px)'
    }}>
      {/* Student Progress Badge Card */}
      {user && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '14px',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase' }}>
              Student Streak
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontWeight: '700', fontSize: '13px' }}>
              <Flame size={16} />
              {user.streak || 5} Days
            </div>
          </div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: '#f8fafc', marginBottom: '4px' }}>
            {user.name}
          </div>
          <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '12px' }}>
            {user.college || 'College CSE Dept'}
          </div>

          <div style={{
            background: 'rgba(0,0,0,0.3)',
            borderRadius: '8px',
            height: '6px',
            width: '100%',
            overflow: 'hidden',
            marginBottom: '6px'
          }}>
            <div style={{
              height: '100%',
              width: `${Math.min(100, ((user.completedTopics?.length || 0) / 10) * 100)}%`,
              background: 'linear-gradient(90deg, #6366f1, #06b6d4)'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94a3b8' }}>
            <span>{user.completedTopics?.length || 0} Completed</span>
            <span style={{ color: '#10b981' }}>{user.totalScore || 0} Points</span>
          </div>
        </div>
      )}

      {/* Quick Language Selector */}
      <div>
        <div style={{
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          color: '#64748b',
          marginBottom: '12px',
          paddingLeft: '8px'
        }}>
          Learn Languages
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {languages.map(lang => {
            const Icon = lang.icon;
            return (
              <button
                key={lang.id}
                onClick={() => {
                  if (setSelectedLanguage) setSelectedLanguage(lang.id);
                  setActivePage('learn');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  textAlign: 'left',
                  fontSize: '13px',
                  fontWeight: '500',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Icon size={16} color={lang.color} />
                  <span>{lang.name}</span>
                </div>
                <span style={{ fontSize: '10px', background: 'rgba(255,255,255,0.06)', padding: '2px 6px', borderRadius: '4px', color: '#94a3b8' }}>
                  {lang.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* College Requirement: Random Anchor Widget */}
      <div style={{
        marginTop: 'auto',
        background: 'rgba(6, 182, 212, 0.08)',
        border: '1px dashed rgba(6, 182, 212, 0.3)',
        borderRadius: '12px',
        padding: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#06b6d4', fontWeight: '700', fontSize: '12px', marginBottom: '6px' }}>
          <Zap size={14} />
          <span>Random Anchor Resource</span>
        </div>
        <p style={{ fontSize: '11px', color: '#94a3b8', lineHeight: '1.4', marginBottom: '10px' }}>
          Explore external developer docs, video anchors, and official references.
        </p>
        <button
          onClick={onOpenRandomAnchor}
          style={{
            width: '100%',
            background: 'rgba(6, 182, 212, 0.15)',
            color: '#38bdf8',
            border: '1px solid rgba(6, 182, 212, 0.4)',
            borderRadius: '8px',
            padding: '8px',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
        >
          <ExternalLink size={14} />
          Get Random Anchor
        </button>
      </div>
    </aside>
  );
}

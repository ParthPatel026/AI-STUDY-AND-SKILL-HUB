import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles, Award, PlayCircle, Code, ArrowRight, Flame, BookOpen, ExternalLink,
  CheckCircle2, Terminal, Code2, Layers, Database, Cpu, FileCode
} from 'lucide-react';

export default function DashboardPage({ setActivePage, setSelectedLanguage, onOpenRandomAnchor }) {
  const { user, API_BASE } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/courses`)
      .then(res => res.json())
      .then(data => setCourses(data.courses || []))
      .catch(() => {
        // Fallback local courses if server not running
        setCourses([
          { id: 'c', title: 'C Programming', subtitle: 'Procedural & Memory', icon: 'FileCode', badge: 'Foundation', description: 'Master pointers, arrays, memory management, and C syntax.' },
          { id: 'cpp', title: 'C++ Modern', subtitle: 'OOP & STL Vectors', icon: 'Code2', badge: 'OOP', description: 'Master classes, inheritance, templates, and STL vectors.' },
          { id: 'python', title: 'Python 3', subtitle: 'Data & AI Logic', icon: 'Terminal', badge: 'AI Favorite', description: 'Learn Python data structures, functions, decorators, and OOP.' },
          { id: 'javascript', title: 'JS & React', subtitle: 'Web Stack', icon: 'Layers', badge: 'Web Tech', description: 'Learn ES6+, Promises, Async/Await, and React JSX.' },
          { id: 'java', title: 'Java OOP', subtitle: 'Enterprise Java', icon: 'Cpu', badge: 'Enterprise', description: 'Classes, Collections, JVM architecture, and multithreading.' },
          { id: 'sql', title: 'SQL & DB', subtitle: 'Relational Queries', icon: 'Database', badge: 'Data Stack', description: 'Queries, JOINs, GROUP BY, indexes, and database schemas.' }
        ]);
      })
      .finally(() => setLoading(false));
  }, [API_BASE]);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'FileCode': return FileCode;
      case 'Code2': return Code2;
      case 'Terminal': return Terminal;
      case 'Layers': return Layers;
      case 'Cpu': return Cpu;
      case 'Database': return Database;
      default: return Code;
    }
  };

  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '28px' }} className="animate-fade-in">
      {/* Top Banner: Student Welcome & Stats */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.95) 100%)',
        border: '1px solid rgba(99, 102, 241, 0.3)',
        borderRadius: '20px',
        padding: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ zIndex: 2, maxWidth: '650px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="badge-tag badge-base" style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>
              Student Portal Dashboard
            </span>
            <span style={{ color: '#94a3b8', fontSize: '13px' }}>• {user?.college || 'College of Computer Science'}</span>
          </div>

          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', marginBottom: '8px', letterSpacing: '-0.5px' }}>
            Welcome back, {user?.name || 'Student'}! 👋
          </h2>
          <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6', marginBottom: '24px' }}>
            Ready to study programming languages? Select a language course below to explore topic-wise lessons from Base to Advance with embedded video lectures and AI doubt assistance.
          </p>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => setActivePage('learn')}
              className="btn-primary"
            >
              <BookOpen size={18} />
              Start Learn Phase
            </button>
            <button
              onClick={() => setActivePage('coding')}
              className="btn-secondary"
            >
              <Code size={18} color="#06b6d4" />
              Test Coding Skills
            </button>
          </div>
        </div>

        {/* Quick Stat Counter Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', zIndex: 2 }}>
          <div className="glass-card" style={{ padding: '16px 20px', textAlign: 'center', minWidth: '130px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#10b981', marginBottom: '4px' }}>
              <CheckCircle2 size={18} />
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#fff' }}>
                {user?.completedTopics?.length || 0}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>Topics Completed</span>
          </div>

          <div className="glass-card" style={{ padding: '16px 20px', textAlign: 'center', minWidth: '130px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#f59e0b', marginBottom: '4px' }}>
              <Flame size={18} />
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#fff' }}>
                {user?.streak || 5}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>Day Streak</span>
          </div>

          <div className="glass-card" style={{ padding: '16px 20px', textAlign: 'center', minWidth: '130px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#8b5cf6', marginBottom: '4px' }}>
              <Award size={18} />
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#fff' }}>
                {user?.totalScore || 0}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>Total Points</span>
          </div>

          <div className="glass-card" style={{ padding: '16px 20px', textAlign: 'center', minWidth: '130px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', color: '#06b6d4', marginBottom: '4px' }}>
              <Sparkles size={18} />
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#fff' }}>
                {user?.badges?.length || 1}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>Badges Earned</span>
          </div>
        </div>
      </div>

      {/* College Requirement: Random Anchor Link Banner */}
      <div style={{
        background: 'rgba(6, 182, 212, 0.08)',
        border: '1px solid rgba(6, 182, 212, 0.3)',
        borderRadius: '16px',
        padding: '18px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'rgba(6, 182, 212, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#06b6d4'
          }}>
            <ExternalLink size={18} />
          </div>
          <div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#fff', margin: 0 }}>
              Random Anchor Link & External Documentation Tag
            </h4>
            <p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>
              College project feature: Generate randomized learning resource anchor links across MDN, C++ reference, Python docs & tutorials.
            </p>
          </div>
        </div>

        <button
          onClick={onOpenRandomAnchor}
          className="btn-secondary"
          style={{ border: '1px solid #06b6d4', color: '#38bdf8' }}
        >
          Open Anchor Tag
        </button>
      </div>

      {/* Language Selection Grid (Learn Phase Entry) */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#fff', margin: 0 }}>
              Programming Language Courses
            </h3>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>
              Select any language to study Base, Intermediate, and Advanced topics with embedded video lectures.
            </span>
          </div>
          <button
            onClick={() => { setSelectedLanguage('all'); setActivePage('learn'); }}
            style={{ background: 'transparent', border: 'none', color: '#818cf8', fontWeight: '600', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            View All Courses <ArrowRight size={14} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
          {courses.map(course => {
            const Icon = getIcon(course.icon);
            return (
              <div
                key={course.id}
                className="glass-card"
                onClick={() => {
                  setSelectedLanguage(course.id);
                  setActivePage('learn');
                }}
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '12px',
                      background: 'rgba(99, 102, 241, 0.15)',
                      border: '1px solid rgba(99, 102, 241, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#818cf8'
                    }}>
                      <Icon size={22} />
                    </div>
                    <span className="badge-tag badge-base">{course.badge || 'Base to Advance'}</span>
                  </div>

                  <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '4px' }}>
                    {course.title}
                  </h4>
                  <div style={{ fontSize: '12px', color: '#06b6d4', fontWeight: '600', marginBottom: '10px' }}>
                    {course.subtitle}
                  </div>
                  <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', marginBottom: '20px' }}>
                    {course.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '14px',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)'
                }}>
                  <span style={{ fontSize: '12px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <PlayCircle size={14} /> Embedded Video Courses
                  </span>
                  <span style={{ fontSize: '12px', color: '#6366f1', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Explore Topics <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

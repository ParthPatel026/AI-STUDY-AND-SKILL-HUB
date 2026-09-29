import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { ExternalLink, RefreshCw, X, Bookmark, Zap, Compass } from 'lucide-react';

export default function RandomAnchorModal({ isOpen, onClose }) {
  const { API_BASE } = useAuth();
  const [anchor, setAnchor] = useState(null);
  const [allAnchors, setAllAnchors] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRandomAnchor = () => {
    setLoading(true);
    fetch(`${API_BASE}/resources/random`)
      .then(res => res.json())
      .then(data => {
        setAnchor(data.randomAnchor);
        setAllAnchors(data.allAnchors || []);
      })
      .catch(() => {
        // Local fallback
        const fallbackAnchors = [
          {
            id: 'anc_1',
            title: 'MDN Web Docs - JavaScript & Web APIs',
            category: 'Web Docs',
            url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
            description: 'The premier reference for JavaScript syntax, arrays, objects, and DOM manipulation.'
          },
          {
            id: 'anc_2',
            title: 'cppreference.com - Standard Template Library',
            category: 'C++ Reference',
            url: 'https://en.cppreference.com/w/',
            description: 'Complete documentation for C++ vectors, maps, memory allocators, and algorithms.'
          },
          {
            id: 'anc_3',
            title: 'Python 3.12 Standard Library Official Docs',
            category: 'Python',
            url: 'https://docs.python.org/3/',
            description: 'Official Python syntax guides, module references, and tutorials.'
          },
          {
            id: 'anc_4',
            title: 'GeeksforGeeks Data Structures & Algorithms',
            category: 'CS Core',
            url: 'https://www.geeksforgeeks.org/data-structures/',
            description: 'Comprehensive tutorials on Arrays, Linked Lists, Trees, and Dynamic Programming.'
          }
        ];
        const rIdx = Math.floor(Math.random() * fallbackAnchors.length);
        setAnchor(fallbackAnchors[rIdx]);
        setAllAnchors(fallbackAnchors);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (isOpen) fetchRandomAnchor();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 110,
      background: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '550px',
        maxWidth: '100%',
        background: '#0d1322',
        border: '1px solid rgba(6, 182, 212, 0.4)',
        borderRadius: '20px',
        padding: '28px',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9)',
        position: 'relative',
        animation: 'fadeIn 0.25s ease forwards'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'rgba(6, 182, 212, 0.15)',
            border: '1px solid rgba(6, 182, 212, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#06b6d4'
          }}>
            <Compass size={22} />
          </div>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', margin: 0 }}>
              Random Anchor & Resource Tag
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Randomized developer documentation & reference link generator
            </span>
          </div>
        </div>

        {/* Selected Anchor Display Box */}
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#06b6d4' }}>
            Selecting random anchor link...
          </div>
        ) : anchor ? (
          <div style={{
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.9) 0%, rgba(15, 23, 42, 0.9) 100%)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="badge-tag badge-base" style={{ textTransform: 'uppercase', fontSize: '10px' }}>
                {anchor.category || 'External Reference'}
              </span>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Random Selection ID: {anchor.id}</span>
            </div>

            <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#f8fafc', marginBottom: '8px' }}>
              {anchor.title}
            </h4>

            <p style={{ fontSize: '13px', color: '#94a3b8', lineHeight: '1.5', marginBottom: '16px' }}>
              {anchor.description}
            </p>

            {/* THE ACTUAL RANDOM ANCHOR TAG */}
            <a
              href={anchor.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)',
                color: '#ffffff',
                textDecoration: 'none',
                padding: '10px 18px',
                borderRadius: '10px',
                fontWeight: '600',
                fontSize: '13px',
                boxShadow: '0 4px 14px rgba(6, 182, 212, 0.3)'
              }}
            >
              <ExternalLink size={16} />
              Open External Anchor Link ({anchor.url.replace('https://', '').split('/')[0]})
            </a>
          </div>
        ) : null}

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between' }}>
          <button
            onClick={fetchRandomAnchor}
            className="btn-secondary"
            style={{ width: '100%' }}
          >
            <RefreshCw size={16} />
            Generate Another Anchor Tag
          </button>
        </div>
      </div>
    </div>
  );
}

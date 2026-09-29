import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Award, GraduationCap, Flame, CheckCircle2, ShieldCheck, Mail, BookOpen } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div style={{ padding: '60px', textAlign: 'center', color: '#cbd5e1' }}>
        Please sign in to view your student profile stats.
      </div>
    );
  }

  const allBadges = [
    { title: 'New Explorer', desc: 'Registered account on AI Study Hub', icon: ShieldCheck, color: '#06b6d4' },
    { title: 'Fast Learner', desc: 'Completed 3 topic lectures', icon: BookOpen, color: '#6366f1' },
    { title: 'Code Scholar', desc: 'Completed 7 topic lectures', icon: GraduationCap, color: '#10b981' },
    { title: 'Challenge Crusher', desc: 'Submitted & passed coding test challenge', icon: Award, color: '#f59e0b' }
  ];

  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Student Profile Card Header */}
      <div className="glass-card" style={{ padding: '32px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '32px',
          fontWeight: '800',
          boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)'
        }}>
          {user.name ? user.name.charAt(0).toUpperCase() : 'S'}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: 0 }}>
              {user.name}
            </h2>
            <span className="badge-tag badge-base">{user.level || 'Intermediate Learner'}</span>
          </div>

          <div style={{ display: 'flex', gap: '20px', color: '#cbd5e1', fontSize: '13px', marginTop: '6px', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Mail size={14} color="#06b6d4" /> {user.email}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <GraduationCap size={14} color="#6366f1" /> {user.college || 'College of Engineering'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Award size={14} color="#10b981" /> Dept: {user.department || 'Computer Science'}
            </span>
          </div>
        </div>
      </div>

      {/* Badges & Achievements Section */}
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Award size={20} color="#f59e0b" /> Earned Student Badges & Milestones
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
          {allBadges.map((badge, idx) => {
            const Icon = badge.icon;
            const isUnlocked = user.badges?.includes(badge.title) || idx === 0;
            return (
              <div
                key={idx}
                className="glass-card"
                style={{
                  padding: '20px',
                  opacity: isUnlocked ? 1 : 0.4,
                  border: isUnlocked ? `1px solid ${badge.color}` : '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: `${badge.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: badge.color
                  }}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#fff', margin: 0 }}>
                      {badge.title}
                    </h4>
                    <span style={{ fontSize: '10px', color: isUnlocked ? '#10b981' : '#64748b', fontWeight: '600' }}>
                      {isUnlocked ? 'UNLOCKED BADGE' : 'LOCKED'}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.4', margin: 0 }}>
                  {badge.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

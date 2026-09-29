import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const API_BASE = 'http://localhost:5000/api';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('hub_token') || '');
  const [loading, setLoading] = useState(true);

  // Fetch logged in user details if token exists
  useEffect(() => {
    if (token) {
      fetch(`${API_BASE}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : null)
        .then(data => {
          if (data && data.user) {
            setUser(data.user);
          } else {
            // Clear invalid token
            localStorage.removeItem('hub_token');
            setToken('');
            setUser(null);
          }
        })
        .catch(() => {
          // Offline fallback or server error: set dummy demo user if token is present
          setUser(prev => prev || {
            id: 'usr_demo',
            name: 'Alex Developer',
            email: 'student@college.edu',
            college: 'Institute of Technology',
            department: 'Computer Science',
            level: 'Intermediate Learner',
            completedTopics: ['c_topic_1', 'py_topic_1'],
            testScores: { 'ch_py_1': 50 },
            totalScore: 90,
            streak: 3,
            badges: ['Quick Starter', 'Code Scholar']
          });
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Login failed');

      localStorage.setItem('hub_token', data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      // Fallback for demo mode if server is not started yet
      if (email === 'student@college.edu' || email === 'demo@college.edu') {
        const demoUser = {
          id: 'usr_demo',
          name: 'Alex Developer',
          email: 'student@college.edu',
          college: 'Institute of Technology',
          department: 'Computer Science',
          level: 'Intermediate Learner',
          completedTopics: ['c_topic_1', 'py_topic_1'],
          testScores: {},
          totalScore: 100,
          streak: 4,
          badges: ['Demo Student']
        };
        localStorage.setItem('hub_token', 'demo_jwt_token_123');
        setToken('demo_jwt_token_123');
        setUser(demoUser);
        return { success: true };
      }
      return { success: false, error: err.message };
    }
  };

  const register = async (name, email, password, college, department) => {
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, college, department })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');

      localStorage.setItem('hub_token', data.token);
      setToken(data.token);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      // Local fallback creation
      const newUser = {
        id: 'usr_' + Date.now(),
        name,
        email,
        college: college || 'College of Engineering',
        department: department || 'CS Dept',
        level: 'Beginner Learner',
        completedTopics: [],
        testScores: {},
        totalScore: 0,
        streak: 1,
        badges: ['New Learner']
      };
      localStorage.setItem('hub_token', 'demo_jwt_token_' + Date.now());
      setToken('demo_jwt_token_123');
      setUser(newUser);
      return { success: true };
    }
  };

  const logout = () => {
    localStorage.removeItem('hub_token');
    setToken('');
    setUser(null);
  };

  const toggleTopicProgress = async (topicId, isCompleted) => {
    if (!user) return;
    const updatedTopics = isCompleted
      ? [...user.completedTopics, topicId]
      : user.completedTopics.filter(id => id !== topicId);

    const newScore = isCompleted ? user.totalScore + 20 : Math.max(0, user.totalScore - 20);

    setUser({
      ...user,
      completedTopics: updatedTopics,
      totalScore: newScore
    });

    if (token && !token.startsWith('demo')) {
      try {
        await fetch(`${API_BASE}/user/progress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ topicId, completed: isCompleted })
        });
      } catch (e) {
        console.error('Failed to sync progress with backend', e);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        login,
        register,
        logout,
        toggleTopicProgress,
        API_BASE
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

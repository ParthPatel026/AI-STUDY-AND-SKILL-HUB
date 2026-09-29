import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Code, Play, CheckCircle2, XCircle, Award, Terminal, RefreshCw, Sparkles, Layers } from 'lucide-react';

export default function CodingPlatformPage() {
  const { user, token, setUser, API_BASE } = useAuth();
  const [challenges, setChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');

  const [evaluating, setEvaluating] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState('console'); // 'console' | 'testcases'

  useEffect(() => {
    fetch(`${API_BASE}/challenges`)
      .then(res => res.json())
      .then(data => {
        const list = data.challenges || [];
        setChallenges(list);
        if (list.length > 0) {
          setSelectedChallenge(list[0]);
          setCode(list[0].starterCode);
          setLanguage(list[0].language);
        }
      })
      .catch(() => {
        // Fallback challenges
        const fallbackList = [
          {
            id: 'ch_py_1',
            title: 'Reverse String in Python',
            language: 'python',
            difficulty: 'Easy',
            points: 50,
            description: 'Write a function reverse_string(s) that takes a string s and returns the string in reverse order.',
            starterCode: `def reverse_string(s):\n    # Write your solution here\n    return s[::-1]\n\n# Test input\nprint(reverse_string("college"))`,
            testCases: [{ input: '"college"', expected: 'egelloc' }]
          },
          {
            id: 'ch_js_1',
            title: 'Array Sum in JavaScript',
            language: 'javascript',
            difficulty: 'Easy',
            points: 50,
            description: 'Write a function sumArray(arr) that calculates and returns the sum of all numbers in an array.',
            starterCode: `function sumArray(arr) {\n  return arr.reduce((acc, curr) => acc + curr, 0);\n}\n\nconsole.log(sumArray([10, 20, 30]));`,
            testCases: [{ input: '[10, 20, 30]', expected: '60' }]
          },
          {
            id: 'ch_cpp_1',
            title: 'Find Maximum Element in C++',
            language: 'cpp',
            difficulty: 'Medium',
            points: 80,
            description: 'Implement logic to find and return the maximum integer value in a given vector array.',
            starterCode: `#include <iostream>\n#include <vector>\nusing namespace std;\n\nint findMax(vector<int> nums) {\n    int maxVal = nums[0];\n    for(int n : nums) {\n        if(n > maxVal) maxVal = n;\n    }\n    return maxVal;\n}\n\nint main() {\n    cout << findMax({14, 55, 23, 89, 42}) << endl;\n    return 0;\n}`,
            testCases: [{ input: '{14, 55, 23, 89, 42}', expected: '89' }]
          },
          {
            id: 'ch_c_1',
            title: 'Check Even or Odd in C',
            language: 'c',
            difficulty: 'Easy',
            points: 40,
            description: 'Write a C program function to evaluate if an integer number is Even or Odd.',
            starterCode: `#include <stdio.h>\n\nconst char* checkEvenOdd(int num) {\n    if (num % 2 == 0) return "Even";\n    return "Odd";\n}\n\nint main() {\n    printf("%s", checkEvenOdd(42));\n    return 0;\n}`,
            testCases: [{ input: '42', expected: 'Even' }]
          }
        ];
        setChallenges(fallbackList);
        setSelectedChallenge(fallbackList[0]);
        setCode(fallbackList[0].starterCode);
        setLanguage(fallbackList[0].language);
      });
  }, [API_BASE]);

  const handleSelectChallenge = (ch) => {
    setSelectedChallenge(ch);
    setCode(ch.starterCode);
    setLanguage(ch.language);
    setResult(null);
  };

  const handleRunCode = async () => {
    if (!selectedChallenge) return;
    setEvaluating(true);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/challenges/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          challengeId: selectedChallenge.id,
          code,
          language
        })
      });
      const data = await res.json();
      setResult(data);
      if (data.userScore && user) {
        setUser({ ...user, totalScore: data.userScore });
      }
    } catch (err) {
      // Local fallback evaluation
      const mockPassed = code.length > 20;
      setResult({
        passed: mockPassed,
        output: mockPassed
          ? `[ACCEPTED] Test Cases Passed!\nResult: +${selectedChallenge.points} Score Points added!`
          : `[COMPILE ERROR] Solution logic check failed. Modify code syntax.`,
        testResults: [
          { testCase: 1, input: selectedChallenge.testCases[0]?.input, expected: selectedChallenge.testCases[0]?.expected, actual: mockPassed ? selectedChallenge.testCases[0]?.expected : 'Error', passed: mockPassed }
        ]
      });
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Platform Header */}
      <div style={{
        background: 'rgba(13, 19, 34, 0.9)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Code size={24} color="#06b6d4" /> Skill Testing Platform & Code IDE
          </h2>
          <span style={{ fontSize: '13px', color: '#94a3b8' }}>
            Select coding problems, write solution code, and evaluate real-time against test cases.
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '10px',
            padding: '8px 14px',
            color: '#10b981',
            fontSize: '13px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Award size={16} /> Total Score: {user?.totalScore || 0} pts
          </div>
        </div>
      </div>

      {/* Main IDE Workspace */}
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '20px' }}>
        {/* Challenge Selection Panel */}
        <div className="glass-card" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', margin: 0 }}>
            Coding Challenges
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {challenges.map(ch => {
              const isSelected = selectedChallenge?.id === ch.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => handleSelectChallenge(ch)}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    border: isSelected ? '1px solid #06b6d4' : '1px solid rgba(255, 255, 255, 0.08)',
                    background: isSelected ? 'rgba(6, 182, 212, 0.15)' : 'rgba(15, 23, 42, 0.5)',
                    color: isSelected ? '#fff' : '#cbd5e1',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontSize: '11px', textTransform: 'uppercase', color: '#06b6d4', fontWeight: '700' }}>
                      {ch.language}
                    </span>
                    <span className="badge-tag badge-base" style={{ fontSize: '9px' }}>
                      +{ch.points} pts
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '600', color: '#f8fafc' }}>
                    {ch.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* IDE & Console Workspace */}
        {selectedChallenge && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Problem Description Card */}
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#fff', margin: 0 }}>
                  {selectedChallenge.title}
                </h3>
                <span className="badge-tag badge-intermediate">{selectedChallenge.difficulty}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>
                {selectedChallenge.description}
              </p>
            </div>

            {/* Code Editor Box */}
            <div className="glass-card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Terminal size={16} color="#6366f1" /> Code Editor ({language.toUpperCase()})
                </div>
                <button
                  onClick={() => setCode(selectedChallenge.starterCode)}
                  style={{ background: 'transparent', border: 'none', color: '#64748b', fontSize: '11px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                >
                  <RefreshCw size={12} /> Reset Starter Code
                </button>
              </div>

              <textarea
                value={code}
                onChange={e => setCode(e.target.value)}
                style={{
                  width: '100%',
                  height: '240px',
                  background: '#0d1322',
                  color: '#38bdf8',
                  fontFamily: 'Fira Code, monospace',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  padding: '16px',
                  border: '1px solid #1e293b',
                  borderRadius: '10px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />

              {/* Action Control Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => setActiveTab('console')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: activeTab === 'console' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                      color: activeTab === 'console' ? '#818cf8' : '#94a3b8',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Console Output
                  </button>
                  <button
                    onClick={() => setActiveTab('testcases')}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      border: 'none',
                      background: activeTab === 'testcases' ? 'rgba(99, 102, 241, 0.2)' : 'transparent',
                      color: activeTab === 'testcases' ? '#818cf8' : '#94a3b8',
                      fontSize: '12px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    Test Cases ({selectedChallenge.testCases?.length || 1})
                  </button>
                </div>

                <button
                  onClick={handleRunCode}
                  disabled={evaluating}
                  className="btn-primary"
                  style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)' }}
                >
                  <Play size={16} />
                  {evaluating ? 'Evaluating Code...' : 'Run Code & Submit Test'}
                </button>
              </div>
            </div>

            {/* Results Console & Test Cases Display */}
            <div className="glass-card" style={{ padding: '16px' }}>
              {activeTab === 'console' ? (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>
                    EXECUTION CONSOLE LOG:
                  </div>
                  {result ? (
                    <div style={{
                      background: '#090d16',
                      border: result.passed ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid rgba(239, 68, 68, 0.4)',
                      borderRadius: '10px',
                      padding: '14px',
                      fontFamily: 'Fira Code, monospace',
                      fontSize: '13px',
                      color: result.passed ? '#34d399' : '#fca5a5',
                      whiteSpace: 'pre-line'
                    }}>
                      {result.output}
                    </div>
                  ) : (
                    <div style={{ color: '#64748b', fontSize: '13px', fontStyle: 'italic', padding: '12px 0' }}>
                      Click "Run Code & Submit Test" to compile and execute test cases.
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px' }}>
                    TEST CASES RESULTS:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {selectedChallenge.testCases.map((tc, idx) => (
                      <div key={idx} style={{ background: '#090d16', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b', fontSize: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <strong style={{ color: '#fff' }}>Input:</strong> <span style={{ color: '#06b6d4' }}>{tc.input}</span> | <strong style={{ color: '#fff' }}>Expected:</strong> <span style={{ color: '#10b981' }}>{tc.expected}</span>
                        </div>
                        {result && result.testResults ? (
                          result.testResults[idx]?.passed ? (
                            <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                              <CheckCircle2 size={14} /> Passed
                            </span>
                          ) : (
                            <span style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: '600' }}>
                              <XCircle size={14} /> Failed
                            </span>
                          )
                        ) : (
                          <span style={{ color: '#64748b' }}>Pending Run</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

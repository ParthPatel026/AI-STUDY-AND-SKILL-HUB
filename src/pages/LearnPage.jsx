import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  BookOpen, CheckCircle, PlayCircle, Bot, Sparkles, Code, CheckSquare,
  Square, ArrowRight, ExternalLink, FileCode, Terminal, Code2, Layers, Cpu, Database
} from 'lucide-react';

const defaultCourses = [
  {
    id: 'c',
    title: 'C Programming',
    subtitle: 'Procedural & Memory Management',
    modules: [
      {
        level: 'Base (Beginner)',
        topics: [
          {
            id: 'c_topic_1',
            title: 'C Basics, Data Types & Syntax',
            videoUrl: 'https://www.youtube.com/embed/KJgsSFOSQv0',
            youtubeUrl: 'https://www.youtube.com/watch?v=KJgsSFOSQv0',
            duration: '22 mins',
            summary: 'Learn structure of C programs, variables, data types (int, float, char), printf, and scanf.',
            codeSnippet: `#include <stdio.h>\n\nint main() {\n    printf("Welcome to AI Study & Skill Hub!\\n");\n    int age = 20;\n    printf("Student Age: %d\\n", age);\n    return 0;\n}`,
            aiNotes: 'In C, execution always starts from main(). Always include standard I/O library <stdio.h>. Variables must be declared with explicit types.'
          },
          {
            id: 'c_topic_2',
            title: 'Control Flow (if-else, switch, loops)',
            videoUrl: 'https://www.youtube.com/embed/rLf3jnHxSmU',
            youtubeUrl: 'https://www.youtube.com/watch?v=rLf3jnHxSmU',
            duration: '28 mins',
            summary: 'Understand condition testing, while loops, for loops, break and continue in C.',
            codeSnippet: `#include <stdio.h>\n\nint main() {\n    for(int i = 1; i <= 5; i++) {\n        if(i % 2 == 0) {\n            printf("Number %d is Even\\n", i);\n        } else {\n            printf("Number %d is Odd\\n", i);\n        }\n    }\n    return 0;\n}`,
            aiNotes: 'For loops are ideal when iterations are known. Always watch out for infinite loops!'
          }
        ]
      },
      {
        level: 'Intermediate',
        topics: [
          {
            id: 'c_topic_3',
            title: 'Functions & Pass by Reference',
            videoUrl: 'https://www.youtube.com/embed/V4xT8dEee-w',
            youtubeUrl: 'https://www.youtube.com/watch?v=V4xT8dEee-w',
            duration: '35 mins',
            summary: 'Modular programming with user-defined functions and pointer arguments.',
            codeSnippet: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("x=%d, y=%d\\n", x, y);\n    return 0;\n}`,
            aiNotes: 'Pass pointers to functions to modify actual variables in memory.'
          }
        ]
      },
      {
        level: 'Advanced',
        topics: [
          {
            id: 'c_topic_5',
            title: 'Dynamic Memory (malloc, free)',
            videoUrl: 'https://www.youtube.com/embed/zuegQmMdy8M',
            youtubeUrl: 'https://www.youtube.com/watch?v=zuegQmMdy8M',
            duration: '45 mins',
            summary: 'Heap memory management in C using stdlib.h allocation.',
            codeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr = (int*) malloc(3 * sizeof(int));\n    if(arr != NULL) {\n        arr[0] = 100;\n        free(arr);\n    }\n    return 0;\n}`,
            aiNotes: 'Always free dynamic memory to prevent memory leaks.'
          }
        ]
      }
    ]
  },
  {
    id: 'cpp',
    title: 'C++ Modern',
    subtitle: 'OOP & Modern C++ STL',
    modules: [
      {
        level: 'Base (Beginner)',
        topics: [
          {
            id: 'cpp_topic_1',
            title: 'C++ Setup & IOstream Basics',
            videoUrl: 'https://www.youtube.com/embed/vLnPwxZdW4Y',
            youtubeUrl: 'https://www.youtube.com/watch?v=vLnPwxZdW4Y',
            duration: '25 mins',
            summary: 'Introduction to std::cout, std::cin, namespaces, and basic structure of C++.',
            codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello C++ Learner!" << endl;\n    return 0;\n}`,
            aiNotes: 'C++ extends C with Object-Oriented features.'
          }
        ]
      },
      {
        level: 'Advanced',
        topics: [
          {
            id: 'cpp_topic_3',
            title: 'STL Vectors & Maps',
            videoUrl: 'https://www.youtube.com/embed/g-1Cn35wL0A',
            youtubeUrl: 'https://www.youtube.com/watch?v=g-1Cn35wL0A',
            duration: '50 mins',
            summary: 'Using std::vector, std::map, and STL algorithms for dynamic arrays.',
            codeSnippet: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> nums = {5, 2, 8};\n    sort(nums.begin(), nums.end());\n    cout << "Sorted max: " << nums.back() << endl;\n    return 0;\n}`,
            aiNotes: 'STL vectors resize dynamically and provide high performance.'
          }
        ]
      }
    ]
  },
  {
    id: 'python',
    title: 'Python 3',
    subtitle: 'Data & AI Logic',
    modules: [
      {
        level: 'Base (Beginner)',
        topics: [
          {
            id: 'py_topic_1',
            title: 'Python Syntax, Variables & Formatting',
            videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
            youtubeUrl: 'https://www.youtube.com/watch?v=_uQrJ0TkZlc',
            duration: '20 mins',
            summary: 'Dynamic typing, indentation rules, f-strings, and basic input.',
            codeSnippet: `# Python Base Example\nname = "Student"\nprint(f"Welcome {name} to Python AI Hub!")`,
            aiNotes: 'Python uses indentation instead of curly braces for blocks.'
          },
          {
            id: 'py_topic_2',
            title: 'Lists, Dictionaries & Loops',
            videoUrl: 'https://www.youtube.com/embed/W8KRzm-HUcc',
            youtubeUrl: 'https://www.youtube.com/watch?v=W8KRzm-HUcc',
            duration: '30 mins',
            summary: 'Data structures in Python: list operations, key-value dictionaries.',
            codeSnippet: `scores = {"Alex": 95, "Sam": 88}\nprint("Scores:", scores)`,
            aiNotes: 'Dictionaries provide O(1) average lookup time.'
          }
        ]
      },
      {
        level: 'Advanced',
        topics: [
          {
            id: 'py_topic_4',
            title: 'OOP Python & Exceptions',
            videoUrl: 'https://www.youtube.com/embed/JeznW_7DlpA',
            youtubeUrl: 'https://www.youtube.com/watch?v=JeznW_7DlpA',
            duration: '45 mins',
            summary: 'Classes, inheritance, and try-except error handling.',
            codeSnippet: `class Student:\n    def __init__(self, name):\n        self.name = name\n\ns = Student("Alex")\nprint(s.name)`,
            aiNotes: 'Classes encapsulate attributes and methods into objects.'
          }
        ]
      }
    ]
  },
  {
    id: 'javascript',
    title: 'JavaScript & React',
    subtitle: 'Web Stack & React JSX',
    modules: [
      {
        level: 'Base (Beginner)',
        topics: [
          {
            id: 'js_topic_1',
            title: 'JS ES6+ Arrow Functions & Const/Let',
            videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
            youtubeUrl: 'https://www.youtube.com/watch?v=W6NZfCO5SIk',
            duration: '25 mins',
            summary: 'Modern JS syntax, arrow functions, and array methods.',
            codeSnippet: `const greet = (name) => \`Hello \${name}\`;\nconsole.log(greet("Student"));`,
            aiNotes: 'Prefer const by default, let when variables mutate.'
          }
        ]
      },
      {
        level: 'Advanced',
        topics: [
          {
            id: 'js_topic_3',
            title: 'React Fundamentals: Props & State',
            videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
            youtubeUrl: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
            duration: '45 mins',
            summary: 'Building interactive UIs with React components and useState.',
            codeSnippet: `import { useState } from 'react';\n\nfunction App() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;\n}`,
            aiNotes: 'React re-renders automatically when state updates.'
          }
        ]
      }
    ]
  },
  {
    id: 'java',
    title: 'Java OOP',
    subtitle: 'Enterprise Java',
    modules: [
      {
        level: 'Base (Beginner)',
        topics: [
          {
            id: 'java_topic_1',
            title: 'Java Architecture & Syntax Basics',
            videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
            youtubeUrl: 'https://www.youtube.com/watch?v=eIrMbAQSU34',
            duration: '25 mins',
            summary: 'JVM, JDK, System.out.println, primitive types, and class structure.',
            codeSnippet: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Java Course!");\n    }\n}`,
            aiNotes: 'Every Java app must have a main method inside a class.'
          }
        ]
      }
    ]
  },
  {
    id: 'sql',
    title: 'SQL Database',
    subtitle: 'Relational Queries',
    modules: [
      {
        level: 'Base (Beginner)',
        topics: [
          {
            id: 'sql_topic_1',
            title: 'SQL Fundamentals: SELECT & WHERE',
            videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
            youtubeUrl: 'https://www.youtube.com/watch?v=HXV3zeQKqGY',
            duration: '22 mins',
            summary: 'Querying tables, filtering records, and ordering results.',
            codeSnippet: `SELECT student_name, score FROM students WHERE score >= 80;`,
            aiNotes: 'SQL is declarative: specify WHAT data you want.'
          }
        ]
      }
    ]
  }
];

export default function LearnPage({ selectedLanguage, setSelectedLanguage, onOpenAITutorForTopic }) {
  const { user, toggleTopicProgress, API_BASE } = useAuth();
  const [courses, setCourses] = useState(defaultCourses);
  const [activeCourseId, setActiveCourseId] = useState(selectedLanguage && selectedLanguage !== 'all' ? selectedLanguage : 'c');
  const [activeTopic, setActiveTopic] = useState(defaultCourses[0].modules[0].topics[0]);

  // Sync state if selectedLanguage prop changes
  useEffect(() => {
    if (selectedLanguage && selectedLanguage !== 'all') {
      setActiveCourseId(selectedLanguage);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    fetch(`${API_BASE}/courses`)
      .then(res => res.json())
      .then(data => {
        if (data && data.courses && data.courses.length > 0) {
          setCourses(data.courses);
        }
      })
      .catch(() => {
        // Retain defaultCourses on error
      });
  }, [API_BASE]);

  // Whenever activeCourseId or courses change, set default topic
  useEffect(() => {
    const matchedCourse = courses.find(c => c.id === activeCourseId) || courses[0];
    if (matchedCourse && matchedCourse.modules && matchedCourse.modules.length > 0 && matchedCourse.modules[0].topics.length > 0) {
      setActiveTopic(matchedCourse.modules[0].topics[0]);
    }
  }, [activeCourseId, courses]);

  const currentCourse = courses.find(c => c.id === activeCourseId) || courses[0];

  const isTopicCompleted = (topicId) => {
    return user?.completedTopics?.includes(topicId);
  };

  return (
    <div style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Top Header & Language Selector Tabs */}
      <div style={{
        background: 'rgba(13, 19, 34, 0.9)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <BookOpen size={24} color="#6366f1" /> Learn Phase • Base to Advance
            </h2>
            <span style={{ fontSize: '13px', color: '#94a3b8' }}>
              Study programming languages topic-wise with video lectures and AI concept summaries.
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: '600' }}>
              {user?.completedTopics?.length || 0} Topics Completed
            </span>
          </div>
        </div>

        {/* Language Selection Buttons */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }}>
          {[
            { id: 'c', name: 'C Programming', color: '#3b82f6' },
            { id: 'cpp', name: 'C++ Modern', color: '#8b5cf6' },
            { id: 'python', name: 'Python 3', color: '#f59e0b' },
            { id: 'javascript', name: 'JavaScript & React', color: '#06b6d4' },
            { id: 'java', name: 'Java OOP', color: '#ef4444' },
            { id: 'sql', name: 'SQL Database', color: '#10b981' }
          ].map(lang => {
            const isActive = activeCourseId === lang.id;
            return (
              <button
                key={lang.id}
                onClick={() => {
                  setActiveCourseId(lang.id);
                  if (setSelectedLanguage) setSelectedLanguage(lang.id);
                }}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  border: isActive ? `1px solid ${lang.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                  background: isActive ? 'rgba(30, 41, 59, 0.9)' : 'rgba(15, 23, 42, 0.5)',
                  color: isActive ? '#fff' : '#94a3b8',
                  fontWeight: isActive ? '700' : '500',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: lang.color }} />
                {lang.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Study Layout */}
      {currentCourse && (
        <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px' }}>
          {/* LEFT: Base to Advance Topic Tree */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="glass-card" style={{ padding: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#fff', margin: 0 }}>
                  Course Roadmap
                </h3>
                <span className="badge-tag badge-base" style={{ fontSize: '10px' }}>
                  {currentCourse.title}
                </span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {currentCourse.modules?.map((mod, mIdx) => (
                  <div key={mIdx}>
                    <div style={{
                      fontSize: '11px',
                      fontWeight: '800',
                      letterSpacing: '1px',
                      textTransform: 'uppercase',
                      color: mod.level.includes('Base') ? '#10b981' : (mod.level.includes('Intermediate') ? '#f59e0b' : '#8b5cf6'),
                      marginBottom: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span>●</span> {mod.level}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {mod.topics.map(topic => {
                        const isSelected = activeTopic?.id === topic.id;
                        const completed = isTopicCompleted(topic.id);
                        return (
                          <button
                            key={topic.id}
                            onClick={() => setActiveTopic(topic)}
                            style={{
                              padding: '10px 12px',
                              borderRadius: '10px',
                              border: isSelected ? '1px solid #6366f1' : '1px solid transparent',
                              background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                              color: isSelected ? '#fff' : '#cbd5e1',
                              textAlign: 'left',
                              fontSize: '13px',
                              fontWeight: isSelected ? '600' : '400',
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              transition: 'all 0.15s ease'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <PlayCircle size={14} color={isSelected ? '#6366f1' : '#64748b'} />
                              <span>{topic.title}</span>
                            </div>

                            {completed ? (
                              <CheckCircle size={16} color="#10b981" />
                            ) : (
                              <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '1px solid #475569' }} />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Topic Workspace & Video Player */}
          {activeTopic && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* Topic Header & Video Card */}
              <div className="glass-card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <span className="badge-tag badge-base" style={{ marginBottom: '8px' }}>
                      {currentCourse.title} • Video Lecture
                    </span>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#fff', margin: 0 }}>
                      {activeTopic.title}
                    </h2>
                  </div>

                  {/* Completion Action Checkbox */}
                  <button
                    onClick={() => toggleTopicProgress(activeTopic.id, !isTopicCompleted(activeTopic.id))}
                    style={{
                      background: isTopicCompleted(activeTopic.id) ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.15)',
                      border: isTopicCompleted(activeTopic.id) ? '1px solid #10b981' : '1px solid #6366f1',
                      color: isTopicCompleted(activeTopic.id) ? '#10b981' : '#818cf8',
                      borderRadius: '10px',
                      padding: '8px 16px',
                      fontWeight: '600',
                      fontSize: '13px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    {isTopicCompleted(activeTopic.id) ? (
                      <>
                        <CheckSquare size={16} /> Marked Completed (+20 Pts)
                      </>
                    ) : (
                      <>
                        <Square size={16} /> Mark Topic Completed
                      </>
                    )}
                  </button>
                </div>

                {/* Video Player Section with Fallback Watch Link */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '52%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#090d16',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  marginBottom: '16px'
                }}>
                  <iframe
                    src={activeTopic.videoUrl}
                    title={activeTopic.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      border: 'none'
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Backup Direct Video Button */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: 'rgba(15, 23, 42, 0.6)',
                  padding: '10px 16px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  marginBottom: '20px'
                }}>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>
                    Having trouble loading the video player?
                  </span>
                  <a
                    href={activeTopic.youtubeUrl || activeTopic.videoUrl.replace('/embed/', '/watch?v=')}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '12px',
                      color: '#06b6d4',
                      fontWeight: '600',
                      textDecoration: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Watch Directly on YouTube <ExternalLink size={14} />
                  </a>
                </div>

                {/* Lesson Summary */}
                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '20px' }}>
                  {activeTopic.summary}
                </p>

                {/* AI Doubts Solver & Code Snippet Box */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {/* Left: Code Snippet */}
                  <div>
                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Code size={14} color="#06b6d4" /> Topic Code Example
                    </div>
                    <div className="code-block" style={{ height: '160px', overflowY: 'auto' }}>
                      {activeTopic.codeSnippet}
                    </div>
                  </div>

                  {/* Right: AI Tutor Key Notes & Doubts Trigger */}
                  <div style={{
                    background: 'rgba(139, 92, 246, 0.08)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '12px',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: '700', color: '#c084fc', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Sparkles size={16} /> AI Key Concept Summary
                      </div>
                      <p style={{ fontSize: '12px', color: '#cbd5e1', lineHeight: '1.5' }}>
                        {activeTopic.aiNotes}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (onOpenAITutorForTopic) onOpenAITutorForTopic(activeTopic.title, activeTopic.codeSnippet);
                      }}
                      className="btn-primary"
                      style={{
                        background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                        fontSize: '12px',
                        padding: '10px'
                      }}
                    >
                      <Bot size={16} />
                      Ask AI Tutor Doubt on "{activeTopic.title.split(',')[0]}"
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

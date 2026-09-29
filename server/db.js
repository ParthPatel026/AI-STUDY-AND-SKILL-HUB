import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'database.json');

// Default initial data for courses, topics, videos, coding challenges, and anchor links
const initialData = {
  users: [
    {
      id: 'usr_demo',
      name: 'Alex Developer',
      email: 'student@college.edu',
      passwordHash: '$2a$10$w8T0VbUfW1xN9Y3p2g0pueN5Wk8a7f.e9k6y.x2V.8hJ2YkZ6Q6uO', // password123
      college: 'Institute of Technology',
      department: 'Computer Science & Engineering',
      level: 'Intermediate Learner',
      completedTopics: ['c_topic_1', 'py_topic_1', 'js_topic_1'],
      testScores: { 'ch_py_1': 100, 'ch_c_1': 90 },
      totalScore: 190,
      streak: 5,
      badges: ['Quick Starter', 'C++ Enthusiast', 'Python Novice', 'Logic Master']
    }
  ],
  courses: [
    {
      id: 'c',
      title: 'C Programming',
      subtitle: 'Procedural Programming & Memory Management',
      icon: 'FileCode',
      badge: 'Foundation',
      description: 'Master procedural fundamentals, pointers, dynamic memory allocation, and data structures in C.',
      modules: [
        {
          level: 'Base (Beginner)',
          topics: [
            {
              id: 'c_topic_1',
              title: 'C Basics, Data Types & Syntax',
              videoUrl: 'https://www.youtube.com/embed/KJgsSFOSQv0',
              duration: '22 mins',
              summary: 'Learn structure of C programs, variables, data types (int, float, char), printf, and scanf.',
              codeSnippet: `#include <stdio.h>\n\nint main() {\n    printf("Welcome to AI Study & Skill Hub!\\n");\n    int age = 20;\n    printf("Student Age: %d\\n", age);\n    return 0;\n}`,
              aiNotes: 'In C, execution always starts from main(). Always include standard I/O library <stdio.h>. Variables must be declared with explicit types.'
            },
            {
              id: 'c_topic_2',
              title: 'Control Flow (if-else, switch, loops)',
              videoUrl: 'https://www.youtube.com/embed/rLf3jnHxSmU',
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
              title: 'Functions & Pass by Value/Reference',
              videoUrl: 'https://www.youtube.com/embed/V4xT8dEee-w',
              duration: '35 mins',
              summary: 'Modular programming with user-defined functions, function prototypes, and argument passing.',
              codeSnippet: `#include <stdio.h>\n\nvoid swap(int *a, int *b) {\n    int temp = *a;\n    *a = *b;\n    *b = temp;\n}\n\nint main() {\n    int x = 10, y = 20;\n    swap(&x, &y);\n    printf("x=%d, y=%d\\n", x, y);\n    return 0;\n}`,
              aiNotes: 'Pass pointers to functions to modify actual variables in memory (pass-by-reference).'
            },
            {
              id: 'c_topic_4',
              title: 'Pointers & Arrays',
              videoUrl: 'https://www.youtube.com/embed/2ybLD6_2gKM',
              duration: '40 mins',
              summary: 'Pointer arithmetic, array indexing using pointers, dynamic arrays.',
              codeSnippet: `#include <stdio.h>\n\nint main() {\n    int arr[3] = {10, 20, 30};\n    int *ptr = arr;\n    for(int i=0; i<3; i++) {\n        printf("Element %d = %d\\n", i, *(ptr + i));\n    }\n    return 0;\n}`,
              aiNotes: 'An array name acts as a constant pointer to its first element in memory.'
            }
          ]
        },
        {
          level: 'Advanced',
          topics: [
            {
              id: 'c_topic_5',
              title: 'Dynamic Memory (malloc, calloc, free)',
              videoUrl: 'https://www.youtube.com/embed/zuegQmMdy8M',
              duration: '45 mins',
              summary: 'Heap memory management in C using stdlib.h allocation and deallocation.',
              codeSnippet: `#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr = (int*) malloc(3 * sizeof(int));\n    if(arr != NULL) {\n        arr[0] = 100;\n        printf("Dynamic val: %d\\n", arr[0]);\n        free(arr); // avoid memory leaks\n    }\n    return 0;\n}`,
              aiNotes: 'Always free dynamically allocated memory to prevent memory leaks in production C applications.'
            }
          ]
        }
      ]
    },
    {
      id: 'cpp',
      title: 'C++ Programming',
      subtitle: 'Object-Oriented & Modern C++ STL',
      icon: 'Code2',
      badge: 'OOP & Systems',
      description: 'Master classes, inheritance, polymorphism, templates, and the Standard Template Library (STL).',
      modules: [
        {
          level: 'Base (Beginner)',
          topics: [
            {
              id: 'cpp_topic_1',
              title: 'C++ Setup, IOstream & Namespaces',
              videoUrl: 'https://www.youtube.com/embed/vLnPwxZdW4Y',
              duration: '25 mins',
              summary: 'Introduction to std::cout, std::cin, namespaces, and basic structure of modern C++.',
              codeSnippet: `#include <iostream>\nusing namespace std;\n\nint main() {\n    string student = "Engineering Student";\n    cout << "Hello " << student << " in C++!" << endl;\n    return 0;\n}`,
              aiNotes: 'C++ extends C with OOP capabilities. cin/cout use stream operators << and >>.'
            }
          ]
        },
        {
          level: 'Intermediate',
          topics: [
            {
              id: 'cpp_topic_2',
              title: 'Classes, Objects & Encapsulation',
              videoUrl: 'https://www.youtube.com/embed/ABRP_5RYhqU',
              duration: '38 mins',
              summary: 'Constructors, destructors, private/public access specifiers, and member functions.',
              codeSnippet: `#include <iostream>\nusing namespace std;\n\nclass Student {\nprivate:\n    string name;\n    int score;\npublic:\n    Student(string n, int s) : name(n), score(s) {}\n    void display() {\n        cout << "Student: " << name << " | Score: " << score << endl;\n    }\n};\n\nint main() {\n    Student s1("Alex", 95);\n    s1.display();\n    return 0;\n}`,
              aiNotes: 'Encapsulation protects data members inside classes by making them private.'
            }
          ]
        },
        {
          level: 'Advanced',
          topics: [
            {
              id: 'cpp_topic_3',
              title: 'Standard Template Library (STL) Vectors & Maps',
              videoUrl: 'https://www.youtube.com/embed/g-1Cn35wL0A',
              duration: '50 mins',
              summary: 'Using std::vector, std::map, std::sort, iterators, and lambdas for high performance.',
              codeSnippet: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    vector<int> scores = {85, 92, 78, 99};\n    sort(scores.begin(), scores.end());\n    cout << "Top score: " << scores.back() << endl;\n    return 0;\n}`,
              aiNotes: 'STL vectors automatically resize dynamically and provide high performance data management.'
            }
          ]
        }
      ]
    },
    {
      id: 'python',
      title: 'Python Programming',
      subtitle: 'Data Science, Automation & AI Logic',
      icon: 'Terminal',
      badge: 'Popular AI',
      description: 'Learn Python syntax, lists, dictionaries, OOP, file handling, and algorithms step-by-step.',
      modules: [
        {
          level: 'Base (Beginner)',
          topics: [
            {
              id: 'py_topic_1',
              title: 'Python Variables, Types & Syntax',
              videoUrl: 'https://www.youtube.com/embed/_uQrJ0TkZlc',
              duration: '20 mins',
              summary: 'Dynamic typing, indentation rules, print statements, string formatting, and input().',
              codeSnippet: `# Python Base Example\nname = "AI Learner"\nskills = ["Python", "C++", "JavaScript"]\n\nprint(f"Welcome {name}! You are mastering {len(skills)} languages.")`,
              aiNotes: 'Python uses indentation instead of curly braces for code blocks. Variables are dynamically typed.'
            },
            {
              id: 'py_topic_2',
              title: 'Lists, Dictionaries & Tuples',
              videoUrl: 'https://www.youtube.com/embed/W8KRzm-HUcc',
              duration: '30 mins',
              summary: 'Data structures in Python: list operations, key-value dictionaries, list comprehensions.',
              codeSnippet: `# Dictionaries & Comprehensions\nstudent_scores = {"Alex": 95, "Sam": 88, "Jordan": 92}\ntop_students = {k: v for k, v in student_scores.items() if v >= 90}\nprint("Top Scorers:", top_students)`,
              aiNotes: 'Dictionary lookup in Python has average O(1) time complexity.'
            }
          ]
        },
        {
          level: 'Intermediate',
          topics: [
            {
              id: 'py_topic_3',
              title: 'Functions, Modules & Decorators',
              videoUrl: 'https://www.youtube.com/embed/u-OmVr_fT4s',
              duration: '35 mins',
              summary: 'Writing reusable functions, args/kwargs, modules, and pythonic decorators.',
              codeSnippet: `def timer_decorator(func):\n    def wrapper(*args, **kwargs):\n        print("[AI Monitor] Executing function...")\n        return func(*args, **kwargs)\n    return wrapper\n\n@timer_decorator\ndef calculate_gpa(marks):\n    return sum(marks) / len(marks)\n\nprint("GPA:", calculate_gpa([85, 90, 95]))`,
              aiNotes: 'Decorators modify or extend function behavior without altering the original function implementation.'
            }
          ]
        },
        {
          level: 'Advanced',
          topics: [
            {
              id: 'py_topic_4',
              title: 'Object-Oriented Python & Exception Handling',
              videoUrl: 'https://www.youtube.com/embed/JeznW_7DlpA',
              duration: '45 mins',
              summary: 'Classes, inheritance, try-except-finally blocks, and custom exception classes.',
              codeSnippet: `class AISkillTracker:\n    def __init__(self, student_name):\n        self.student = student_name\n        self.skills = []\n        \n    def add_skill(self, skill):\n        self.skills.append(skill)\n        print(f"Added {skill} to {self.student}'s profile.")\n\ntracker = AISkillTracker("Alex")\ntracker.add_skill("Machine Learning")`,
              aiNotes: 'Classes encapsulate both attributes (data) and methods (behavior) into objects.'
            }
          ]
        }
      ]
    },
    {
      id: 'javascript',
      title: 'JavaScript & React',
      subtitle: 'Modern Web, ES6+, Async & Components',
      icon: 'Layers',
      badge: 'Web Stack',
      description: 'Master JavaScript ES6+, Promises, Async/Await, DOM, and component-driven React JSX development.',
      modules: [
        {
          level: 'Base (Beginner)',
          topics: [
            {
              id: 'js_topic_1',
              title: 'JS ES6+ Syntax, Let/Const & Arrow Functions',
              videoUrl: 'https://www.youtube.com/embed/W6NZfCO5SIk',
              duration: '25 mins',
              summary: 'Variables scoping (let/const/var), template literals, arrow syntax, and array methods (map, filter).',
              codeSnippet: `const calculateProgress = (completed, total) => {\n  const percentage = (completed / total) * 100;\n  return \`Progress: \${percentage.toFixed(1)}%\`;\n};\n\nconsole.log(calculateProgress(7, 10));`,
              aiNotes: 'Prefer const by default, let when variables mutate. Arrow functions preserve lexical this binding.'
            }
          ]
        },
        {
          level: 'Intermediate',
          topics: [
            {
              id: 'js_topic_2',
              title: 'Asynchronous JS: Promises & Async/Await',
              videoUrl: 'https://www.youtube.com/embed/PoRJizFvM7s',
              duration: '35 mins',
              summary: 'Understanding the Event Loop, fetch API, handling promises with async/await and try/catch.',
              codeSnippet: `async function fetchStudentData() {\n  try {\n    const response = await fetch('/api/user/profile');\n    const data = await response.json();\n    console.log("Profile Data:", data);\n  } catch (err) {\n    console.error("Fetch error:", err);\n  }\n}`,
              aiNotes: 'Async/await makes asynchronous code readable and easy to debug like synchronous code.'
            }
          ]
        },
        {
          level: 'Advanced',
          topics: [
            {
              id: 'js_topic_3',
              title: 'React Fundamentals: JSX, Props & State',
              videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8',
              duration: '45 mins',
              summary: 'Building interactive UIs with React components, useState, useEffect, and props flow.',
              codeSnippet: `import React, { useState } from 'react';\n\nfunction StreakCounter() {\n  const [count, setCount] = useState(1);\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Study Streak: {count} Days\n    </button>\n  );\n}`,
              aiNotes: 'React re-renders components automatically whenever state updates.'
            }
          ]
        }
      ]
    },
    {
      id: 'java',
      title: 'Java Programming',
      subtitle: 'Enterprise Java, OOP & Multithreading',
      icon: 'Cpu',
      badge: 'Enterprise',
      description: 'Explore Java syntax, JVM architecture, Collections framework, and object-oriented principles.',
      modules: [
        {
          level: 'Base (Beginner)',
          topics: [
            {
              id: 'java_topic_1',
              title: 'Java Architecture & Syntax Basics',
              videoUrl: 'https://www.youtube.com/embed/eIrMbAQSU34',
              duration: '25 mins',
              summary: 'JVM, JRE, JDK, System.out.println, primitive types, and class structure.',
              codeSnippet: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Java AI Study Hub Initialized!");\n    }\n}`,
              aiNotes: 'Every Java application must have a main method inside a class matching the filename.'
            }
          ]
        },
        {
          level: 'Advanced',
          topics: [
            {
              id: 'java_topic_2',
              title: 'Java Collections Framework (ArrayList, HashMap)',
              videoUrl: 'https://www.youtube.com/embed/A-H-WfK-H5E',
              duration: '40 mins',
              summary: 'Using Lists, Sets, Maps, Iterators, and Generics in Java.',
              codeSnippet: `import java.util.*;\n\npublic class SkillTracker {\n    public static void main(String[] args) {\n        Map<String, Integer> scores = new HashMap<>();\n        scores.put("Java", 90);\n        scores.put("Python", 95);\n        System.out.println("Skills: " + scores);\n    }\n}`,
              aiNotes: 'HashMap provides fast key-value lookups using hashing algorithms.'
            }
          ]
        }
      ]
    },
    {
      id: 'sql',
      title: 'SQL & Databases',
      subtitle: 'Relational Database Queries & Design',
      icon: 'Database',
      badge: 'Data Stack',
      description: 'Learn SQL SELECT, JOINs, GROUP BY, indexes, and relational table design.',
      modules: [
        {
          level: 'Base (Beginner)',
          topics: [
            {
              id: 'sql_topic_1',
              title: 'SQL Fundamentals: SELECT, WHERE & ORDER BY',
              videoUrl: 'https://www.youtube.com/embed/HXV3zeQKqGY',
              duration: '22 mins',
              summary: 'Querying tables, filtering records with WHERE, sorting result sets with ORDER BY.',
              codeSnippet: `SELECT student_name, score, department \nFROM students \nWHERE score >= 80 \nORDER BY score DESC;`,
              aiNotes: 'SQL is declarative: specify WHAT data you want, not how to fetch it.'
            }
          ]
        },
        {
          level: 'Advanced',
          topics: [
            {
              id: 'sql_topic_2',
              title: 'SQL JOINs & Aggregate Functions',
              videoUrl: 'https://www.youtube.com/embed/9yeOJ0ZMUmo',
              duration: '38 mins',
              summary: 'INNER JOIN, LEFT JOIN, GROUP BY, HAVING, and aggregate COUNT/AVG/SUM functions.',
              codeSnippet: `SELECT c.course_name, COUNT(e.student_id) AS total_enrolled\nFROM courses c\nLEFT JOIN enrollments e ON c.id = e.course_id\nGROUP BY c.course_name;`,
              aiNotes: 'JOINs combine columns from one or more tables based on a shared foreign key.'
            }
          ]
        }
      ]
    }
  ],
  challenges: [
    {
      id: 'ch_py_1',
      title: 'Reverse String in Python',
      language: 'python',
      difficulty: 'Easy',
      points: 50,
      description: 'Write a function reverse_string(s) that takes a string s and returns the string in reverse order.',
      starterCode: `def reverse_string(s):\n    # Write your solution here\n    return s[::-1]\n\n# Test input\nprint(reverse_string("college"))`,
      testCases: [
        { input: '"college"', expected: 'egelloc' },
        { input: '"python"', expected: 'nohtyp' }
      ]
    },
    {
      id: 'ch_js_1',
      title: 'Array Sum in JavaScript',
      language: 'javascript',
      difficulty: 'Easy',
      points: 50,
      description: 'Write a function sumArray(arr) that calculates and returns the sum of all numbers in an array.',
      starterCode: `function sumArray(arr) {\n  // Write your code here\n  return arr.reduce((acc, curr) => acc + curr, 0);\n}\n\nconsole.log(sumArray([10, 20, 30]));`,
      testCases: [
        { input: '[10, 20, 30]', expected: '60' },
        { input: '[5, 5, 5, 5]', expected: '20' }
      ]
    },
    {
      id: 'ch_cpp_1',
      title: 'Find Maximum Element in C++',
      language: 'cpp',
      difficulty: 'Medium',
      points: 80,
      description: 'Implement logic to find and return the maximum integer value in a given vector array.',
      starterCode: `#include <iostream>\n#include <vector>\n#include <algorithm>\nusing namespace std;\n\nint findMax(vector<int> nums) {\n    int maxVal = nums[0];\n    for(int n : nums) {\n        if(n > maxVal) maxVal = n;\n    }\n    return maxVal;\n}\n\nint main() {\n    cout << findMax({14, 55, 23, 89, 42}) << endl;\n    return 0;\n}`,
      testCases: [
        { input: '{14, 55, 23, 89, 42}', expected: '89' }
      ]
    },
    {
      id: 'ch_c_1',
      title: 'Check Even or Odd in C',
      language: 'c',
      difficulty: 'Easy',
      points: 40,
      description: 'Write a C program function to evaluate if an integer number is Even or Odd.',
      starterCode: `#include <stdio.h>\n\nconst char* checkEvenOdd(int num) {\n    if (num % 2 == 0) return "Even";\n    return "Odd";\n}\n\nint main() {\n    printf("%s", checkEvenOdd(42));\n    return 0;\n}`,
      testCases: [
        { input: '42', expected: 'Even' },
        { input: '17', expected: 'Odd' }
      ]
    }
  ],
  anchorLinks: [
    {
      id: 'anc_1',
      title: 'MDN Web Docs - JavaScript Guide',
      category: 'Documentation',
      url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
      description: 'Comprehensive documentation for web standards, JS syntax, and APIs.'
    },
    {
      id: 'anc_2',
      title: 'cppreference.com - Modern C++ Standard',
      category: 'C++ Reference',
      url: 'https://en.cppreference.com/w/',
      description: 'Complete reference for C++ syntax, STL vectors, algorithms, and headers.'
    },
    {
      id: 'anc_3',
      title: 'Python 3.12 Official Docs & Tutorials',
      category: 'Python',
      url: 'https://docs.python.org/3/',
      description: 'Official Python standard library docs, language references, and guides.'
    },
    {
      id: 'anc_4',
      title: 'GeeksforGeeks Data Structures & Algorithms',
      category: 'CS Fundamentals',
      url: 'https://www.geeksforgeeks.org/data-structures/',
      description: 'Curated tutorials on Arrays, Linked Lists, Trees, Graphs, and Dynamic Programming.'
    },
    {
      id: 'anc_5',
      title: 'W3Schools Online Code Editor & Exercises',
      category: 'Interactive Practice',
      url: 'https://www.w3schools.com/',
      description: 'Student-friendly tutorials and quick code snippet testers for all major languages.'
    }
  ]
};

// Initialize DB file if missing
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
}

export function readDB() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return initialData;
  }
}

export function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

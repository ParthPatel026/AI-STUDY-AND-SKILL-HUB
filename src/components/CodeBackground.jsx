import React from 'react';

export default function CodeBackground() {
  const codeSnippets = [
    { text: '#include <stdio.h>\nint main() { printf("AI Hub"); }', top: '8%', left: '4%' },
    { text: 'def ai_study_roadmap():\n    return ["Base", "Advance"]', top: '18%', right: '5%' },
    { text: 'std::vector<int> skills = {100, 95, 98};\nstd::sort(skills.begin());', top: '65%', left: '3%' },
    { text: 'const [score, setScore] = useState(100);\nuseEffect(() => syncProgress());', top: '78%', right: '6%' },
    { text: 'SELECT student, score FROM hub_records\nWHERE progress = 100%;', top: '42%', left: '85%' },
    { text: 'class SkillPlatform {\n  public: void testCode();\n};', top: '48%', left: '2%' }
  ];

  return (
    <div className="code-bg-watermark">
      {codeSnippets.map((item, idx) => (
        <div
          key={idx}
          className="code-snippet-floating"
          style={{
            top: item.top,
            left: item.left,
            right: item.right
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
}

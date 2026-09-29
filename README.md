# 🎓 AI Study & Skill Hub

A full-stack web application designed for college minor projects. It provides a student-friendly learning environment for programming languages (**C, C++, Python, JavaScript, Java, SQL**) with topic-wise Base to Advance roadmaps, embedded YouTube video lectures, an AI doubt solver, a multi-language coding skills platform, and random external reference anchor links.

---

## 🌟 Key Features

1. **🔐 Authentication System**:
   - Student Registration & Login with JWT token authorization.
   - Profile metadata: Student Name, Email, College/Institute, and Department.
   - Demo credentials autofill button for instant presentation testing.

2. **📊 Student Dashboard**:
   - Tracks completed topics, study streak counter, total points earned, and skill badges.
   - Quick launch cards for all programming language courses.

3. **📚 Learn Phase (Base to Advance Roadmaps)**:
   - Supports **C, C++, Python, JavaScript, Java, and SQL**.
   - Topics structured into **Base (Beginner)**, **Intermediate**, and **Advanced** levels.
   - Embedded course video lectures for each topic.
   - Code syntax previews, AI key concept notes, and topic completion checkboxes (+20 Pts).

4. **⚡ Skill Testing Platform & Code IDE**:
   - Multi-language IDE editor (C, C++, Python, JS, Java).
   - Real-time compilation and test cases runner with immediate output console.

5. **🤖 AI Doubts Solver**:
   - Slide-over AI assistant drawer providing step-by-step doubt resolutions and code explanations.

6. **⚓ Random Anchor Link Generator**:
   - College project requirement: Generates random external developer anchor links (MDN, cppreference, Python Docs, GeeksforGeeks).

---

## 🛠️ Technology Stack

- **Frontend**: React (JSX), HTML5, Vanilla CSS3 (Code/Study dark theme), Lucide Icons, Vite
- **Backend**: Node.js, Express.js REST API, JSON Database Engine (`server/db.js`)
- **Security**: JWT Authentication & Bcryptjs password hashing

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+)

### Steps:
1. Clone or download the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Backend API Server:
   ```bash
   npm run server
   ```
   *(Backend runs on `http://localhost:5000`)*

4. Start the Frontend Application:
   ```bash
   npm run dev
   ```
   *(Frontend runs on `http://localhost:5173`)*

5. Open your browser and navigate to `http://localhost:5173`.

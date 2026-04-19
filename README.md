# 🌊 Wave-Wave: Bridging Silence with AI

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Modern-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.0-FF6F00?logo=tensorflow)](https://wwww.tensorflow.org/)
[![Gemini](https://img.shields.io/badge/Google-Gemini-8E75C2?logo=google-gemini)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Wave-Wave** is a cutting-edge, AI-powered educational platform dedicated to **Vietnamese Sign Language (ViSL)**. By combining real-time computer vision, deep learning, and Large Language Models (LLMs), Wave-Wave transforms how sign language is taught, practiced, and understood.

![Hero Banner](docs/hero-banner.png)

---

## 🚀 Key Innovations

### 🧠 Real-Time Sign Recognition
At the core of Wave-Wave is a custom-trained **Bidirectional LSTM (Long Short-Term Memory)** neural network. It processes streaming video frames via **WebSockets** to provide instantaneous translation of ViSL gestures into text, enabling seamless interaction.

### 🎓 AI Teacher Agent
Powered by **Google Gemini** and the **Google Agent Development Kit (ADK)**, our intelligent "Teacher Agent" provides personalized feedback, summarizes learning sessions, and adapts the curriculum to the user's progress and learning style.

### 📚 Structured Learning Ecosystem
- **Interactive Syllabus**: Progressively designed lessons covering vocabulary, grammar, and cultural context.
- **Dynamic Quizzes**: AI-generated assessments that test both recognition and production skills.
- **Learning Preferences**: Tailored experiences based on user goals, available time, and current skill level.

### 🤝 Community & Collaboration
A built-in social hub allowing users to share their learning journey, post insights, and connect with a community of ViSL learners.

---

## 🛠️ Technical Architecture

Wave-Wave is built with a microservice-oriented architecture designed for scalability and performance:

- **Frontend**: A high-performance **Next.js** application utilizing **TypeScript** for type safety and **Tailwind CSS** with **Shadcn UI** for a premium, responsive user experience.
- **Backend API**: A robust **FastAPI** server handling asynchronous database operations, WebSocket management, and LLM orchestration.
- **AI/ML Engine**:
  - **Recognition Pipeline**: TensorFlow/Keras models trained on specialized ViSL datasets.
  - **Reasoning Engine**: Google Gemini integration for conversational learning and content generation.
- **Data Persistence**: **PostgreSQL** managed via **asyncpg** for high-concurrency database access.
- **Containerization**: Fully **Dockerized** setup for consistent development and deployment environments.

---

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js, React, TypeScript, Tailwind CSS, Framer Motion |
| **Backend** | Python, FastAPI, WebSockets, Google ADK |
| **Machine Learning** | TensorFlow, Keras, Scikit-learn, Google Gemini API |
| **Database** | PostgreSQL, asyncpg |
| **DevOps** | Docker, Docker Compose, Git |

---

## 🏁 Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- Docker & Docker Compose (Recommended)
- Google Gemini API Key

### Quick Start with Docker
```bash
# Clone the repository
git clone https://github.com/anatwork14/wave-wave.git
cd wave-wave

# Set up environment variables
cp .env.example .env

# Launch the entire stack
docker-compose up --build
```

### Manual Component Setup
Refer to the individual `README.md` files in each directory for detailed setup:
- [Backend Setup](./backend/README.md)
- [Frontend Setup](./frontend/README.md)
- [ML Recognition Setup](./Wave-Wave-ViSL-Recognition/README.md)

---

## 📈 Future Roadmap
- [ ] Integration of 3D Avatar for sign production.
- [ ] Mobile application (React Native).
- [ ] Expanded dialect support for different regions in Vietnam.
- [ ] Real-time peer-to-peer signing practice rooms.

---

## 📄 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Developed with ❤️ for the ViSL Community.**
Contact: [anatwork14@gmail.com](mailto:anatwork14@gmail.com)

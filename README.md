🏛️ GovAssist AI
📖 Overview

GovAssist AI is a full-stack, AI-powered platform that helps citizens discover, compare, and understand government schemes without wading through dense official PDFs. By combining a Retrieval-Augmented Generation (RAG) pipeline, a profile-based eligibility engine, and a conversational AI assistant, GovAssist AI turns complicated government documentation into clear, cited, easy-to-understand answers.

Users can chat with government scheme documents, run a step-by-step eligibility check, explore schemes by category, compare schemes side-by-side, and save the ones that matter to them — all backed by a hybrid search architecture that blends structured metadata filtering with semantic document retrieval.

✨ Features
💬 AI Chat with Government Documents — ChatGPT-style interface with streaming answers, chat history, and source citations
🎯 Eligibility Checker — Multi-step wizard (age, gender, state, occupation, income, education, category) with instant recommendations
📚 Scheme Explorer — Browse schemes by category: Housing, Education, Agriculture, Employment, Startup, Healthcare
⚖️ Compare Schemes — AI-generated side-by-side comparison of any two schemes
🔍 Semantic Search — Ask in plain language ("I need money for higher education") instead of knowing scheme names/acronyms
📄 Source Citations — Every AI answer references the exact document and page it came from
❤️ Saved Schemes — Bookmark and revisit favourite schemes
🔐 Secure Authentication — JWT-based login/register
⚙️ Admin Dashboard — Upload/delete/re-index scheme PDFs and view usage statistics
🗣️ Voice Search & Multilingual Support — Planned future enhancements
🏗️ System Architecture
                        User
                         │
                         ▼
                  React Frontend
                         │
              REST API (Axios)
                         │
                         ▼
                  FastAPI Backend
                         │
 ┌───────────────────────┼────────────────────────┐
 │                       │                        │
 ▼                       ▼                        ▼
 Authentication      Eligibility Engine      RAG Engine
 │                       │                        │
 ▼                       ▼                        ▼
 SQLite/Postgres      Recommendation Logic      Qdrant
                                                   │
                                                   ▼
                                             Embeddings
                                                   │
                                                   ▼
                                            Gemini / Ollama
🧠 RAG Pipeline
PDF Upload → PyMuPDF → Chunking → Embeddings → Qdrant
                                                   │
User Question → Retriever → Top-K Chunks → Gemini/Ollama → Answer + Source Citation

GovAssist AI uses a hybrid retrieval strategy:

Structured Search — fast filtering/recommendations against a metadata database (scheme name, category, state, income limit, age, eligibility)
RAG Search — Qdrant + LLM for detailed, citation-backed answers pulled directly from official scheme PDFs
🛠️ Tech Stack
Category	Technologies
Backend	FastAPI, Python
Frontend	React
AI / RAG	PyMuPDF, Custom RAG Pipeline
LLM	Gemini / Ollama
Vector Database	Qdrant
Database	SQLite / PostgreSQL
Authentication	JWT
Containerization	Docker, Docker Compose
🌐 Application Pages
Page	Description
🏠 Home	Hero section, search bar, quick links to AI chat & eligibility checker, popular schemes, categories
🤖 AI Chat	Chat with history, suggested questions, streaming responses, source citations, downloadable chat
🎯 Eligibility Checker	Multi-step wizard producing personalised scheme recommendations
📚 Scheme Explorer	Grid view of schemes by category
📄 Scheme Details	Benefits, eligibility, documents, FAQs, AI summary, apply link, similar schemes
⚖️ Compare Schemes	AI-generated comparison between two chosen schemes
❤️ Saved Schemes	Bookmarked schemes
👤 Profile	Personal details, search history, saved schemes, eligibility reports
🔐 Login / Register	JWT-based authentication
⚙️ Admin Dashboard	Upload/delete/re-index PDFs, usage statistics
⚙️ Installation
1. Clone the repository
bash
git clone https://github.com/MeghanaSri-A/GovAssist-AI.git
cd GovAssist-AI
2. Backend setup
bash
cd backend
python -m venv venv

Activate the virtual environment

Windows:

bash
venv\Scripts\activate

macOS/Linux:

bash
source venv/bin/activate

Install dependencies:

bash
pip install -r requirements.txt
3. Frontend setup
bash
cd ../frontend
npm install
🔑 Environment Variables

Create a .env file in the project root (see .env.example for reference):

DATABASE_URL=your_database_url
QDRANT_URL=your_qdrant_url
QDRANT_API_KEY=your_qdrant_api_key
GEMINI_API_KEY=your_gemini_api_key
SECRET_KEY=your_jwt_secret_key
▶️ Running the Project

With Docker Compose (recommended):

bash
docker-compose up --build

Or run manually:

Start the backend:

bash
cd backend
uvicorn app.app:app --reload

Start the frontend:

bash
cd frontend
npm run dev
📂 Project Structure
GovAssist-AI/
│
├── frontend/
│   └── src/
│       ├── assets/
│       ├── components/     # Navbar, ChatBox, SchemeCard, EligibilityCard, etc.
│       ├── pages/          # Home, Chat, Eligibility, SchemeExplorer, Compare, etc.
│       ├── services/       # api.js, auth.js, rag.js, eligibility.js
│       ├── hooks/
│       ├── context/
│       └── utils/
│
├── backend/
│   └── app/
│       ├── api/            # auth, chat, upload, schemes, eligibility, compare
│       ├── rag/             # pdf_loader, chunker, embeddings, retriever, generator
│       ├── models/          # user, scheme, chat
│       ├── database/        # database, crud
│       ├── services/        # auth, eligibility, recommendation
│       └── utils/
│
├── database/
├── documents/
├── qdrant_storage/
├── docker-compose.yml
├── .env.example
└── README.md
🗄️ Database Schema (High-Level)
Table	Key Fields
Users	id, name, email, password
Schemes	id, scheme_name, category, state, pdf_name
Chats	id, user, question, answer, time
Bookmarks	id, user, scheme
🚀 Roadmap
🎨 Polished, fully responsive UI with smooth animations
🗣️ Voice-enabled search
🌍 Multilingual support
📊 Usage analytics for the admin dashboard
📥 Downloadable eligibility & comparison reports
☁️ Production deployment (frontend + backend)
📄 License

This project is developed for educational and research purposes.

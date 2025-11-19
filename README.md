# wave-wave

Short description
A multi-part project with three main components:
- backend — API and server-side logic (Python)
- frontend — user interface (JavaScript)
- mcp_server — auxiliary/microservice component

See per-component instructions below to set up and run each part locally.

Contact for full-version testing: anatwork14@gmail.com

---

## Repo-wide prerequisites
- Git
- Python 3.8+ (or the version required by backend/mcp_server Python code)
- Node.js 14+ / npm or yarn (for frontend, if it is a JS app)
- Docker (optional, if you prefer containerized runs)

There is a `.env.example` in the repo root — copy it to `.env` and fill in required values before starting components that depend on environment variables.

---

## 1) Backend

Path: `backend/`

Initial features (based on repo layout)
- API server implemented in Python (entrypoint: `backend/main.py`)
- Database configuration helper (`backend/db_config.py`)
- Utility/helper functions (`backend/tools.py`)
- A `teacher_agent` module (in `backend/teacher_agent/`) for domain-specific logic
- Python dependencies in `backend/requirements.txt`

How to start (recommended)
1. Create and activate a virtual environment:
   - python -m venv .venv
   - On macOS/Linux: `source .venv/bin/activate`
   - On Windows (PowerShell): `.venv\Scripts\Activate.ps1`

2. Install dependencies:
   - pip install -r backend/requirements.txt

3. Configure environment:
   - Copy the root `.env.example` to `.env` (or create `backend/.env` if required)
   - Fill database URL, API keys, and other variables

4. Run the server:
   - If the project uses uvicorn or FastAPI (common pattern):
     - `cd backend`
     - `uvicorn main:app --host 0.0.0.0 --port 8000 --reload`
   - If it’s a plain script:
     - `python backend/main.py`

Notes & troubleshooting
- If you see import errors, confirm the virtualenv is active and dependencies installed.
- If the server expects a database, ensure the DB is running and credentials in `.env` match.
- Check `backend/requirements.txt` for exact package versions.

Testing backend locally
- If there are unit tests, run them with pytest:
  - `pip install pytest` (if not already)
  - `pytest` (from repo root or inside backend if tests live there)

---

## 2) Frontend

Path: `frontend/`

Initial features (inferred)
- Primary project uses Typescsript (repo composition ~99%)
- Typical frontend tasks: dev server, build, production assets

How to start (recommended)
1. Install dependencies:
   - cd frontend
   - npm install
   - or: yarn install

2. Configure environment (if needed):
   - Create a `.env` or update `frontend/.env` according to API base URL (e.g., REACT_APP_API_URL or VITE_API_URL)
   - Point API base URL to the running backend (e.g., http://localhost:8000)

3. Run in development mode:
   - npm run dev

Notes & troubleshooting
- If package.json uses different scripts, replace commands with the correct ones from `frontend/package.json`.
- If CORS issues occur, ensure the backend allows the frontend origin or use a proxy during development.

Testing frontend locally
- Run any included test script:
  - `npm test` or `yarn test`

---

## 3) mcp_server

Path: `mcp_server/`

Initial features (inferred)
- Auxiliary server/microservice. The implementation language may be Python or Node.js — inspect the folder for `requirements.txt`, `package.json`, or an entry script to be sure.
- Likely handles protocol-specific or microservice responsibilities for the main app.

How to start (guideline)
1. Inspect the directory to determine the runtime:
   - If `mcp_server/requirements.txt` exists → Python-based
   - If `mcp_server/package.json` exists → Node.js-based

2a. If Python-based:
   - python -m venv .venv-mcp
   - source .venv-mcp/bin/activate
   - pip install -r mcp_server/requirements.txt
   - Set up `.env` if required (copy from `.env.example` or create new)
   - Run (example): `python mcp_server/main.py` (adjust filename as needed)

2b. If Node-based:
   - cd mcp_server
   - npm install
   - npm start
   - or: node server.js (use the correct entrypoint filename)

Notes & troubleshooting
- If the service depends on other local services (DB, message queue), start them first.
- Check logs for port conflicts and env var errors.

---

## Running the whole system locally (recommended quick steps)
1. Start any required infrastructure (database, Redis, etc.).
2. Start the backend: follow backend steps (e.g., uvicorn on port 8000).
3. Start mcp_server (if required).
4. Start the frontend and point it to the backend API base URL.
5. Open the frontend in your browser (typically http://localhost:3000 or framework default).

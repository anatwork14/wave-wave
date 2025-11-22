from google.adk.runners import Runner
from google.adk.sessions import DatabaseSessionService, InMemorySessionService
from .agent import root_agent
import os
from dotenv import load_dotenv

load_dotenv()
APP_NAME = "teacher_agent"
VIDEO_AGENT = root_agent
# -------------------------------------------------------------
# 3. Initialize ADK Session Service and Runner 💾
# -------------------------------------------------------------
# Ensure the URL uses the async driver
db_url = os.getenv("LOCAL_POSTGRESSQL_URI")
if db_url and db_url.startswith("postgresql://") and not db_url.startswith("postgresql+asyncpg://"):
    db_url = db_url.replace("postgresql://", "postgresql+asyncpg://")

session_service = DatabaseSessionService(db_url=db_url)

ADK_RUNNER = Runner(
    agent=VIDEO_AGENT,
    app_name=APP_NAME,
    session_service=session_service
)
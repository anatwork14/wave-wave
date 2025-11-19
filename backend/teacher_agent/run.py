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
session_service = DatabaseSessionService(
    db_url=os.getenv("LOCAL_POSTGRESSQL_URI"))

ADK_RUNNER = Runner(
    agent=VIDEO_AGENT,
    app_name=APP_NAME,
    session_service=session_service
)
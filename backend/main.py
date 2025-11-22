import os
import asyncio
import json
import sys
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request, Header, Query, Depends, HTTPException
from pydantic import BaseModel, Field

from google.adk.agents.run_config import RunConfig, StreamingMode
from google.genai import types

# -------------------
from dotenv import load_dotenv
import uuid
from fastapi import HTTPException
import google.generativeai as genai
from google.genai import types
from google.adk.events.event import Event, EventActions
from google.adk.agents.invocation_context import new_invocation_context_id
# --- 1. IMPORT FIX ---
# Add the current directory to sys.path to resolve the 'tools' import issue when running Uvicorn
sys.path.append(os.path.dirname(os.path.abspath(__file__))) 
# from tools import TOOLS # Assuming the list of FunctionTools is named 'TOOLS' in tools.py
from teacher_agent.run import ADK_RUNNER
from fastapi.middleware.cors import CORSMiddleware
import asyncpg
import json
from fastapi import Request # <-- Add this import
from typing import List, Optional
import re
from datetime import datetime
import decimal # Use for 'numeric' type
import httpx
from uuid import UUID
import asyncpg
import uvicorn
from fastapi import Query
from uuid import UUID
from typing import List, Optional
load_dotenv()

app = FastAPI()
origins = [
    "http://localhost:3000",
    # You can add other origins here if needed, like your production frontend URL
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)

@app.on_event("startup")
async def startup_db_pool():
    """
    Create a database connection pool on application startup.
    """
    db_url = os.getenv("LOCAL_POSTGRESSQL_URI").replace("postgresql+asyncpg://", "postgresql://")
    if not db_url:
        raise ValueError("LOCAL_POSTGRESSQL_URI environment variable not set.")
    try:
        app.state.db_pool = await asyncpg.create_pool(
            db_url,
            min_size=1,
            max_size=10
        )
        print("Database connection pool created.")
    except Exception as e:
        print(f"Error creating database pool: {e}")

@app.on_event("shutdown")
async def shutdown_db_pool():
    """
    Close the database connection pool on application shutdown.
    """
    if app.state.db_pool:
        await app.state.db_pool.close()
        print("Database connection pool closed.")
# Global variable for the application name
APP_NAME = "teacher_agent"

try:
    genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
except AttributeError as e:
    print("ERROR: GOOGLE_API_KEY environment variable not set.")
    # Handle the error appropriately

async def get_gemini_summary(user_query: str, agent_response: str) -> str:
    """
    Calls the Gemini API directly to generate a session title summary.
    """
    
    # 2. Get model name from the same environment variable
    model_name = os.getenv("LLM_MODEL", "gemini-1.5-flash") # Default to flash
    
    # 3. Define the instruction and prompt
    system_instruction = (
        "You are given user query and other agent response, your task is to create a "
        "summarization of these for the title of the session in AI Agent Application. "
        "The title must be very concise, less than 15 words."
    )
    
    user_prompt = f"""
    User Query:
    {user_query}

    Agent Response:
    {agent_response}

    Session Title:
    """
    
    try:
        # 4. Initialize the model
        model = genai.GenerativeModel(
            model_name=model_name,
            system_instruction=system_instruction
        )
        
        # 5. Make the asynchronous API call
        response = await model.generate_content_async(user_prompt)
        
        summary_text = response.text.strip()
        
        if not summary_text:
            raise Exception("LLM returned an empty summary")
            
        return summary_text
    
    except Exception as e:
        print(f"Error during Gemini API summary call: {e}")
        # Fallback to a simple f-string summary if the API call fails
        return f"Summary: {user_query[:50]}..."

class UserResponse(BaseModel):
  """The user data returned to the client after successful login."""
  id: int
  name: str
  email: str
  user_image: Optional[str] = None
  created_at: Optional[datetime] = None
  
  class Config:
    orm_mode = True 

class GoogleTokenRequest(BaseModel):
  """The request body for the Google token login."""
  access_token: str
# -------------------------------------------------------------
# Pydantic Model for the Text Chat API Request Body
# -------------------------------------------------------------
class TextQuery(BaseModel):
    """The input structure for the text chat REST API."""
    user_id: str
    message: str
    session_id: str | None = None 
# -------------------------------------------------------------
# Pydantic Models for the Get Sessions API Response
# -------------------------------------------------------------
class SessionInfo(BaseModel):
    """The brief details of a single chat session."""
    id: str
    title: str
    actor: str
    time: str

class SessionList(BaseModel):
    """The response model for a list of chat sessions."""
    sessions: list[SessionInfo]

class EventMessage(BaseModel):
    """A single chat message from the event history."""
    role: str
    content: str
    video: str | None

class EventList(BaseModel):
    """The response model for a list of chat messages."""
    events: List[EventMessage]

class SyllabusInfo(BaseModel):
    """Brief details of a single syllabus."""
    id: int
    title: str
    description: str | None
    progress: float
    status: str
    lesson_count: int

class SyllabusList(BaseModel):
    """The response model for a list of syllabuses."""
    syllabuses: list[SyllabusInfo]

class LessonInfo(BaseModel):
    """Details of a lesson, including vocab and quiz counts."""
    id: int
    title: str
    vocabulary_count: int
    description: str
    lesson_status: str

class LessonList(BaseModel):
    """The response model for a list of lessons."""
    lessons: list[LessonInfo]

class VocabularyItem(BaseModel):
    """Details of a single vocabulary word."""
    id: int
    word: str
    description: str
    video_url: str

class VocabularyList(BaseModel):
    """The response model for a list of vocabulary items."""
    vocabulary: list[VocabularyItem]
class UserSyllabusRequest(BaseModel):
    user_id: int 

# Model for the success response
class AssignSyllabusResponse(BaseModel):
    message: str
    syllabuses_added_count: int    

# --- 🚀 NEW QUIZ MODELS ---
class QuizInfo(BaseModel):
    """Detailed information about a single quiz."""
    id: int
    title: str
    lesson_id: Optional[int] = None
    updated_at: str
    # Add any other quiz fields you need, e.g., created_at

class QuizList(BaseModel):
    """A list of quizzes."""
    quizzes: List[QuizInfo]

class AddQuizRequest(BaseModel):
    """Request body to add a quiz to a user."""
    user_id: int
    quiz_id: int

class AddQuizResponse(BaseModel):
    """Response after adding a quiz to a user."""
    message: str
    user_id: int
    quiz_id: int

class VocabItem(BaseModel):
    word: str
    description: str
    video: str # Giữ nguyên như frontend của bạn

class QuizGenerationRequest(BaseModel):
    lesson_id: int
    lesson_title: str
    user_id: str # Phải khớp với 'user_id' trong TextQuery
    vocabulary: List[VocabItem]
    session_id: str | None = None # Thêm session_id để có thể tiếp tục hội thoại

class OptionData(BaseModel):
    """Định nghĩa một lựa chọn trả lời (answer option)"""
    id: int
    option_text: str
    is_correct: bool

class QuestionData(BaseModel):
    """Định nghĩa một câu hỏi đầy đủ, bao gồm các lựa chọn"""
    id: int
    question_text: str
    type: str
    video: Optional[str] = None # <- SỬA 1: Cho phép video là None
    options: List[OptionData]

class QuestionList(BaseModel):
    """Model phản hồi cho API, chứa một danh sách câu hỏi"""
    quiz_id: Optional[int] = None
    questions: List[QuestionData]
    
class QuizSubmissionRequest(BaseModel):
    """
    Thông tin cần thiết để nộp bài quiz.
    """
    quiz_id: int  # Đây là cột 'id' (PK) từ bảng quiz_user
    user_id: int
    score: float    # Điểm số, ví dụ: 95.50
    lesson_id: int

class QuizSubmissionResponse(BaseModel):
    """
    Phản hồi xác nhận đã nộp bài.
    """
    message: str
    quiz_id: int
    new_status: str
    score: float

class UserSyllabusRequest(BaseModel):
    """Request model containing the user_id."""
    user_id: int
    syllabus_id: int | None = None  # <-- ADD THIS LINE

class SyncLessonResponse(BaseModel):
    """Response model for the lesson sync operation."""
    message: str
    lessons_synced_count: int

class EnrollSyllabusRequest(BaseModel):
    """Defines the input for the enrollment API."""
    user_id: int
    syllabus_id: int

class EnrollSyllabusResponse(BaseModel):
    """Defines the response for the enrollment API."""
    message: str
    lessons_added_count: int
    
class UserQuizDetails(BaseModel):
    quiz_id: int
    title: str
    description: Optional[str]
    lesson_id: int
    user_quiz_id: int  # The 'id' from the quiz_user table
    score: Optional[decimal.Decimal]
    status: str
    started_at: datetime
    submitted_at: Optional[datetime]

class UserQuizListResponse(BaseModel):
    quizzes: List[UserQuizDetails]
    
class OptionResponse(BaseModel):
    id: int
    question_id: int
    option_text: str
    is_correct: bool
class AssignQuizResponse(BaseModel):
    """Response model for the quiz sync operation."""
    message: str
    quizzes_added_count: int
class QuestionResponse(BaseModel):
    id: int
    quiz_id: int
    question_text: str
    options: List[OptionResponse] # Nested list of options
class GoogleTokenRequest(BaseModel):
    """The request body for the Google token login."""
    access_token: str

class LearningPreferenceIn(BaseModel):
    """
    Pydantic model for creating a new learning preference.
    Matches the fields from your form.
    """
    user_id: int
    learning_goal: Optional[str] = None
    available_time: Optional[str] = None
    schedule: Optional[str] = None
    expectations: Optional[str] = None
    skill: Optional[int] = None

class LearningPreferenceOut(LearningPreferenceIn):
    """
    Pydantic model for returning a preference from the database.
    """
    id: int
    user_id: int
    learning_goal: Optional[str] = None
    available_time: Optional[str] = None
    schedule: Optional[str] = None
    expectations: Optional[str] = None
    skill: Optional[int] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        orm_mode = True

class SkillUpdateIn(BaseModel):
    """
    Pydantic model for the special skill-only update endpoint.
    """
    user_id: int
    skill: int

class SkillUpdateOut(BaseModel):
    """
    Pydantic model for the response after updating a skill.
    """
    message: str
    preference_id: int
    new_skill_level: int

class PostAuthor(BaseModel):
    id: int
    name: str
    email: str
    avatar: Optional[str] = None
    isFollowing: bool
    # Bạn có thể thêm 'email: str' ở đây, HOẶC làm như sau:

    class Config:
        from_attributes = True
        extra = 'ignore'  # <-- SỬA LỖI: Bỏ qua trường 'email' thừa

class PostQuiz(BaseModel):
    id: int
    title: str
    questionCount: int
    difficulty: str

    class Config:
        from_attributes = True # <-- Thêm vào để nhất quán
        extra = 'ignore'

class PostSyllabus(BaseModel):
    id: int
    title: str
    lessonCount: int
    duration: Optional[str] = None

    class Config:
        from_attributes = True # <-- Thêm vào để nhất quán
        extra = 'ignore'

# --- Mô hình cho Post ---
class PostOut(BaseModel):
    """Mô hình cho một bài viết trả về (giống func_fetch_posts)"""
    id: UUID
    title: str
    content: str
    image: Optional[str] = None
    category: str
    views: int
    created_at: datetime
    likes_count: int
    comments_count: int
    shares_count: int
    tags: List[str]
    author: PostAuthor
    quiz: Optional[PostQuiz] = None
    syllabus: Optional[PostSyllabus] = None
    is_liked: bool
    bookmarked: bool

    class Config:
        from_attributes = True # Dòng này của bạn đã đúng

class PostCreate(BaseModel):
    """Mô hình để TẠO một bài viết mới"""
    title: str
    content: str
    category: str = Field(..., example="Blog")
    image: Optional[str] = None
    quiz_id: Optional[int] = None
    syllabus_id: Optional[int] = None
    tag_names: List[str] = Field(default=[], example=["Học tập", "Chia sẻ"])

class CommentCreate(BaseModel):
    """Mô hình để TẠO một bình luận mới"""
    content: str
    parent_comment_id: Optional[UUID] = None

class CommentOut(BaseModel):
    """Mô hình cho bình luận trả về (giống func_fetch_comments)"""
    id: UUID
    content: str
    created_at: datetime
    parent_comment_id: Optional[UUID] = None
    author: PostAuthor # Tái sử dụng PostAuthor cho gọn

    class Config:
        from_attributes = True

# --- Mô hình cho Query Params (GET /posts) ---
class FetchPostsParams(BaseModel):
    """Mô hình cho các tham số truy vấn của func_fetch_posts"""
    category: Optional[str] = None
    tags: Optional[List[str]] = Query(None) # Dùng Query để nhận mảng từ URL
    search_query: Optional[str] = None
    sort_by: str = "recent"
    limit: int = 20
    offset: int = 0
    
    # Chuyển đổi 'tags' thành mảng rỗng nếu là None (dễ cho SQL)
    def __init__(self, **data):
        super().__init__(**data)
        if self.tags is None:
            self.tags = []

class FullVocabularyItem(BaseModel):
    """Chi tiết đầy đủ của một từ vựng, bao gồm topic_id."""
    id: int
    original_id: str | None = None # Giữ lại ID string gốc
    topic_id: Optional[int] = None
    word: str
    instruction: str
    video: str | None = None

class AllWordsList(BaseModel):
    """Mô hình phản hồi cho API lấy tất cả từ vựng."""
    vocabulary: List[FullVocabularyItem]

class SearchWordTopicResponse(BaseModel):
    """Mô hình phản hồi cho API tìm kiếm từ."""
    search_result: FullVocabularyItem
    related_words: List[FullVocabularyItem]
# --- END NEW QUIZ MODELS ---

@app.post("/api/auth/google/token", response_model=UserResponse)
async def google_login_with_token(
    token_request: GoogleTokenRequest,
    app_request: Request
):
    """
    Handles Google Sign-In using an access_token from the frontend.
    1. Verifies the token by using it to fetch the user's profile.
    2. Finds an existing user or creates a new one (UPSERT).
    """
    
    # 1. Define the Google user info endpoint
    userinfo_url = "https://www.googleapis.com/oauth2/v3/userinfo"
    
    # 2. Use the token to get the user's info
    try:
        async with httpx.AsyncClient() as client:
            headers = {"Authorization": f"Bearer {token_request.access_token}"}
            response = await client.get(userinfo_url, headers=headers)
            
            # If the token is invalid or expired, Google will return an error
            response.raise_for_status() 
            
            user_info = response.json()

    except httpx.HTTPStatusError as e:
        print(f"Token verification failed: {e}")
        raise HTTPException(
            status_code=401,
            detail=f"Invalid Google token. Status: {e.response.status_code}"
        )
    except Exception as e:
        print(f"An unexpected error occurred during token verification: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred: {e}"
        )

    # 3. Extract user information from the Google response
    user_email = user_info.get("email")
    user_name = user_info.get("name")
    user_picture = user_info.get("picture")

    if not user_email:
        raise HTTPException(
            status_code=400,
            detail="Email not found in Google profile."
        )

    # 4. Find or Create User (UPSERT)
    # This is the *exact same* logic from your old endpoint
    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            upsert_query = """
                INSERT INTO users (name, email, user_image, created_at)
                VALUES ($1, $2, $3, NOW())
                ON CONFLICT (email)
                DO UPDATE SET
                    name = EXCLUDED.name,
                    user_image = EXCLUDED.user_image,
                    created_at = COALESCE(users.created_at, NOW())
                RETURNING id, name, email, user_image, created_at;
            """
            
            user_record = await connection.fetchrow(
                upsert_query,
                user_name,
                user_email,
                user_picture
            )

            if not user_record:
                raise HTTPException(status_code=500, detail="Could not create or find user.")

            # 5. Return the user data
            return UserResponse(
                id=user_record["id"],
                name=user_record["name"],
                email=user_record["email"],
                user_image=user_record["user_image"],
                created_at=user_record["created_at"]
            )
            
    except Exception as e:
        print(f"Database error during login for {user_email}: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Database error while processing user. Error: {e}"
        )
@app.get("/api/sessions/{user_id}", response_model=SessionList)
# 2. The function MUST accept "user_id" as an argument
async def get_sessions(user_id: str, app_request: Request):
    """
    Retrieves all chat sessions for a given user (passed as a query parameter).
    """
    formatted_sessions = []
    try:
        # 1. Get a connection from the pool
        async with app_request.app.state.db_pool.acquire() as connection:
            
            # 2. Define the SQL query
            query = """
                SELECT *
                FROM sessions
                WHERE user_id = $1
                ORDER BY update_time DESC
            """
            
            # 3. Execute the query
            records = await connection.fetch(query, user_id)

        # 4. Format the results
        for record in records:
            state = json.loads(record['state']) if record['state'] else {}
            title = state.get("session_summary", "Untitled Chat")
            actor = record["app_name"]
            time_str = state.get("summary_timestamp")
            if not time_str:
                time_str = record['update_time'].isoformat()
                
            formatted_sessions.append(
                SessionInfo(
                    id=record['id'],
                    title=title,
                    actor=actor,
                    time=time_str
                )
            )
        
        return SessionList(sessions=formatted_sessions)

    except Exception as e:
        print(f"Error listing sessions for user {user_id}: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Could not retrieve sessions. Error: {e}"
        )

@app.get("/api/sessions/{user_id}/{session_id}", response_model=EventList)
async def get_events_of_session(session_id: str, app_request: Request):
    """
    Retrieves all chat messages for a single session directly from the database.
    """
    formatted_events = []
    try:
        # 1. Get a connection from the pool
        async with app_request.app.state.db_pool.acquire() as connection:
            
            # 2. Define the SQL query
            # This query selects the text content from the JSON 'content' column
            # and maps the 'author' to either 'user' or 'assistant'.
            query = """
                SELECT
                    CASE
                        WHEN author = 'user' THEN 'user'
                        ELSE 'assistant'
                    END AS role,
                    (content -> 'parts' -> 0 ->> 'text') AS content
                FROM
                    events  -- ⚠️ Make sure this is your table name!
                WHERE
                    session_id = $1
                    -- This filters out system messages (like summaries)
                    AND (content -> 'parts' -> 0 ->> 'text') IS NOT NULL
                ORDER BY
                    timestamp ASC
            """
            
            # 3. Execute the query
            records = await connection.fetch(query, session_id)
        # 4. Format the results
        for record in records:
            print(record)
            match = re.search(
                r"https?://[^\s)>\]]+\.mp4",  # match any .mp4 URL
                record['content']
            )
            if match:
                video_url = match.group(0)
                print(f"[Info] Extracted video URL via regex: {video_url}")
                formatted_events.append(
                    EventMessage(
                        role=record['role'],
                        content=record['content'],
                        video= video_url
                    )
                )
            else:
                formatted_events.append(
                    EventMessage(
                        role=record['role'],
                        content=record['content'],
                        video=None
                    )
                )
                
        
        return EventList(events=formatted_events)

    except Exception as e:
        print(f"Error getting events for session {session_id}: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Could not retrieve session events. Error: {e}"
        )
# -------------------------------------------------------------
# 4A. WebSocket Endpoint for Bidi-Streaming Video 🎥 (No changes needed)
# -------------------------------------------------------------
@app.websocket("/ws/video-stream/{user_id}/{session_id}") 
async def websocket_endpoint(
    websocket: WebSocket,
    # 🎯 FIX 2: Accept them directly as function arguments
    user_id: str, 
    session_id: str
):
    await websocket.accept()

    run_config = RunConfig(streaming_mode=StreamingMode.BIDI)
    live_request_queue = None

    try:
        # 1. Determine Session ID: Use the provided session_id
        # We assume the client provides a UUID or "new" for the first message
        if session_id:
            SESSION_ID = session_id
        else:
            SESSION_ID = str(uuid.uuid4())
        
        # 2. Get or Create Session
        # Use create_session for idempotent creation/retrieval
        if session_id:
            session = await ADK_RUNNER.session_service.get_session(
                app_name=APP_NAME,
                user_id=user_id,
                session_id=SESSION_ID
            )
        else:
                session = await ADK_RUNNER.session_service.create_session(
                app_name=APP_NAME,
                user_id=user_id,
                session_id=SESSION_ID
            )
        
        # 3. Start the Live Session
        live_events, live_request_queue = await ADK_RUNNER.start_live_session(
            session=session,
            run_config=run_config
        )

        # Task A: Sends data from the Agent to the Frontend
        async def agent_to_client():
            async for event in live_events:
                if event.content and event.content.parts:
                    for part in event.content.parts:
                        if part.text:
                            response_data = {"type": "text_analysis", "data": part.text}
                            await websocket.send_text(json.dumps(response_data))

        # Task B: Sends data (video frames) from the Frontend to the Agent
        async def client_to_agent():
            async for message in websocket.iter_bytes():
                video_frame_part = types.Part(data=message, mime_type="image/jpeg") 
                content = types.Content(role="user", parts=[video_frame_part])
                
                await live_request_queue.send_content(content=content)

        # Wait for both client and agent tasks to complete
        await asyncio.gather(agent_to_client(), client_to_agent())

    except WebSocketDisconnect:
        print(f"Client {user_id} disconnected.")
    except Exception as e:
        print(f"Streaming error for user {user_id}: {e}")
        error_msg = {"type": "error", "data": str(e)}
        await websocket.send_text(json.dumps(error_msg))
    finally:
        if live_request_queue and not live_request_queue.closed:
            await live_request_queue.close()
        if websocket.client_state != 3: 
             await websocket.close()

# -------------------------------------------------------------
# 4B. REST API Endpoint for Text Interaction 💬 (FIX APPLIED HERE)
# -------------------------------------------------------------
def _run_adk_sync(user_id: str, session_id: str, new_message: types.Content) -> str:
    """
    Synchronous wrapper to run the ADK.run() generator in a thread.
    """
    final_response_text = ""
    try:
        # This is your original blocking loop
        for event in ADK_RUNNER.run(
            user_id=user_id,
            session_id=session_id,
            new_message=new_message
        ):
            if event.is_final_response():
                texts = [part.text for part in event.content.parts if part.text]
                final_response_text = "".join(texts)
                break
        return final_response_text.strip()
    except Exception as e:
        print(f"Error during synchronous ADK run: {e}")
        # Propagate error text to the client
        return f"An error occurred while processing your request: {e}"

@app.post("/api/chat", response_model=dict)
async def chat_endpoint(query: TextQuery):
    
    # 1. Determine Session ID
    if query.session_id:
        SESSION_ID = query.session_id
    else:
        SESSION_ID = str(uuid.uuid4())
        
    # 2. Get or Create Session
    try:
        if query.session_id:
            session = await ADK_RUNNER.session_service.get_session(
                app_name=APP_NAME,
                user_id=query.user_id,
                session_id=SESSION_ID
            )
        else:
            session = await ADK_RUNNER.session_service.create_session(
                app_name=APP_NAME,
                user_id=query.user_id,
                session_id=SESSION_ID
            )
    except Exception as e:
        print(f"Error creating/retrieving session {SESSION_ID}: {e}")
        raise HTTPException(
            status_code=500,
            detail={"error": "Could not start or resume session. Check server logs."}
        )

    # 3. Create Content
    user_part = types.Part(text=query.message)
    user_content = types.Content(role='user', parts=[user_part])
    
    # --- THIS IS THE FIX ---
    # Run the blocking code in a separate thread to not block the event loop
    final_response_text = await asyncio.to_thread(
        _run_adk_sync,  # The wrapper function
        query.user_id,
        SESSION_ID,
        user_content
    )
    # --- END OF FIX ---

    # 4. "FIRST-TIME-ONLY" LLM SUMMARY LOGIC
    if session.state is None:
        session.state = {}

    if "session_summary" not in session.state:
        print(f"First event for session {SESSION_ID}. Generating LLM summary...")

        session_summary = await get_gemini_summary(
            user_query=query.message,
            agent_response=final_response_text
        )
        
        state_delta = {"session_summary": session_summary}

        try:
            summary_event = Event(
                invocation_id=new_invocation_context_id(),
                author="system",
                actions=EventActions(state_delta=state_delta),
            )
            await ADK_RUNNER.session_service.append_event(session=session, event=summary_event)
            print(f"✅ Summary saved into session state for {SESSION_ID}: {session_summary}")
        except Exception as e:
            print(f"⚠️ Warning: Failed to append summary event for session {SESSION_ID}: {e}")

    # 5. Return the Response
    return {
        "user_id": query.user_id,
        "session_id": session.id,
        "response": final_response_text, # .strip() is now done in the wrapper
    }


@app.post("/api/generate-quiz", response_model=dict)
async def generate_quiz_endpoint(query: QuizGenerationRequest):
    """
    Nhận dữ liệu quiz có cấu trúc, xây dựng một prompt đặc biệt,
    và gọi AI Agent (ADK_RUNNER) để xử lý.
    """
    
    # 1. Xây dựng Prompt cho Agent (Làm ở backend, không phải frontend)
    # Chuyển danh sách từ vựng thành một chuỗi JSON
    vocab_json_string = json.dumps([v.dict() for v in query.vocabulary])

    # Đây là prompt mà Agent (mục 5 trong instruction của bạn) sẽ nhận được
    prompt_message = f"""Hãy giúp tôi tạo quiz cho bài học {query.lesson_id} với title là {query.lesson_title} và user_id là {query.user_id} và các từ vựng: {vocab_json_string}"""
    
    print(f"[Info] Đã nhận yêu cầu tạo quiz. Tạo prompt cho agent...")

    # --- TỪ ĐÂY, LOGIC GIỐNG HỆT /api/chat ---

    # 2. Xác định Session ID
    if query.session_id:
        SESSION_ID = query.session_id
    else:
        SESSION_ID = str(uuid.uuid4())
        
    # 3. Lấy hoặc Tạo Session
    try:
        if query.session_id:
            session = await ADK_RUNNER.session_service.get_session(
                app_name=APP_NAME,
                user_id=query.user_id,
                session_id=SESSION_ID
            )
        else:
            session = await ADK_RUNNER.session_service.create_session(
                app_name=APP_NAME,
                user_id=query.user_id,
                session_id=SESSION_ID
            )
    except Exception as e:
        print(f"Error creating/retrieving session {SESSION_ID}: {e}")
        raise HTTPException(
            status_code=500,
            detail={"error": "Could not start or resume session. Check server logs."}
        )

    # 4. Tạo Content (Sử dụng prompt đã xây dựng)
    user_part = types.Part(text=prompt_message)
    user_content = types.Content(role='user', parts=[user_part])
    
    # 5. Gọi Agent (ADK_RUNNER)
    final_response_text = await asyncio.to_thread(
        _run_adk_sync,  # Hàm wrapper đồng bộ của bạn
        query.user_id,
        SESSION_ID,
        user_content
    )

    # 6. Trả về Phản Hồi (KHÔNG cần logic summary)
    # Agent sẽ trả về một chuỗi JSON {"action": "create_quiz", "payload": ...}
    # Chúng ta chỉ cần trả chuỗi đó về frontend.
    return {
        "user_id": query.user_id,
        "session_id": session.id,
        "response": final_response_text, 
    }

class CurriculumGenerationRequest(BaseModel):
    user_id: str
    query: str


# ---------------------------
# 🚀 Endpoint
# ---------------------------
import traceback

@app.post("/api/generate-curriculum", response_model=dict)
async def generate_curriculum_endpoint(request: CurriculumGenerationRequest):
    print(f"[Info] Received curriculum generation request for user {request.user_id}")
    prompt_message = request.query.strip()
    SESSION_ID = str(uuid.uuid4())

    # 3️⃣ Create session
    try:
        session = await ADK_RUNNER.session_service.create_session(
            app_name=APP_NAME,
            user_id=request.user_id,
            session_id=SESSION_ID
        )
        print(f"[Session] Created session: {session}")
    except Exception as e:
        print(f"❌ Error creating session: {e}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

    # 4️⃣ Run agent
    try:
        user_part = types.Part(text=prompt_message)
        user_content = types.Content(role="user", parts=[user_part])
        final_response_text = await asyncio.to_thread(
            _run_adk_sync,
            request.user_id,
            getattr(session, "id", SESSION_ID),
            user_content,
        )
    except Exception as e:
        print("❌ Error running AI Agent:")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

    print("[✅ Done] Returning AI curriculum")
    return {
        "user_id": request.user_id,
        "session_id": getattr(session, "id", SESSION_ID),
        "response": final_response_text,
    }
# -------------------------------------------------------------
# 📚 SYLLABUS & LESSON API ENDPOINTS
# -------------------------------------------------------------
@app.post("/api/user/enroll-syllabus", response_model=EnrollSyllabusResponse)
async def enroll_user_in_syllabus(
    request_data: EnrollSyllabusRequest,
    app_request: Request
):
    """
    Enrolls a user in a specific syllabus and populates all corresponding
    lessons in the user_lesson table.
    
    This operation is atomic:
    1. Adds the user to user_syllabus (if not already enrolled).
    2. Adds all lessons from that syllabus to user_lesson (if not already added).
    """
    user_id = request_data.user_id
    syllabus_id = request_data.syllabus_id
    lessons_added_count = 0

    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            # Use a transaction to ensure both operations succeed or fail together
            async with connection.transaction():
                
                # --- Step 1: Add user to the syllabus ---
                # We use ON CONFLICT to make this safe to re-run.
                # Assumes 'in-progress' is the desired default status.
                print(f"Enrolling user {user_id} in syllabus {syllabus_id}...")
                insert_syllabus_query = """
                    INSERT INTO user_syllabus 
                        (user_id, syllabus_id, enrolled_at, progress, status)
                    VALUES 
                        ($1, $2, NOW(), 0, 'in-progress')
                    ON CONFLICT (user_id, syllabus_id) DO NOTHING;
                """
                await connection.execute(insert_syllabus_query, user_id, syllabus_id)
                
                # --- Step 2: Add all lessons from that syllabus to user_lesson ---
                # This query selects all lessons for the *specific* syllabus_id
                # and inserts them for the *specific* user_id.
                print(f"Syncing lessons for user {user_id} from syllabus {syllabus_id}...")
                sync_lessons_query = """
                    INSERT INTO user_lesson (user_id, lesson_id, status)
                    SELECT
                        $1 AS user_id,
                        l.id AS lesson_id,
                        'not_start' AS status
                    FROM 
                        lesson l
                    WHERE 
                        l.syllabus_id = $2
                    -- This prevents creating duplicates if a lesson entry already exists
                    ON CONFLICT (user_id, lesson_id) DO NOTHING;
                """
                
                status_str = await connection.execute(sync_lessons_query, user_id, syllabus_id)
                
                # Parse the number of newly inserted lessons
                try:
                    lessons_added_count = int(status_str.split(" ")[-1])
                except (ValueError, IndexError):
                    print(f"Could not parse insert count from status: {status_str}")
                    lessons_added_count = 0

        print(f"Enrollment success for user {user_id}, syllabus {syllabus_id}. Added {lessons_added_count} new lessons.")
        return EnrollSyllabusResponse(
            message=f"User {user_id} successfully enrolled in syllabus {syllabus_id}.",
            lessons_added_count=lessons_added_count
        )

    except asyncpg.exceptions.ForeignKeyViolationError as e:
        print(f"Foreign key violation for user {user_id} or syllabus {syllabus_id}: {e}")
        raise HTTPException(
            status_code=404,
            detail=f"User with ID {user_id} or Syllabus with ID {syllabus_id} not found."
        )
    except Exception as e:
        print(f"Could not enroll user {user_id} in syllabus {syllabus_id}: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"An internal error occurred. Error: {e}"
        )
@app.post("/api/user/assign-default-syllabuses", response_model=AssignSyllabusResponse)
async def assign_default_syllabuses(
    request_data: UserSyllabusRequest,
    app_request: Request
):
    """
    Assigns default syllabuses (2–11) to a user if they don't have any.
    Also ensures user_lesson entries exist for each lesson in these syllabuses,
    initializing them with status 'not_start'.
    """
    user_id = request_data.user_id
    syllabuses_added_count = 0
    lessons_added_count = 0

    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            # Use a transaction to make everything atomic
            async with connection.transaction():
                
                # Step 1: Check if the user already has any syllabus entries
                exists_syllabus = await connection.fetchval(
                    "SELECT 1 FROM user_syllabus WHERE user_id = $1 LIMIT 1",
                    user_id
                )

                # Step 2: If no syllabus, insert default syllabuses 2–11
                if not exists_syllabus:
                    insert_syllabuses_query = """
                        INSERT INTO user_syllabus (user_id, syllabus_id, enrolled_at, progress, status)
                        SELECT 
                            $1 AS user_id,
                            id AS syllabus_id,
                            NOW() AS enrolled_at,
                            0 AS progress,
                            CASE
                                WHEN id = 2 THEN 'in-progress'
                                WHEN id = 3 THEN 'upcoming'
                                WHEN id BETWEEN 4 AND 11 THEN 'locked'
                            END AS status
                        FROM syllabus
                        WHERE id BETWEEN 2 AND 11;
                    """
                    status = await connection.execute(insert_syllabuses_query, user_id)
                    try:
                        syllabuses_added_count = int(status.split(" ")[-1])
                    except Exception:
                        syllabuses_added_count = 10

                # Step 3: Check if the user has any user_lesson entries
                exists_lessons = await connection.fetchval(
                    "SELECT 1 FROM user_lesson WHERE user_id = $1 LIMIT 1",
                    user_id
                )

                # Step 4: If no lessons, insert all lessons from syllabus 2–11
                if not exists_lessons:
                    insert_lessons_query = """
                        INSERT INTO user_lesson (user_id, lesson_id, status)
                        SELECT 
                            $1 AS user_id,
                            l.id AS lesson_id,
                            'not_start' AS status
                        FROM lesson l
                        JOIN syllabus s ON s.id = l.syllabus_id
                        WHERE s.id BETWEEN 2 AND 11;
                    """
                    status = await connection.execute(insert_lessons_query, user_id)
                    try:
                        lessons_added_count = int(status.split(" ")[-1])
                    except Exception:
                        # fallback
                        lessons_added_count = 0

        return AssignSyllabusResponse(
            message=f"Assigned default syllabuses and lessons for user {user_id}.",
            syllabuses_added_count=syllabuses_added_count
        )

    except asyncpg.exceptions.ForeignKeyViolationError as e:
        raise HTTPException(
            status_code=404,
            detail=f"User with ID {user_id} or syllabuses/lessons not found. {e}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Could not assign default syllabuses/lessons. Error: {e}"
        )

@app.post("/api/user/sync-lessons", response_model=SyncLessonResponse)
async def sync_user_lessons(
    user_id: int,
    app_request: Request
):
    """
    Synchronizes the user_lesson table based on the user's enrollments
    in user_syllabus.
    
    This ensures that for every syllabus a user is enrolled in, they have a
    corresponding entry for all lessons in that syllabus in the user_lesson table,
    initializing them with 'not_start' status if they don't exist.
    """
    lessons_added_count = 0

    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            # Use a transaction for a single atomic operation
            async with connection.transaction():
                
                # This single query handles all the logic:
                # 1. Finds all syllabuses for the user (FROM user_syllabus)
                # 2. Finds all lessons for those syllabuses (JOIN lesson)
                # 3. Inserts them into user_lesson
                # 4. Skips any (user_id, lesson_id) pairs that already exist
                
                sync_lessons_query = """
                    INSERT INTO user_lesson (user_id, lesson_id, status)
                    SELECT
                        us.user_id,
                        l.id AS lesson_id,
                        'not_start' AS status
                    FROM 
                        user_syllabus us
                    JOIN 
                        lesson l ON l.syllabus_id = us.syllabus_id
                    WHERE 
                        us.user_id = $1
                        -- This condition explicitly checks that the row does not exist
                        AND NOT EXISTS (
                            SELECT 1 
                            FROM user_lesson ul
                            WHERE ul.user_id = us.user_id AND ul.lesson_id = l.id
                        );
                """
                
                status_str = await connection.execute(sync_lessons_query, user_id)
                
                # Parse the number of rows inserted from the status string (e.g., "INSERT 0 15")
                try:
                    lessons_added_count = int(status_str.split(" ")[-1])
                except (ValueError, IndexError):
                    print(f"Could not parse insert count from status: {status_str}")
                    lessons_added_count = 0 # Default to 0 if parsing fails

        print(f"Synced {lessons_added_count} new lessons for user {user_id}.")
        return SyncLessonResponse(
            message=f"Successfully synchronized lessons for user {user_id}.",
            lessons_synced_count=lessons_added_count
        )

    except asyncpg.exceptions.ForeignKeyViolationError as e:
        print(f"Foreign key violation for user {user_id}: {e}")
        raise HTTPException(
            status_code=404,
            detail=f"User with ID {user_id} not found or related data is missing. {e}"
        )
    except Exception as e:
        print(f"Could not sync user lessons for user {user_id}: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"An internal error occurred. Error: {e}"
        )

@app.get("/api/syllabuses", response_model=SyllabusList)
async def get_user_syllabuses(
    app_request: Request,
    user_id: int, 
    syllabus_id: int | None = None, 
):
    """
    Retrieves the syllabuses for a specific user.
    If the user has no syllabuses, the default set is assigned first.
    """
    try:
        # Step 1: Call your "check and assign" function first.
        # We create the request object that the function expects.
        user_data_request = UserSyllabusRequest(user_id=user_id)
        
        # We await the function, ensuring the user has syllabuses
        # before we proceed.        
        await assign_default_syllabuses(
            request_data=user_data_request,
            app_request=app_request
        )
        
        if syllabus_id is not None:
            # Create the correct Pydantic model for the request,
            # assuming it's 'UserSyllabusRequest' and requires both fields.
            enroll_request_data = UserSyllabusRequest(
                user_id=user_id,
                syllabus_id=syllabus_id
            )
            
            await enroll_user_in_syllabus(
                request_data=enroll_request_data,
                app_request=app_request
            )
        
        await sync_user_lessons(
            user_id=user_id,
            app_request=app_request
        )

        await assign_default_quizzes(
            user_id=user_id, # Re-use the user_id request
            app_request=app_request
        )
        # Step 2: Now that we know the user has syllabuses, fetch them
        # with all the required info.
        async with app_request.app.state.db_pool.acquire() as connection:
            
            # This query starts from user_syllabus to get only the ones
            # for that user, then joins syllabus and lesson for the details.
            query = """
                SELECT
                    s.id,
                    s.title,
                    s.description,
					us.progress,
					us.status,
                    COUNT(l.id) AS lesson_count
                FROM
                    user_syllabus us
                JOIN
                    syllabus s ON us.syllabus_id = s.id
                LEFT JOIN
                    lesson l ON s.id = l.syllabus_id
                WHERE
                    us.user_id = $1 and s.id >= 2
                GROUP BY
                    s.id, s.title, s.description, us.progress, us.status
                ORDER BY
                    s.title;
            """

            # Pass the user_id from the query parameter into the SQL query
            records = await connection.fetch(query, user_id)
            
            # Step 3: Format the results (this is the same as before)
            syllabuses = [
                SyllabusInfo(
                    id=r['id'],
                    title=r['title'],
                    description=r['description'],
                    progress=r['progress'],
                    status=r['status'],
                    lesson_count=r['lesson_count']
                ) for r in records
            ]
            
            return SyllabusList(syllabuses=syllabuses)

    except Exception as e:
        print(f"Error getting user syllabuses: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Could not retrieve syllabuses for user {user_id}. Error: {e}"
        )

@app.get("/api/syllabuses/{syllabus_id}/lessons", response_model=LessonList)
async def get_lessons_for_syllabus(syllabus_id: int, user_id: int, app_request: Request):
    """
    Retrieves all lessons for a specific syllabus.
    
    Includes:
    - Number of vocabulary items per lesson.
    - Number of quiz questions per lesson.
    """
    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            # This is a more complex query to get counts for vocab and questions
            # for each lesson in one go.
            query = """
                SELECT
                    l.id,
                    l.title,
                    l.description,
                    
                    (SELECT COUNT(lv.id)
                    FROM lesson_vocabulary lv
                    WHERE lv.lesson_id = l.id) AS vocabulary_count,
                    
                    ul.status AS lesson_status
                FROM lesson l
                LEFT JOIN user_lesson ul
                    ON ul.lesson_id = l.id
                    AND ul.user_id = $1
                WHERE l.syllabus_id = $2
                ORDER BY l.id;
            """
            records = await connection.fetch(query, user_id, syllabus_id)
            
            lessons = [
                LessonInfo(
                    id=r['id'],
                    title=r['title'],
                    description=r['description'],
                    vocabulary_count=r['vocabulary_count'],
                    lesson_status=r['lesson_status']
                ) for r in records
            ]
            return LessonList(lessons=lessons)

    except Exception as e:
        print(f"Error getting lessons for syllabus {syllabus_id}: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Could not retrieve lessons. Error: {e}"
        )

@app.get("/api/lessons/vocabulary", response_model=VocabularyList)
async def get_vocabulary_for_lesson(lesson_id: int, app_request: Request):
    """
    Retrieves all vocabulary items for a specific lesson.
    """
    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            query = """
                SELECT
                    id,
                    word,
                    instruction,
                    video
                FROM
                    lesson_vocabulary
                WHERE
                    lesson_id = $1
                ORDER BY
                    word;
            """
            records = await connection.fetch(query, lesson_id)
            
            vocabulary = [
                VocabularyItem(
                    id=r['id'],
                    word=r['word'],
                    description=r['instruction'],
                    video_url=r['video']
                ) for r in records
            ]
            return VocabularyList(vocabulary=vocabulary)

    except Exception as e:
        print(f"Error getting vocabulary for lesson {lesson_id}: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Could not retrieve vocabulary. Error: {e}"
        )


# -------------------------------------------------------------
# 🏆 QUIZ API ENDPOINTS
# -------------------------------------------------------------
@app.post("/api/user/assign-default-quizzes", response_model=AssignQuizResponse)
async def assign_default_quizzes(
    user_id: int,  # Re-using your existing model
    app_request: Request
):
    """
    Assigns all quizzes from syllabuses 2-11 to a specific user.
    
    This function finds all lessons associated with syllabuses 2-11,
    finds all quizzes for those lessons, and then inserts them into the
    'quiz_user' table for the given user_id.
    
    This operation is idempotent (safe to run multiple times) thanks to
    'ON CONFLICT DO NOTHING'.
    """
    quizzes_added_count = 0

    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            # This single query joins quizzes->lessons->syllabuses
            # and inserts all matches for the user_id.
            sync_quizzes_query = """
                INSERT INTO quiz_user (user_id, quiz_id)
                SELECT
                    $1 AS user_id,
                    q.id AS quiz_id
                FROM 
                    quiz q
                JOIN 
                    lesson l ON l.id = q.lesson_id
                -- This prevents creating duplicates if a quiz entry already exists
                ON CONFLICT (user_id, quiz_id) DO NOTHING;
            """
            
            # Execute the query
            status_str = await connection.execute(sync_quizzes_query, user_id)
            
            # Parse the number of newly inserted quizzes
            try:
                quizzes_added_count = int(status_str.split(" ")[-1])
            except (ValueError, IndexError):
                print(f"Could not parse insert count from status: {status_str}")
                quizzes_added_count = 0 # Default to 0

            print(f"Synced {quizzes_added_count} new quizzes for user {user_id}.")
            return AssignQuizResponse(
                message=f"Successfully assigned default quizzes for user {user_id}.",
                quizzes_added_count=quizzes_added_count
            )

    except asyncpg.exceptions.ForeignKeyViolationError as e:
        print(f"Foreign key violation for user {user_id}: {e}")
        raise HTTPException(
            status_code=404,
            detail=f"User with ID {user_id} not found."
        )
    except Exception as e:
        print(f"Could not assign default quizzes for user {user_id}: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"An internal error occurred. Error: {e}"
        )

@app.get("/api/quizzes", response_model=UserQuizListResponse)
async def get_total_quiz(user_id: int, app_request: Request):
    """
    Retrieves all quizzes associated with a specific user_id
    by joining 'quiz_user' and 'quizzes', including score and status.
    """
    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            # UPDATED QUERY: Select fields from 'qu' (quiz_user) table
            query = """
                SELECT
                    q.id AS quiz_id,
                    q.title,
                    q.description,
                    q.lesson_id,
                    qu.id AS user_quiz_id,
                    qu.score,
                    qu.status,
                    qu.started_at,
                    qu.submitted_at
                FROM quiz q
                JOIN quiz_user qu ON q.id = qu.quiz_id
                WHERE qu.user_id = $1
                ORDER BY qu.started_at DESC;
            """
            records = await connection.fetch(query, user_id)
            
            # Map records to the new UserQuizDetails model
            quizzes = [
                UserQuizDetails(
                    quiz_id=r['quiz_id'],
                    title=r['title'],
                    description=r['description'],
                    lesson_id=r['lesson_id'],
                    user_quiz_id=r['user_quiz_id'],
                    score=r['score'],
                    status=r['status'],
                    started_at=r['started_at'],
                    submitted_at=r['submitted_at']
                ) for r in records
            ]
            return UserQuizListResponse(quizzes=quizzes)
            
    except Exception as e:
        print(f"Error getting quizzes for user {user_id}: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Could not retrieve user's quizzes. Error: {e}"
        )

@app.post("/api/quizzes/user", response_model=AddQuizResponse)
async def add_quiz_to_user_quiz(request_data: AddQuizRequest, app_request: Request):
    """
    Adds a quiz to a user's list in the 'quiz_user' table.
    If the association already exists, it does nothing.
    """
    user_id = request_data.user_id
    quiz_id = request_data.quiz_id
    
    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            # Insert the record. 
            # ON CONFLICT ensures no duplicates are created.
            # RETURNING * will return the row if inserted, or nothing if conflict.
            query = """
                INSERT INTO quiz_user (user_id, quiz_id)
                VALUES ($1, $2)
                ON CONFLICT (user_id, quiz_id) DO NOTHING
                RETURNING *;
            """
            result = await connection.fetchrow(query, user_id, quiz_id)
            
            if result:
                message = "Quiz successfully added to user."
            else:
                message = "User already has this quiz."
                
            return AddQuizResponse(
                message=message,
                user_id=user_id,
                quiz_id=quiz_id
            )
            
    except asyncpg.exceptions.ForeignKeyViolationError as e:
        print(f"Foreign key violation for user {user_id}, quiz {quiz_id}: {e}")
        raise HTTPException(
            status_code=404,
            detail=f"Failed to add quiz: User ID {user_id} or Quiz ID {quiz_id} not found."
        )
    except Exception as e:
        print(f"Error adding quiz {quiz_id} to user {user_id}: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Could not add quiz to user. Error: {e}"
        )

@app.get("/api/lesson-quiz", response_model=QuestionList) # SỬA 1: Dùng model mới
async def get_quiz_for_lesson(lesson_id: int, app_request: Request):
    """
    Lấy quiz_id và tất cả câu hỏi/lựa chọn
    cho bài quiz được liên kết với một 'lesson_id' cụ thể.
    """
    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            
            # --- SỬA 2: Thực hiện 2 truy vấn ---
            
            # Bước 1: Tìm quiz_id từ lesson_id
            # (Giả định 1 lesson chỉ có 1 quiz)
            quiz_record = await connection.fetchrow(
                "SELECT id FROM quiz WHERE lesson_id = $1 LIMIT 1",
                lesson_id
            )

            # Nếu không tìm thấy quiz, trả về mảng rỗng và không có ID
            if not quiz_record:
                return QuestionList(quiz_id=None, questions=[])
                
            quiz_id = quiz_record['id']

            # Bước 2 & 3: Lấy câu hỏi và lựa chọn (options) cho quiz_id đó
            query = """
                SELECT
                    qs.id,
                    qs.question_text,
                    qs.type,
                    qs.video,
                    COALESCE(
                        (
                            SELECT json_agg(
                                json_build_object(
                                    'id', o.id,
                                    'option_text', o.option_text,
                                    'is_correct', o.is_correct
                                )
                                ORDER BY o.id -- Thêm ORDER BY để đảm bảo thứ tự
                            )
                            FROM question_option o
                            WHERE o.question_id = qs.id
                        ),
                        '[]'
                    ) AS options
                FROM
                    question qs
                WHERE
                    qs.quiz_id = $1 -- Sửa: Dùng quiz_id an toàn hơn
                ORDER BY
                    qs.id;
            """
            
            records = await connection.fetch(query, quiz_id) # Sửa: Truyền quiz_id
            
            questions = []
            for r in records:
                # 'options' từ DB là một chuỗi JSON, cần parse nó
                options_list = json.loads(r['options']) if r['options'] else []
                
                questions.append(
                    QuestionData(
                        id=r['id'],
                        question_text=r['question_text'],
                        type=r['type'],
                        video=r['video'],
                        options=[OptionData(**opt) for opt in options_list]
                    )
                )
                
            # SỬA 3: Trả về model mới, bao gồm cả quiz_id
            return QuestionList(quiz_id=quiz_id, questions=questions)

    except Exception as e:
        print(f"Error getting quiz for lesson {lesson_id}: {e}")
        raise HTTPException(
            status_code=500, 
            detail=f"Could not retrieve quiz data. Error: {e}"
        )


@app.put("/api/quiz/submit", response_model=QuizSubmissionResponse)
async def submit_quiz_score(
    submission_data: QuizSubmissionRequest,
    app_request: Request
):
    """
    Cập nhật lượt làm quiz (quiz attempt) với điểm số cuối cùng,
    đặt thời gian nộp bài là 'NOW()', chuyển status thành 'completed',
    và cập nhật user_lesson tương ứng cũng thành 'completed'.
    """
    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            async with connection.transaction():  # đảm bảo atomic (tất cả hoặc không)
                # 1️⃣ Cập nhật bảng quiz_user
                query_update_quiz = """
                    UPDATE quiz_user
                    SET 
                        score = $1,
                        submitted_at = NOW(),
                        status = 'completed'
                    WHERE
                        quiz_id = $2 AND user_id = $3
                    RETURNING id, status, score;
                """
                
                updated_record = await connection.fetchrow(
                    query_update_quiz,
                    submission_data.score,
                    submission_data.quiz_id,
                    submission_data.user_id
                )

                if not updated_record:
                    raise HTTPException(
                        status_code=404,
                        detail=f"Không tìm thấy lượt làm quiz (ID: {submission_data.quiz_id}) hoặc user ID không khớp."
                    )

                # 2️⃣ Cập nhật bảng user_lesson → completed
                query_update_lesson = """
                    UPDATE user_lesson
                    SET status = 'complete'
                    WHERE user_id = $1 AND lesson_id = $2
                    RETURNING id, status;
                """
                
                lesson_update = await connection.fetchrow(
                    query_update_lesson,
                    submission_data.user_id,
                    submission_data.lesson_id
                )

                if not lesson_update:
                    print("⚠️ Không tìm thấy bản ghi user_lesson tương ứng để cập nhật.")
                
                # 3️⃣ Trả về phản hồi
                return QuizSubmissionResponse(
                    message="Nộp bài quiz thành công và hoàn thành bài học.",
                    quiz_id=updated_record["id"],
                    new_status=updated_record["status"],
                    score=updated_record["score"]
                )

    except HTTPException as http_exc:
        raise http_exc
    except Exception as e:
        print(f"Lỗi khi nộp bài quiz: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Không thể nộp điểm quiz. Lỗi: {e}"
        )


@app.post("/api/user/preferences", response_model=LearningPreferenceOut)
async def create_learning_preference(
    pref_data: LearningPreferenceIn,
    app_request: Request
):
    """
    Creates or updates a learning preference entry for a user.
    """
    query = """
    INSERT INTO user_learning_preference (
        user_id, 
        learning_goal, 
        available_time, 
        schedule, 
        expectations, 
        skill
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    ON CONFLICT (user_id) DO UPDATE SET
        learning_goal = EXCLUDED.learning_goal,
        available_time = EXCLUDED.available_time,
        schedule = EXCLUDED.schedule,
        expectations = EXCLUDED.expectations,
        skill = EXCLUDED.skill,
        updated_at = NOW()
    RETURNING *;
    """

    try:
        pool = app_request.app.state.db_pool
        record = await pool.fetchrow(
            query,
            pref_data.user_id,
            pref_data.learning_goal,
            pref_data.available_time,
            pref_data.schedule,
            pref_data.expectations,
            pref_data.skill
        )

        if not record:
            raise HTTPException(status_code=500, detail="Không thể tạo hoặc cập nhật user preference.")

        # ✅ Convert to dict or model
        return LearningPreferenceOut(**dict(record))

    except asyncpg.exceptions.ForeignKeyViolationError:
        raise HTTPException(status_code=404, detail=f"User với ID {pref_data.user_id} không tồn tại.")
    except Exception as e:
        print(f"❌ Lỗi khi tạo hoặc cập nhật preference: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/user/preferences", response_model=LearningPreferenceOut)
async def get_learning_preference(
    user_id: int,
    app_request: Request
):
    """
    Lấy thông tin học tập của người dùng.
    """
    query = """
        SELECT * FROM user_learning_preference
        WHERE user_id = $1;
    """
    try:
        pool = app_request.app.state.db_pool
        record = await pool.fetchrow(query, user_id)

        if not record:
            raise HTTPException(status_code=404, detail="Không tìm thấy thông tin học tập của người dùng.")

        # ✅ Chuyển Record sang model hoặc dict
        return LearningPreferenceOut(**dict(record))

    except asyncpg.exceptions.ForeignKeyViolationError:
        raise HTTPException(status_code=404, detail=f"User với ID {user_id} không tồn tại.")
    except Exception as e:
        print(f"❌ Lỗi khi lấy dữ liệu user_learning_preference: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.put("/api/user/preferences/skill", response_model=SkillUpdateOut)
async def update_user_skill_preference(
    skill_data: SkillUpdateIn,
    app_request: Request
):
    """
    Updates or creates the user's skill preference.
    - If a record exists: update skill (but no more than 5 updates allowed).
    - If not: create a new record.
    """
    pool = app_request.app.state.db_pool

    try:
        async with pool.acquire() as connection:
            async with connection.transaction():
                # Step 1: Get current update count (if any)
                result = await connection.fetchrow(
                    """
                    SELECT id, skill_update_count
                    FROM user_learning_preference
                    WHERE user_id = $1;
                    """,
                    skill_data.user_id
                )

                # Step 2: If record exists and limit reached -> block update
                if result and result["skill_update_count"] >= 5:
                    raise HTTPException(
                        status_code=403,
                        detail="You have reached the maximum of 5 skill updates."
                    )

                # Step 3: Perform UPSERT with count increment or creation
                record = await connection.fetchrow(
                    """
                    INSERT INTO user_learning_preference (user_id, skill, skill_update_count)
                    VALUES ($1, $2, 1)
                    ON CONFLICT (user_id)
                    DO UPDATE SET
                        skill = EXCLUDED.skill,
                        skill_update_count = user_learning_preference.skill_update_count + 1,
                        updated_at = NOW()
                    RETURNING id, skill, skill_update_count;
                    """,
                    skill_data.user_id,
                    skill_data.skill
                )

                return SkillUpdateOut(
                    message=f"Skill updated successfully (update #{record['skill_update_count']}).",
                    preference_id=record["id"],
                    new_skill_level=record["skill"]
                )

    except asyncpg.exceptions.ForeignKeyViolationError:
        raise HTTPException(
            status_code=404,
            detail=f"User with ID {skill_data.user_id} not found."
        )
    except HTTPException:
        raise  # rethrow to keep HTTP status
    except Exception as e:
        print(f"Error updating/creating skill preference: {e}")
        raise HTTPException(status_code=500, detail=str(e))


# -------------------------------------------------------------
# POST ENDPOINT
# -------------------------------------------------------------

@app.get("/api/posts", response_model=List[PostOut]) # <-- SỬA LỖI 1: Thêm /api
async def fetch_posts(
    # SỬA LỖI 2: Thay đổi thứ tự tham số để nhất quán
    app_request: Request ,
    params: FetchPostsParams = Depends(), 
    x_user_id: int = Header(..., description="ID của người dùng đang xem"),
):
    """
    Endpoint chính để lấy bài viết, gọi func_fetch_posts.
    """
    try:
        print(params)
        pool = app_request.app.state.db_pool
        tags = None
        if params.tags:
            tags = params.tags
        print("PRE PROCESS")
        records = await pool.fetch(
                "SELECT * FROM func_fetch_posts($1, $2, $3, $4, $5, $6, $7)",
                x_user_id,
                params.category,
                tags,
                params.search_query,
                params.sort_by,
                params.limit,
                params.offset
            )
        print("DONE PROCESS")
        return records
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi cơ sở dữ liệu: {str(e)}")
@app.post("/api/posts", response_model=PostOut)
async def create_post(
    app_request: Request,                     # <-- SỬA LỖI: Đã thêm
    post: PostCreate,
    x_user_id: int
    # conn: ... <-- SỬA LỖI: Đã xóa
):
    """
    Tạo một bài viết mới, gọi func_create_post.
    """
    try:
        # --- SỬA LỖI: Sử dụng pattern pool từ app_request ---
        pool = app_request.app.state.db_pool
        async with pool.acquire() as conn:
            new_post_record = await conn.fetchrow(
                "SELECT * FROM func_create_post($1, $2, $3, $4, $5, $6, $7, $8)",
                x_user_id,
                post.title,
                post.content,
                post.category,
                post.image,
                post.quiz_id,
                post.syllabus_id,
                post.tag_names
            )
            
            full_post_record = await conn.fetchrow(
                "SELECT * FROM func_fetch_posts($1, NULL, NULL, NULL, 'recent', 1, 0) WHERE id = $2",
                x_user_id, new_post_record['id']
            )
        # --------------------------------------------------
        
        return full_post_record
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi cơ sở dữ liệu: {str(e)}")


@app.post("/posts/{post_id}/like", response_model=dict)
async def toggle_post_like(
    app_request: Request,                     # <-- SỬA LỖI: Đã thêm
    post_id: UUID,
    x_user_id: int
    # conn: ... <-- SỬA LỖI: Đã xóa
):
    """
    Like hoặc Unlike một bài viết, gọi func_toggle_like.
    """
    # --- SỬA LỖI: Sử dụng pattern pool từ app_request ---
    pool = app_request.app.state.db_pool
    async with pool.acquire() as conn:
        is_liked = await conn.fetchval(
            "SELECT func_toggle_like($1, $2)",
            x_user_id, post_id
        )
    # --------------------------------------------------
    return {"is_liked": is_liked, "post_id": post_id}


@app.post("/posts/{post_id}/bookmark", response_model=dict)
async def toggle_post_bookmark(
    app_request: Request,                     # <-- SỬA LỖI: Đã thêm
    post_id: UUID,
    x_user_id: int
    # conn: ... <-- SỬA LỖI: Đã xóa
):
    """
    Bookmark hoặc Unbookmark một bài viết, gọi func_toggle_bookmark.
    """
    # --- SỬA LỖI: Sử dụng pattern pool từ app_request ---
    pool = app_request.app.state.db_pool
    async with pool.acquire() as conn:
        is_bookmarked = await conn.fetchval(
            "SELECT func_toggle_bookmark($1, $2)",
            x_user_id, post_id
        )
    # --------------------------------------------------
    return {"is_bookmarked": is_bookmarked, "post_id": post_id}


@app.post("/posts/{post_id}/comments", response_model=CommentOut)
async def create_comment(
    app_request: Request,                     # <-- SỬA LỖI: Đã thêm
    post_id: UUID,
    comment: CommentCreate,
    x_user_id: int
    # conn: ... <-- SỬA LỖI: Đã xóa
):
    """
    Tạo một bình luận mới, gọi func_create_comment.
    """
    try:
        # --- SỬA LỖI: Sử dụng pattern pool từ app_request ---
        pool = app_request.app.state.db_pool
        async with pool.acquire() as conn:
            new_comment_record = await conn.fetchrow(
                "SELECT * FROM func_create_comment($1, $2, $3, $4)",
                x_user_id,
                post_id,
                comment.content,
                comment.parent_comment_id
            )
            
            full_comment_record = await conn.fetchrow(
                "SELECT * FROM func_fetch_comments($1, 1, 0) WHERE id = $2",
                post_id, new_comment_record['id']
            )
        # --------------------------------------------------
        
        return full_comment_record
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Lỗi cơ sở dữ liệu: {str(e)}")
# -------------------------------------------------------------
# Dictionary API 🚀
# -------------------------------------------------------------
@app.get("/api/vocabulary/all", response_model=AllWordsList)
async def get_all_vocabulary(app_request: Request):
    """
    Retrieves all words in the dictionary regardless of lesson affiliation.
    Uses the vocabulary table with topic_id.
    """
    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            query = """
                SELECT
                    id, original_id, topic_id, word, instruction, video
                FROM
                    vocabulary
                ORDER BY
                    word;
            """
            records = await connection.fetch(query)

            vocabulary = [
                FullVocabularyItem(
                    id=r['id'],
                    original_id=r['original_id'],
                    topic_id=r['topic_id'],
                    word=r['word'],
                    instruction=r['instruction'],
                    video=r['video']
                ) for r in records
            ]
            return AllWordsList(vocabulary=vocabulary)

    except Exception as e:
        print(f"Error getting all vocabulary: {e}")
        raise HTTPException(
            status_code=500,
            detail=f"Could not retrieve all vocabulary. Error: {e}"
        )
        
@app.get("/api/vocabulary/search", response_model=SearchWordTopicResponse)
async def search_word_and_get_related(
    app_request: Request,
    word_query: str = Query(..., description="The word to search for (e.g., 'con bò')")
):
    """
    Searches for a specific word, returns the word details, 
    and all other words belonging to the same topic_id.
    """
    search_term = word_query.strip()
    
    try:
        async with app_request.app.state.db_pool.acquire() as connection:
            
            # --- 1. Tìm từ gốc và Topic ID ---
            found_word_record = await connection.fetchrow(
            """
            SELECT id, original_id, topic_id, word, instruction, video 
            FROM vocabulary
            WHERE word ILIKE $1 
            LIMIT 1;
            """,
            search_term 
            )

            # Nếu tìm kiếm chính xác thất bại, thử tìm kiếm gần đúng hơn
            if not found_word_record:
                found_word_record = await connection.fetchrow(
            """
            SELECT id, original_id, topic_id, word, instruction, video 
            FROM vocabulary
            WHERE word ILIKE $1 
            LIMIT 1;
            """,
            f'%{search_term}%'
            )


            if not found_word_record:
                raise HTTPException(status_code=404, detail=f"Word '{search_term}' not found.")
            
            # Chuẩn bị kết quả tìm kiếm
            search_result_item = FullVocabularyItem(
                id=found_word_record['id'],
                original_id=found_word_record['original_id'],
                topic_id=found_word_record['topic_id'],
                word=found_word_record['word'],
                instruction=found_word_record['instruction'],
                video=found_word_record['video']
            )

            topic_id = found_word_record['topic_id']
            # ⭐ FIX: Khởi tạo related_records với giá trị mặc định
            related_records = [] 
            
            # --- 2. Lấy các từ liên quan (cùng Topic ID) ---
            if topic_id is not None:
                related_query = """
                SELECT id, original_id, topic_id, word, instruction, video 
                FROM vocabulary
                WHERE topic_id = $1 AND id != $2
                ORDER BY word;
                """
                # Gán kết quả vào biến đã được khởi tạo
                related_records = await connection.fetch(
                    related_query, 
                    topic_id, 
                    found_word_record['id']
                )
            
            # Bây giờ, related_records luôn là list (dù là list rỗng hay list kết quả)
            related_words = [
                FullVocabularyItem(
                    id=r['id'],
                    original_id=r['original_id'],
                    topic_id=r['topic_id'],
                    word=r['word'],
                    instruction=r['instruction'],
                    video=r['video']
                ) for r in related_records
            ]

            # --- 3. Trả về kết quả cuối cùng ---
            return SearchWordTopicResponse(
                search_result=search_result_item,
                related_words=related_words
            )

    except HTTPException:
        raise # Re-raise 404
    except Exception as e:
        print(f"Error searching vocabulary for '{search_term}': {e}")
        raise HTTPException(
            status_code=500,
            detail=f"An internal error occurred during search. Error: {e}"
        )
# -------------------------------------------------------------
# 5. Run the server locally 🚀
# -------------------------------------------------------------
if __name__ == "__main__":
    import uvicorn
    # Make sure to run the app using its module name and app instance
    uvicorn.run("your_file_name:app", host="127.0.0.1", port=8000, reload=True) 
    # NOTE: Replace 'your_file_name' with the actual name of your Python file (e.g., 'main').
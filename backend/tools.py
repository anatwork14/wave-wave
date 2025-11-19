# tools.py
from google.adk.tools import FunctionTool
from sqlalchemy.orm import Session
from sqlalchemy import text, inspect
from db_config import engine
from typing import List, Dict

# --- New Function to get vocabulary words ---
def get_vocabulary_words(limit: int = 10, offset: int = 0) -> List[Dict]:
    """
    Retrieves a list of words and their associated data from the 'vocabulary' table.
    
    Returns:
        A list of dictionaries, where each dictionary represents a vocabulary record.
    """
    query = text("SELECT * FROM vocabulary LIMIT :limit OFFSET :offset")

    with Session(engine) as session:
        result = session.execute(query, {'limit': limit, 'offset': offset})
        
        # Get column names
        columns = result.keys()
        
        # Convert the result rows into a list of dictionaries
        words = [dict(zip(columns, row)) for row in result.all()]

        # 🛑 FIX: Return only the list of words. 
        # The ADK runner will automatically wrap this as the tool_call result.
        return words # <-- Return the raw list directly

# --- Original Function (Kept for completeness) ---
def get_user_profile(user_id: str) -> dict:
    """Retrieves user profile and preferences from the local MySQL database."""
    # Use SQLAlchemy Session to execute operations
    with Session(engine) as session:
        # Example: Fetch user record from 'user_data' table
        # user_record = session.execute(text(f"SELECT * FROM user_data WHERE id='{user_id}'")).fetchone()

        # For this example, we return a mock response
        return {
            "status": "success",
            "user_id": user_id,
            "data": {"name": "Local Dev User", "preference": "High-res video analysis"}
        }

# --- Function Tools Export ---
# Export the tools
TOOLS = [get_vocabulary_words, get_user_profile]
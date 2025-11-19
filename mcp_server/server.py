import logging
import os
import sys
from pathlib import Path
from typing import Any
from tools import get_words

import psycopg2
import psycopg2.extras
import uvicorn
from dotenv import load_dotenv
from psycopg2 import sql
from starlette.applications import Starlette
from starlette.requests import Request
from starlette.routing import Route, Mount
from psycopg2 import sql
import psycopg2.extras

# ---------- FastMCP and Starlette imports ----------
from mcp.server.fastmcp import FastMCP
from mcp.server.sse import SseServerTransport
from mcp.shared.exceptions import McpError
from mcp.types import ErrorData, INTERNAL_ERROR, INVALID_PARAMS
# --------------------------------------------------------

# ----------------------------------------------------------------------
# 1. Load .env *once* at import time
# ----------------------------------------------------------------------
ENV_PATH = Path(__file__).parent / ".env"
if ENV_PATH.exists():
    load_dotenv(dotenv_path=ENV_PATH)
else:
    # fall back to process env
    pass

REQUIRED = ["PG_DB_NAME", "PG_DB_USER", "PG_DB_PASSWORD"]
missing = [v for v in REQUIRED if not os.getenv(v)]
if missing:
    print(f"FATAL: missing env vars {missing}", file=sys.stderr, flush=True)
    sys.exit(1)

# ----------------------------------------------------------------------
# 2. Logging – **append** and write to BOTH file + stderr
# ----------------------------------------------------------------------
try:
    sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    sys.stderr.reconfigure(encoding="utf-8", errors="replace")
except Exception:
    sys.stdout = open(sys.stdout.fileno(), mode="w", encoding="utf-8", buffering=1, errors="replace")
    sys.stderr = open(sys.stderr.fileno(), mode="w", encoding="utf-8", buffering=1, errors="replace")

LOG_FILE = Path(__file__).with_name("mcp_server_activity.log")

file_handler = logging.FileHandler(LOG_FILE, mode="a", encoding="utf-8")
stream_handler = logging.StreamHandler(sys.stderr)
stream_handler.setFormatter(logging.Formatter(
    "%(asctime)s %(levelname)s [%(filename)s:%(lineno)d] %(message)s"
))

logging.basicConfig(
    level=logging.DEBUG,
    handlers=[file_handler, stream_handler],
)

log = logging.getLogger(__name__)

# ----------------------------------------------------------------------
# 3. DB helpers
# ----------------------------------------------------------------------
def get_conn():
    try:
        return psycopg2.connect(
            dbname=os.getenv("PG_DB_NAME"),
            user=os.getenv("PG_DB_USER"),
            password=os.getenv("PG_DB_PASSWORD"),
            host=os.getenv("PG_DB_HOST", "localhost"),
            port=os.getenv("PG_DB_PORT", "5432"),
            cursor_factory=psycopg2.extras.RealDictCursor,
        )
    except Exception as e:
        log.exception("DB connection failed")
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"DB connection failed: {e}"))

# ----------------------------------------------------------------------
# 4. MCP Server and Tool Definitions
# ----------------------------------------------------------------------

# Create an MCP server instance
mcp = FastMCP("postgres-db-mcp-server")

# --- 4a. Generic Database CRUD Tools ---
@mcp.tool()
def get_words_tool(query: str, limit: int = 30) -> list[dict]:
    """
    (RAG Tool) Retrieves vocabulary words and descriptions from the vector
    database based on a query.
    """
    log.info(f"Executing RAG query for: {query}")
    try:
        # ---
        # CALL YOUR ACTUAL RAG FUNCTION HERE
        # This assumes you have a function that does the RAG.
        # If your 'get_words_tool' was already a full tool,
        # just copy its code here.
        # ---
        results = get_words(query, limit) 
        return results
    except Exception as e:
        log.exception("get_words_tool failed")
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"RAG tool failed: {e}"))
    
@mcp.tool()
def list_db_tables() -> list[str]:
    """Lists all tables in the 'public' schema."""
    conn = None
    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname = 'public';")
        tables = [r["tablename"] for r in cur.fetchall()]
        return tables
    except Exception as e:
        log.exception("list_db_tables failed")
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"list_tables: {e}"))
    finally:
        if conn: conn.close()

@mcp.tool()
def get_table_schema(table_name: str) -> list[dict]:
    """Gets the column names and data types for a specific table."""
    if not table_name or not table_name.isidentifier():
        raise McpError(ErrorData(code=INVALID_PARAMS, message="Invalid or missing table name"))
    
    conn = None
    try:
        conn = get_conn()
        cur = conn.cursor()
        cur.execute("""
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_schema = 'public' AND table_name = %s;
        """, (table_name,))
        rows = cur.fetchall()
        if not rows:
             raise McpError(ErrorData(code=INVALID_PARAMS, message=f"Table '{table_name}' not found or has no columns"))
        
        cols = [{"name": r["column_name"], "type": r["data_type"]} for r in rows]
        return cols
    except Exception as e:
        log.exception("get_table_schema failed")
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"schema: {e}"))
    finally:
        if conn: conn.close()

@mcp.tool()
def query_db_table(table_name: str, columns: str = "*", condition: str = "",
                   params: list[Any] = []) -> list[dict]:
    """
    Queries a table with optional columns and a WHERE condition.
    'condition' should be a SQL string with placeholders (e.g., "id = %s or name = %s").
    'params' should be a list of values for the placeholders (e.g., [1, "test"]).
    """
    if not table_name or not table_name.isidentifier():
        raise McpError(ErrorData(code=INVALID_PARAMS, message="Invalid table name"))
    
    conn = None
    try:
        conn = get_conn()
        cur = conn.cursor()
        
        cols = sql.SQL("*") if columns == "*" else sql.SQL(", ").join(
            sql.Identifier(c.strip()) for c in columns.split(",") if c.strip()
        )
        q = sql.SQL("SELECT {cols} FROM {tbl}").format(
            cols=cols, tbl=sql.Identifier(table_name)
        )
        if condition:
            q += sql.SQL(" WHERE ") + sql.SQL(condition)
        
        final_query = q.as_string(conn)
        log.debug(f"Executing query: {final_query} with params: {params}")
        cur.execute(final_query, params or [])
        return cur.fetchall()
    except Exception as e:
        log.exception("query_db_table failed")
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"Query failed: {e}"))
    finally:
        if conn: conn.close()

@mcp.tool()
def insert_data(table_name: str, data: dict) -> dict:
    """
    (GENERIC) Inserts a new row into a table.
    'data' should be a dictionary of {column_name: value}.
    Returns the 'id' of the newly inserted row.
    """
    if not data:
        raise McpError(ErrorData(code=INVALID_PARAMS, message="No data provided for insert"))
    if not table_name or not table_name.isidentifier():
        raise McpError(ErrorData(code=INVALID_PARAMS, message="Invalid table name"))

    conn = None
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
        data_no_id = {k: v for k, v in data.items() if k.lower() != "id"}
        if not data_no_id:
            raise McpError(ErrorData(code=INVALID_PARAMS, message="No insertable columns provided"))

        cols = sql.SQL(", ").join(map(sql.Identifier, data_no_id.keys()))
        ph = sql.SQL(", ").join(sql.Placeholder() * len(data_no_id))
        q = sql.SQL("INSERT INTO {tbl} ({cols}) VALUES ({ph}) RETURNING id").format(
            tbl=sql.Identifier(table_name), cols=cols, ph=ph
        )

        cur.execute(q, list(data_no_id.values()))
        row = cur.fetchone()
        conn.commit()
        return {"success": True, "row_id": row["id"] if row else None}
    except Exception as e:
        if conn: conn.rollback()
        log.exception("insert_data failed")
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"Insert failed: {e}"))
    finally:
        if conn: conn.close()

@mcp.tool()
def batch_insert_data(table_name: str, data_list: list[dict]) -> dict:
    """
    (GENERIC) Inserts multiple new rows into a table in a single, efficient transaction.
    'data_list' should be a list of dictionaries, e.g., [{col1: val1}, {col1: val2}].
    All dictionaries in the list MUST have the same keys.
    Returns a list of 'id's of the newly inserted rows.
    """
    if not data_list:
        raise McpError(ErrorData(code=INVALID_PARAMS, message="No data provided for batch insert"))
    if not table_name or not table_name.isidentifier():
        raise McpError(ErrorData(code=INVALID_PARAMS, message="Invalid table name"))

    conn = None
    try:
        conn = get_conn()
        cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

        # Get columns from the *first* item.
        cols = [k for k in data_list[0].keys() if k.lower() != "id"]
        if not cols:
             raise McpError(ErrorData(code=INVALID_PARAMS, message="No insertable columns provided"))

        columns_sql = sql.SQL(", ").join(map(sql.Identifier, cols))
        query_sql = sql.SQL("INSERT INTO {tbl} ({cols}) VALUES %s RETURNING id").format(
            tbl=sql.Identifier(table_name), cols=columns_sql
        )
        
        values_list_of_tuples = [
            tuple(item.get(k) for k in cols) for item in data_list
        ]

        new_ids = psycopg2.extras.execute_values(
            cur, query_sql, values_list_of_tuples, 
            template=None, page_size=100, returning=True
        )
        conn.commit()
        return {"success": True, "row_ids": [row['id'] for row in new_ids]}
    except Exception as e:
        if conn: conn.rollback()
        log.exception("batch_insert_data failed")
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"Batch insert failed: {e}"))
    finally:
        if conn: conn.close()

@mcp.tool()
def delete_data(table_name: str, condition: str, params: list[Any] = []) -> dict:
    """
    (GENERIC) Deletes rows from a table based on a condition.
    'condition' should be a SQL string with placeholders (e.g., "id = %s").
    'params' should be a list of values for the placeholders (e.g., [1]).
    """
    if not condition:
        raise McpError(ErrorData(code=INVALID_PARAMS, message="Empty condition for delete. Aborting."))
    if not table_name or not table_name.isidentifier():
        raise McpError(ErrorData(code=INVALID_PARAMS, message="Invalid table name"))

    conn = None
    try:
        conn = get_conn()
        cur = conn.cursor()
        q = sql.SQL("DELETE FROM {tbl} WHERE {cond}").format(
            tbl=sql.Identifier(table_name), cond=sql.SQL(condition)
        )
        cur.execute(q, params or [])
        conn.commit()
        return {"success": True, "rows_deleted": cur.rowcount}
    except Exception as e:
        if conn: conn.rollback()
        log.exception("delete_data failed")
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"Delete failed: {e}"))
    finally:
        if conn: conn.close()

@mcp.tool()
def update_data(table_name: str, data_to_set: dict, condition: str, params: list[Any] = []) -> dict:
    """
    (GENERIC) Updates rows in a table.
    'data_to_set' is a dict of {column: value} to update.
    'condition' is the WHERE clause (e.g., "id = %s").
    'params' is the list of values for the condition's placeholders.
    """
    if not condition or not data_to_set:
        raise McpError(ErrorData(code=INVALID_PARAMS, message="Missing data_to_set or condition for update"))
    if not table_name or not table_name.isidentifier():
        raise McpError(ErrorData(code=INVALID_PARAMS, message="Invalid table name"))

    conn = None
    try:
        conn = get_conn()
        cur = conn.cursor()
        set_parts = [sql.SQL("{} = %s").format(sql.Identifier(k)) for k in data_to_set]
        set_clause = sql.SQL(", ").join(set_parts)
        
        q = sql.SQL("UPDATE {tbl} SET {set} WHERE {cond}").format(
            tbl=sql.Identifier(table_name), set=set_clause, cond=sql.SQL(condition)
        )
        
        all_params = list(data_to_set.values()) + (params or [])
        
        cur.execute(q, all_params)
        conn.commit()
        return {"success": True, "rows_updated": cur.rowcount}
    except Exception as e:
        if conn: conn.rollback()
        log.exception("update_data failed")
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"Update failed: {e}"))
    finally:
        if conn: conn.close()


# --- 4b. High-Level "Worker" Tools (NEW) ---

# Make sure you have these imports at the top of your server file
from psycopg2 import sql
import psycopg2.extras

@mcp.tool()
def create_syllabus_from_payload(syllabus_payload: dict) -> str:
    """
    (WORKER TOOL) Creates a full syllabus, lessons, and vocabulary from a
    structured payload in a single, safe transaction.
    """

    log.info(f"Received syllabus payload for: {syllabus_payload.get('syllabus', {}).get('title')}")

    conn = None
    try:
        conn = get_conn()
        with conn:  # Starts a transaction
            with conn.cursor() as cur:
                # --- Step 1: Insert Syllabus ---
                syl_data = syllabus_payload.get("syllabus", {})
                if not syl_data.get("title"):
                    raise McpError(
                        ErrorData(code=INVALID_PARAMS, message="Syllabus payload missing 'syllabus.title'")
                    )

                cur.execute(
                    "INSERT INTO syllabus (title, description, created_at) VALUES (%s, %s, now()) RETURNING id",
                    (syl_data['title'], syl_data.get('description'))
                )
                new_syllabus_id = cur.fetchone()['id']
                log.debug(f"Inserted syllabus. New ID: {new_syllabus_id}")

                total_lessons = 0
                total_vocab = 0

                # --- Step 2: Loop and Insert Lessons ---
                # ******** THIS IS THE FIX ********
                # Look inside 'syl_data', not 'syllabus_payload'
                for lesson in syl_data.get("lessons", []):
                    # **********************************
                    if not lesson.get("title"):
                        log.warning("Skipping lesson with no title")
                        continue

                    cur.execute(
                        "INSERT INTO lesson (syllabus_id, title, description, created_at) VALUES (%s, %s, %s, now()) RETURNING id",
                        (new_syllabus_id, lesson['title'], lesson.get('description'))
                    )
                    new_lesson_id = cur.fetchone()['id']
                    total_lessons += 1

                    # --- Step 3: Loop and Insert Vocabulary for this Lesson ---
                    vocab_list = lesson.get("vocabulary", [])
                    if not vocab_list:
                        continue

                    # (The rest of your vocabulary insertion code is correct)
                    vocab_cols = ["lesson_id", "word", "instruction", "type", "video", "created_at"]

                    vocab_tuples = [
                        (
                            new_lesson_id,
                            v.get("word"),
                            v.get("instruction"),
                            v.get("type", None),
                            v.get("video")
                        )
                        for v in vocab_list if v.get("word")
                    ]

                    if vocab_tuples:
                        cols_sql = sql.SQL(", ").join(map(sql.Identifier, vocab_cols))
                        query_sql = sql.SQL("INSERT INTO lesson_vocabulary ({cols}) VALUES %s").format(
                            cols=cols_sql
                        )

                        template = sql.SQL('(%s, %s, %s, %s, %s, now())')

                        psycopg2.extras.execute_values(
                            cur,
                            query_sql,
                            vocab_tuples,
                            template=template
                        )
                        total_vocab += len(vocab_tuples)

                log.info(f"Syllabus creation success. ID: {new_syllabus_id}")

                # This will now correctly show the counts
                return (
                    f"Syllabus, {total_lessons} lessons, and {total_vocab} vocabulary links "
                    f"created successfully [SyllabusID:{new_syllabus_id}]."
                )

    except Exception as e:
        if conn:
            conn.rollback()
        log.exception("create_syllabus_from_payload failed")
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"Syllabus worker failed: {e}"))

    finally:
        if conn:
            conn.close()


@mcp.tool()
def update_syllabus_from_payload(update_payload: dict) -> str:
    """
    (WORKER TOOL) Adds new content (lessons or vocabulary) to an EXISTING
    syllabus in a single, safe transaction.
    """
    log.info(f"Received syllabus UPDATE payload for syllabus_id: {update_payload.get('syllabus_id')}")
    
    syllabus_id = update_payload.get("syllabus_id")
    if not syllabus_id:
        raise McpError(ErrorData(code=INVALID_PARAMS, message="Update payload missing 'syllabus_id'"))

    conn = None
    try:
        conn = get_conn()
        with conn: # Starts a transaction
            with conn.cursor() as cur:
                
                cur.execute("SELECT id FROM syllabus WHERE id = %s", (syllabus_id,))
                if cur.fetchone() is None:
                    raise McpError(ErrorData(code=INVALID_PARAMS, message=f"Syllabus with id {syllabus_id} not found."))

                lessons_added = 0
                vocab_added = 0

                # --- Block 1: Add NEW Lessons (and their vocab) ---
                for lesson in update_payload.get("add_lessons", []):
                    if not lesson.get("title"):
                        log.warning("Skipping lesson in 'add_lessons' with no title")
                        continue

                    cur.execute(
                        "INSERT INTO lesson (syllabus_id, title, description) VALUES (%s, %s, %s) RETURNING id",
                        (syllabus_id, lesson['title'], lesson.get('description'))
                    )
                    new_lesson_id = cur.fetchone()['id']
                    lessons_added += 1

                    vocab_list = lesson.get("vocabulary", [])
                    if vocab_list:
                        vocab_cols = ["lesson_id", "word", "instruction", "type", "video"]
                        vocab_tuples = [
                            (
                                new_lesson_id,
                                v.get("word"), v.get("instruction"),
                                v.get("type"), v.get("video")
                            )
                            for v in vocab_list if v.get("word")
                        ]
                        
                        if vocab_tuples:
                            cols_sql = sql.SQL(", ").join(map(sql.Identifier, vocab_cols))
                            query_sql = sql.SQL("INSERT INTO lesson_vocabulary ({cols}) VALUES %s").format(cols=cols_sql)
                            psycopg2.extras.execute_values(cur, query_sql, vocab_tuples)
                            vocab_added += len(vocab_tuples)

                # --- Block 2: Add NEW Vocab to EXISTING Lessons ---
                for item in update_payload.get("add_vocabulary_to_lessons", []):
                    existing_lesson_id = item.get("lesson_id")
                    vocab_list = item.get("vocabulary", [])
                    
                    if not existing_lesson_id or not vocab_list:
                        log.warning(f"Skipping 'add_vocabulary_to_lessons' item: missing lesson_id or vocab list.")
                        continue
                    
                    vocab_cols = ["lesson_id", "word", "instruction", "type", "video"]
                    vocab_tuples = [
                        (
                            existing_lesson_id,
                            v.get("word"), v.get("instruction"),
                            v.get("type"), v.get("video")
                        )
                        for v in vocab_list if v.get("word")
                    ]

                    if vocab_tuples:
                        cols_sql = sql.SQL(", ").join(map(sql.Identifier, vocab_cols))
                        query_sql = sql.SQL("INSERT INTO lesson_vocabulary ({cols}) VALUES %s").format(cols=cols_sql)
                        psycopg2.extras.execute_values(cur, query_sql, vocab_tuples)
                        vocab_added += len(vocab_tuples)
                
                log.info(f"Syllabus update success for syllabus_id: {syllabus_id}")
                return (
                    f"Syllabus updated successfully. "
                    f"Added {lessons_added} new lessons and {vocab_added} new vocabulary words. "
                    f"[SyllabusID:{syllabus_id}]"
                )

    except Exception as e:
        if conn: conn.rollback()
        log.exception("update_syllabus_from_payload failed")
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"Syllabus update worker failed: {e}"))
    finally:
        if conn: conn.close()

@mcp.tool()
def create_quiz_from_payload(quiz_payload: dict) -> str:
    """
    (WORKER TOOL) Creates a full quiz, questions, answers, AND the
    initial user attempt from a structured payload in a single transaction.
    """
    log.info(f"Received quiz payload for: {quiz_payload.get('title')}")

    user_id = quiz_payload.get("user_id")
    if not user_id:
        raise McpError(ErrorData(code=INVALID_PARAMS, message="Quiz payload missing 'user_id'"))

    conn = None
    try:
        conn = get_conn()
        with conn:  # transaction
            with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:

                # --- Step 1: Insert Quiz ---
                if not quiz_payload.get("title"):
                    raise McpError(ErrorData(code=INVALID_PARAMS, message="Quiz payload missing 'title'"))

                cur.execute(
                    "INSERT INTO quiz (lesson_id, title) VALUES (%s, %s) RETURNING id",
                    (quiz_payload.get("lesson_id", 1), quiz_payload["title"])
                )
                new_quiz_id = cur.fetchone()["id"]
                log.debug(f"Inserted quiz. New ID: {new_quiz_id}")

                # --- Step 2: Loop and Insert Questions ---
                for question in quiz_payload.get("questions", []):
                    if not question.get("question_text"):
                        log.warning("Skipping question with no text")
                        continue

                    cur.execute(
                        """
                        INSERT INTO question (quiz_id, type, question_text, video)
                        VALUES (%s, %s, %s, %s)
                        RETURNING id
                        """,
                        (new_quiz_id, question.get("type", "mcq"), question["question_text"], question.get("video"))
                    )
                    new_question_id = cur.fetchone()["id"]

                    # --- Step 3: Insert Options ---
                    options = question.get("options", [])
                    if options:
                        option_tuples = [
                            (new_question_id, o.get("option_text"), o.get("is_correct", False))
                            for o in options if o.get("option_text")
                        ]
                        if option_tuples:
                            cols_sql = sql.SQL(", ").join(map(sql.Identifier, ["question_id", "option_text", "is_correct"]))
                            query_sql = sql.SQL("INSERT INTO question_option ({cols}) VALUES %s").format(cols=cols_sql)
                            psycopg2.extras.execute_values(cur, query_sql, option_tuples)

                    # --- Step 3b: Insert Blanks ---
                    blanks = question.get("blanks", [])
                    if blanks:
                        blank_tuples = [
                            (new_question_id, b.get("correct_answer"))
                            for b in blanks if b.get("correct_answer")
                        ]
                        if blank_tuples:
                            cols_sql = sql.SQL(", ").join(map(sql.Identifier, ["question_id", "correct_answer"]))
                            query_sql = sql.SQL("INSERT INTO question_blank ({cols}) VALUES %s").format(cols=cols_sql)
                            psycopg2.extras.execute_values(cur, query_sql, blank_tuples)

                # --- Step 4: Register User Attempt ---
                log.debug(f"Registering attempt for user {user_id} on new quiz {new_quiz_id}")
                cur.execute(
                    "INSERT INTO quiz_user (quiz_id, user_id, status) VALUES (%s, %s, 'in_progress')",
                    (new_quiz_id, user_id)
                )

                log.info(f"Quiz creation success. ID: {new_quiz_id}")
                return f"Quiz created successfully. [QuizID: {new_quiz_id}]"

    except Exception as e:
        if conn:
            conn.rollback()
        log.exception("create_quiz_from_payload failed")
        if "foreign key constraint" in str(e).lower():
            raise McpError(ErrorData(code=INVALID_PARAMS, message="Invalid user_id or lesson_id."))
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"Quiz worker failed: {e}"))
    finally:
        if conn:
            conn.close()
            
@mcp.tool()
def start_quiz_attempt(quiz_id: int, user_id: int) -> str:
    """
    (WORKER TOOL) Registers a new user attempt for an EXISTING quiz.
    Inserts a row into the 'quiz_user' table.
    """
    log.info(f"Received request to start quiz_id: {quiz_id} for user_id: {user_id}")
    
    if not quiz_id or not user_id:
        raise McpError(ErrorData(code=INVALID_PARAMS, message="quiz_id and user_id are required."))

    conn = None
    try:
        conn = get_conn()
        with conn: # Starts a transaction
            with conn.cursor() as cur:
                
                # Check if an 'in_progress' attempt already exists
                cur.execute(
                    "SELECT id FROM quiz_user WHERE quiz_id = %s AND user_id = %s AND status = 'in_progress'",
                    (quiz_id, user_id)
                )
                existing = cur.fetchone()
                
                if existing:
                    log.warning(f"User {user_id} already has an 'in_progress' session for quiz {quiz_id}.")
                    return f"Quiz attempt is already in progress. [retrievedQuizID: {quiz_id}]"

                # --- Step 1: Insert new attempt ---
                cur.execute(
                    "INSERT INTO quiz_user (quiz_id, user_id, status) VALUES (%s, %s, 'in_progress')",
                    (quiz_id, user_id)
                )
                
                log.info(f"New quiz attempt started for quiz_id: {quiz_id}")
                return f"Quiz retrieved successfully. [retrievedQuizID: {quiz_id}]"

    except Exception as e:
        if conn: conn.rollback()
        log.exception("start_quiz_attempt failed")
        if "foreign key constraint" in str(e).lower():
             raise McpError(ErrorData(code=INVALID_PARAMS, message=f"Quiz or User does not exist."))
        raise McpError(ErrorData(code=INTERNAL_ERROR, message=f"Start quiz attempt failed: {e}"))
    finally:
        if conn: conn.close()


# ----------------------------------------------------------------------
# 5. Starlette server setup
# ----------------------------------------------------------------------
sse = SseServerTransport("/messages/")

async def handle_sse(request: Request) -> None:
    _server = mcp._mcp_server
    async with sse.connect_sse(
        request.scope,
        request.receive,
        request._send,
    ) as (reader, writer):
        await _server.run(reader, writer, _server.create_initialization_options())

app = Starlette(
    debug=True,
    routes=[
        Route("/sse", endpoint=handle_sse),
        Mount("/messages/", app=sse.handle_post_message),
    ],
)

if __name__ == "__main__":
    log.info("Starting MCP server with uvicorn on localhost:8001")
    uvicorn.run(app, host="localhost", port=8002)
   
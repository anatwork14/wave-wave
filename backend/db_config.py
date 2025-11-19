# db_config.py
import os
from sqlalchemy import create_engine
from dotenv import load_dotenv

load_dotenv()
LOCAL_POSTGRESSQL_URI = os.getenv("LOCAL_POSTGRESSQL_URI")

# Engine for custom tool queries (MySQL dialect with PyMySQL driver)
# engine = create_engine(LOCAL_POSTGRESSQL_URI)

# Note: ADK's DatabaseSessionService will use this URI directly.
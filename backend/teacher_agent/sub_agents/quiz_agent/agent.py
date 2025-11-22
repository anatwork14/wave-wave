from google.adk.agents import Agent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset, SseConnectionParams
from ..prompt import prompt_quiz_agent
PATH_TO_YOUR_MCP_SERVER_SCRIPT = "server.py"

mcp_tools = MCPToolset(
        connection_params=SseConnectionParams(
            url="http://localhost:8002/sse",
        )
    )

quiz_agent = Agent(
name="quiz_agent",
model="gemini-2.5-flash",
description="Generates educational quizzes from words, descriptions, or videos, focused on sign language.",
instruction=prompt_quiz_agent,
tools=[mcp_tools]
)
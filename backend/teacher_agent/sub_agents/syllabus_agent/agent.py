from google.adk.agents import Agent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset, SseConnectionParams
from ..prompt import prompt_syllabus_agent

# This creates the connection to your server
mcp_tools = MCPToolset(
        connection_params=SseConnectionParams(
            url="http://localhost:8002/sse",
        )
    )

syllabus_agent = Agent(
    name = "syllabus_agent",
    model="gemini-2.5-flash",
    description="Manages the syllabus lifecycle, including RAG and DB operations.",
    instruction=prompt_syllabus_agent,
    
    # --- THIS IS THE FIX ---
    # The agent needs BOTH the RAG tool AND the database tools
    # to follow the prompt.
    tools=[mcp_tools]
)
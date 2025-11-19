from google.adk.agents import Agent
from google.adk.tools import AgentTool

from .sub_agents.quiz_agent.agent import quiz_agent
from .sub_agents.syllabus_agent.agent import syllabus_agent
from .sub_agents.vocab_agent.agent import vocab_agent  # ← thêm dòng này
from .prompt import prompt_teacher_agent
from google.adk.tools.mcp_tool.mcp_toolset import MCPToolset, SseConnectionParams


quiz_tool = AgentTool(quiz_agent)
syllabus_tool = AgentTool(syllabus_agent)
vocab_tool = AgentTool(vocab_agent)

# This creates the connection to your server
mcp_tools = MCPToolset(
        connection_params=SseConnectionParams(
            url="http://localhost:8002/sse",
        )
    )

root_agent = Agent(
    name="teacher_agent",
    model="gemini-2.0-flash",
    description="A comprehensive sign language teaching assistant that coordinates syllabus creation, quiz generation, context provision, and evaluation for Vietnamese Sign Language learners.",
    tools=[quiz_tool, syllabus_tool, vocab_tool, mcp_tools],
    instruction=prompt_teacher_agent
)
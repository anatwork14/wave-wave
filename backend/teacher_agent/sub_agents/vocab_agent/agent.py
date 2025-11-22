from google.adk.agents import Agent
from ...shared.tools import get_words
from ..prompt import prompt_vocab_agent

vocab_agent = Agent(
    name="vocab_agent",
    model="gemini-2.0-flash", # Use a fast model for retrieval tasks
    description="An agent responsible for finding the most relevant Vietnamese Sign Language (VSL) vocabulary, descriptions, and video links from the RAG system based on a user's word or concept query.",
    instruction=prompt_vocab_agent,
    tools=[get_words]
)
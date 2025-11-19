from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv

load_dotenv()

COLLECTION_NAME = os.getenv("COLLECTION_NAME")
VECTOR_DIMENSION = 1024

model = SentenceTransformer("BAAI/bge-m3")
client_qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)

# Verify collection

def get_words(query: str, limit: int):
    """
    Retrieves relevant Vietnamese Sign Language (VSL) learning materials — including words, descriptions, and video links — from the Qdrant vector database based on a user’s text query.
    """
    try:
        query_vector = model.encode([query], convert_to_numpy=True).astype("float32")[0]
        hits = client_qdrant.search(
            collection_name=COLLECTION_NAME,
            query_vector=query_vector,
            limit=limit,
            with_payload=True
        )

        context = []
        for hit in hits:
            context.append({
                "word": hit.payload.get("word"),
                "region": hit.payload.get("region", None),
                "description": hit.payload.get("description"),
                "video_url": hit.payload.get("video"),  # Correct key
            })
        return context
    except Exception as e:
        print(f"An error occurred during context retrieval: {e}")
        return []
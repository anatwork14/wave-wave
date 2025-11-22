from qdrant_client import QdrantClient, models # Import models is important here
from sentence_transformers import SentenceTransformer
import os
from dotenv import load_dotenv

load_dotenv()

COLLECTION_NAME = os.getenv("COLLECTION_NAME")

model = SentenceTransformer("BAAI/bge-m3")
client_qdrant = QdrantClient(
    url=os.getenv("QDRANT_URL"),
    api_key=os.getenv("QDRANT_API_KEY")
)

def get_words(query: str, limit: int):
    try:
        query_vector = model.encode([query], convert_to_numpy=True).astype("float32")[0]
        
        # FIX: Use query_points instead of search
        hits = client_qdrant.query_points(
            collection_name=COLLECTION_NAME,
            query=query_vector,
            limit=limit,
            with_payload=True
        ).points # Note: query_points returns an object containing .points
        
        context = []
        for hit in hits:
            context.append({
                "word": hit.payload.get("word"),
                "region": hit.payload.get("region", None),
                "description": hit.payload.get("description"),
                "video_url": hit.payload.get("video"),
            })
        return context
    except Exception as e:
        print(f"An error occurred during context retrieval: {e}")
        return []

# Test it
print(get_words("động vật", 20))
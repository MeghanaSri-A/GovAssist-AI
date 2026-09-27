from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct, Filter, FieldCondition, MatchValue
import uuid

from app.config import settings
from app.rag.embeddings import embed_text, embed_batch

def _init_qdrant_client():
    try:
        c = QdrantClient(host=settings.QDRANT_HOST, port=settings.QDRANT_PORT, timeout=1.0)
        c.get_collections()
        return c
    except Exception:
        return QdrantClient(path=settings.QDRANT_STORAGE_PATH)

client = _init_qdrant_client()


def ensure_collection():
    collections = [c.name for c in client.get_collections().collections]
    if settings.QDRANT_COLLECTION not in collections:
        client.create_collection(
            collection_name=settings.QDRANT_COLLECTION,
            vectors_config=VectorParams(size=settings.EMBEDDING_DIM, distance=Distance.COSINE),
        )


def index_chunks(chunks: list[dict], pdf_name: str):
    """
    chunks: list of {text, page_number, chunk_index} from chunker.py
    """
    ensure_collection()
    texts = [c["text"] for c in chunks]
    vectors = embed_batch(texts, task_type="retrieval_document")

    points = [
        PointStruct(
            id=str(uuid.uuid4()),
            vector=vectors[i],
            payload={
                "text": chunks[i]["text"],
                "pdf_name": pdf_name,
                "page_number": chunks[i]["page_number"],
                "chunk_index": chunks[i]["chunk_index"],
            },
        )
        for i in range(len(chunks))
    ]
    client.upsert(collection_name=settings.QDRANT_COLLECTION, points=points)
    return len(points)


def search_chunks(query: str, top_k: int = 5, pdf_name: str = None, score_threshold: float = 0.5) -> list[dict]:
    """
    score_threshold filters out weakly-related chunks so only genuinely relevant
    matches get returned/cited, instead of always forcing exactly top_k results.
    Cosine similarity ranges 0-1; 0.5 is a reasonable starting cutoff -- raise it
    (e.g. 0.65-0.7) if still-irrelevant chunks slip through, or lower it if too
    few results come back for valid questions.
    """
    ensure_collection()
    query_vector = embed_text(query, task_type="retrieval_query")

    query_filter = None
    if pdf_name:
        query_filter = Filter(must=[FieldCondition(key="pdf_name", match=MatchValue(value=pdf_name))])

    results = client.search(
        collection_name=settings.QDRANT_COLLECTION,
        query_vector=query_vector,
        limit=top_k,
        query_filter=query_filter,
        score_threshold=score_threshold,
    )
    return [
        {
            "text": r.payload["text"],
            "pdf_name": r.payload["pdf_name"],
            "page_number": r.payload["page_number"],
            "score": r.score,
        }
        for r in results
    ]


def delete_pdf_chunks(pdf_name: str):
    client.delete(
        collection_name=settings.QDRANT_COLLECTION,
        points_selector=Filter(must=[FieldCondition(key="pdf_name", match=MatchValue(value=pdf_name))]),
    )
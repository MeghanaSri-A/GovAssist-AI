import google.generativeai as genai

from app.config import settings

genai.configure(api_key=settings.GEMINI_API_KEY)


def embed_text(text: str, task_type: str = "retrieval_document") -> list[float]:
    """
    task_type: "retrieval_document" when indexing, "retrieval_query" when searching.
    """
    result = genai.embed_content(
        model=settings.EMBEDDING_MODEL,
        content=text,
        task_type=task_type,
    )
    return result["embedding"]


def embed_batch(texts: list[str], task_type: str = "retrieval_document") -> list[list[float]]:
    return [embed_text(t, task_type) for t in texts]

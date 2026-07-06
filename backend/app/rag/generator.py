import google.generativeai as genai
import ollama

from app.config import settings
from app.rag.retriever import search_chunks
from app.rag.prompt import build_prompt

genai.configure(api_key=settings.GEMINI_API_KEY)


def _generate_gemini(prompt: str) -> str:
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text


def _generate_ollama(prompt: str) -> str:
    response = ollama.chat(
        model=settings.OLLAMA_MODEL,
        messages=[{"role": "user", "content": prompt}],
    )
    return response["message"]["content"]


def generate_answer(question: str, chat_history: list[dict] = None, top_k: int = 5) -> dict:
    """
    Full RAG flow: retrieve -> build prompt -> generate -> return answer + sources.
    """
    chunks = search_chunks(question, top_k=top_k)
    prompt = build_prompt(question, chunks, chat_history)

    if settings.LLM_PROVIDER == "gemini":
        answer = _generate_gemini(prompt)
    else:
        answer = _generate_ollama(prompt)

    sources = [
        {"pdf_name": c["pdf_name"], "page": c["page_number"], "snippet": c["text"][:200]}
        for c in chunks
    ]
    return {"answer": answer, "sources": sources}

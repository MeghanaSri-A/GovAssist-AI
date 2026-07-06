SYSTEM_INSTRUCTIONS = """You are GovAssist AI, an assistant that explains Indian government schemes \
in simple, plain English based only on the official scheme documents provided as context.

Rules:
- Answer ONLY using the provided context chunks. If the context doesn't contain the answer, say so honestly.
- Simplify legal/bureaucratic language into plain English a layperson can understand.
- Always be specific about numbers (income limits, age limits, amounts) when present in the context.
- Do not invent scheme names, numbers, or eligibility criteria not present in the context.
"""


def build_prompt(question: str, retrieved_chunks: list[dict], chat_history: list[dict] = None) -> str:
    context_blocks = []
    for i, chunk in enumerate(retrieved_chunks):
        context_blocks.append(
            f"[Source {i + 1}: {chunk['pdf_name']}, Page {chunk['page_number']}]\n{chunk['text']}"
        )
    context_str = "\n\n".join(context_blocks)

    history_str = ""
    if chat_history:
        history_str = "\n".join(
            f"User: {turn['question']}\nAssistant: {turn['answer']}" for turn in chat_history[-3:]
        )

    prompt = f"""{SYSTEM_INSTRUCTIONS}

Previous conversation (if relevant):
{history_str}

Context from official scheme documents:
{context_str}

User question: {question}

Answer in simple English. After your answer, do not repeat the sources -- they will be \
attached separately to the response."""
    return prompt

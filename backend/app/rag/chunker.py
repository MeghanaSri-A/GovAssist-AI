def chunk_pages(pages: list[dict], chunk_size: int = 800, overlap: int = 150) -> list[dict]:
    """
    Splits each page's text into overlapping word-based chunks while preserving
    which page each chunk came from -- this is what makes per-chunk citation possible.

    Returns: list of {text, page_number, chunk_index}
    """
    chunks = []
    for page in pages:
        words = page["text"].split()
        if not words:
            continue
        start = 0
        idx = 0
        while start < len(words):
            end = start + chunk_size
            chunk_text = " ".join(words[start:end])
            chunks.append({
                "text": chunk_text,
                "page_number": page["page_number"],
                "chunk_index": idx,
            })
            idx += 1
            start += chunk_size - overlap
    return chunks

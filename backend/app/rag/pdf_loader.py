import fitz  # PyMuPDF


def load_pdf_pages(pdf_path: str) -> list[dict]:
    """
    Returns a list of {page_number, text} dicts, one per page.
    page_number is 1-indexed to match what users see in citations.
    """
    doc = fitz.open(pdf_path)
    pages = []
    for i, page in enumerate(doc):
        text = page.get_text("text")
        if text.strip():
            pages.append({"page_number": i + 1, "text": text})
    doc.close()
    return pages

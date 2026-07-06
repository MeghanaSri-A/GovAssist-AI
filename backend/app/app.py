from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.database.database import Base, engine
from app.models import user, scheme, chat  # noqa: F401 ensures models are registered before create_all
from app.api import auth, schemes, eligibility, chat as chat_api, upload, compare, bookmarks

Base.metadata.create_all(bind=engine)

app = FastAPI(title=settings.APP_NAME)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(schemes.router)
app.include_router(eligibility.router)
app.include_router(chat_api.router)
app.include_router(upload.router)
app.include_router(compare.router)
app.include_router(bookmarks.router)


@app.get("/")
def root():
    return {"status": "ok", "app": settings.APP_NAME}

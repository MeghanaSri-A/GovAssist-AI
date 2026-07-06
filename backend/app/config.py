from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    # App
    APP_NAME: str = "GovAssist AI"
    ENV: str = "development"

    # Auth
    SECRET_KEY: str = "change-this-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    # Database
    DATABASE_URL: str = "sqlite:///./database/govassist.db"

    # Qdrant
    QDRANT_HOST: str = "localhost"
    QDRANT_PORT: int = 6333
    QDRANT_COLLECTION: str = "gov_schemes"

    # LLM Provider: "gemini" or "ollama"
    LLM_PROVIDER: str = "gemini"
    GEMINI_API_KEY: str = ""
    OLLAMA_MODEL: str = "llama3"
    OLLAMA_HOST: str = "http://localhost:11434"

    # Embeddings
    EMBEDDING_MODEL: str = "models/text-embedding-004"  # Gemini embedding model
    EMBEDDING_DIM: int = 768

    # Uploads
    UPLOAD_DIR: str = "app/uploads"

    class Config:
        env_file = ".env"


settings = Settings()

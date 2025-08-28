from pydantic_settings import BaseSettings
from typing import List
import secrets

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Code Assistant"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = secrets.token_urlsafe(32)
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    MONGODB_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "ai_code_assistant"
    REDIS_URL: str = "redis://localhost:6379"
    ALLOWED_HOSTS: List[str] = ["localhost", "localhost:3000"]
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()

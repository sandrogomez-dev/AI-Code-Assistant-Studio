from pydantic import BaseModel
from typing import Optional, List

class CodeRequest(BaseModel):
    prompt: str
    language: str
    context: Optional[str] = None
    max_tokens: Optional[int] = 1000

class CodeSuggestion(BaseModel):
    code: str
    explanation: str
    confidence: float

class CodeResponse(BaseModel):
    generated_code: str
    suggestions: List[CodeSuggestion]
    message: Optional[str] = None

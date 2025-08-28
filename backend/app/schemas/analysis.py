from pydantic import BaseModel
from typing import List, Optional

class Issue(BaseModel):
    type: str
    description: str
    severity: str
    line_number: Optional[int] = None
    suggestion: str

class AnalysisRequest(BaseModel):
    code: str
    language: str
    context: Optional[str] = None

class AnalysisResponse(BaseModel):
    issues: List[Issue]
    score: float
    summary: str

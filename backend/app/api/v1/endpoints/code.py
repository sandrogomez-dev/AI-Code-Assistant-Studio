from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.code import CodeRequest, CodeResponse
from app.services.code import CodeService
from typing import List

router = APIRouter()

@router.post("/generate", response_model=CodeResponse)
async def generate_code(request: CodeRequest):
    """
    Generate code based on the provided prompt
    """
    try:
        return await CodeService.generate_code(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/analyze", response_model=CodeResponse)
async def analyze_code(request: CodeRequest):
    """
    Analyze code and provide suggestions
    """
    try:
        return await CodeService.analyze_code(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

from fastapi import APIRouter, HTTPException, status
from app.schemas.analysis import AnalysisRequest, AnalysisResponse
from app.services.analysis import AnalysisService

router = APIRouter()

@router.post("/performance", response_model=AnalysisResponse)
async def analyze_performance(request: AnalysisRequest):
    """
    Analyze code performance and provide optimization suggestions
    """
    try:
        return await AnalysisService.analyze_performance(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

@router.post("/security", response_model=AnalysisResponse)
async def analyze_security(request: AnalysisRequest):
    """
    Analyze code for security vulnerabilities
    """
    try:
        return await AnalysisService.analyze_security(request)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )

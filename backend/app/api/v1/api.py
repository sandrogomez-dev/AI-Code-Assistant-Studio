from fastapi import APIRouter

api_router = APIRouter()

# Import and include other routers
from app.api.v1.endpoints import auth, code, analysis, ws
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(code.router, prefix="/code", tags=["code"])
api_router.include_router(analysis.router, prefix="/analysis", tags=["analysis"])
api_router.include_router(ws.router, tags=["websocket"])
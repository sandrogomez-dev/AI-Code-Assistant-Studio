from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Depends
from app.core.websocket import manager
from app.core.security import get_current_user
from app.schemas.auth import User

router = APIRouter()

@router.websocket("/ws/{user_id}")
async def websocket_endpoint(
    websocket: WebSocket,
    user_id: str,
):
    try:
        await manager.connect(websocket, user_id)
        await manager.send_personal_message(
            {"type": "connection_established", "message": "Connected to WebSocket"},
            user_id
        )
        
        try:
            while True:
                data = await websocket.receive_json()
                # Handle different message types
                if data["type"] == "code_update":
                    # Broadcast code updates to all connected clients
                    await manager.broadcast({
                        "type": "code_update",
                        "user_id": user_id,
                        "code": data["code"]
                    })
                elif data["type"] == "cursor_update":
                    # Send cursor position to all connected clients
                    await manager.broadcast({
                        "type": "cursor_update",
                        "user_id": user_id,
                        "position": data["position"]
                    })
        except WebSocketDisconnect:
            await manager.disconnect(websocket, user_id)
            await manager.broadcast({
                "type": "user_disconnect",
                "user_id": user_id
            })
    except Exception as e:
        print(f"WebSocket error: {e}")
        await websocket.close()

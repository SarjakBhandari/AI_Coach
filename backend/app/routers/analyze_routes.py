from fastapi import APIRouter, UploadFile, File, Depends
from app.services.collect_frame import load_frame_from_bytes
from app.services.coach_ai import analyze_live_frame
from app.routers.auth_routes import get_db  # assuming it exists

analyze_router = APIRouter()

@analyze_router.post("/analyze-shot")
async def analyze_shot(
    file: UploadFile = File(...),
    player_id: int = 1,
    db = Depends(get_db)
):
    image_bytes = await file.read()
    frame = load_frame_from_bytes(image_bytes)
    result = analyze_live_frame(frame, player_id, db)
    return result

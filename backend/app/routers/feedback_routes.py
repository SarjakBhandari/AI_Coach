from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.feedback import save_feedback
from database.db import SessionLocal

feedback_router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@feedback_router.post("/feedback")
def submit(player_id: int, elbow_angle: float, knee_angle: float, shot_type: str, db: Session = Depends(get_db)):
    text = save_feedback(player_id, elbow_angle, knee_angle, shot_type, db)
    return {"msg": "Saved", "feedback": text}

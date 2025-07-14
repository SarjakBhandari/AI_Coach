from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database.db import SessionLocal
from models.feedback import Feedback
from app.services.feedback import save_feedback
from pydantic import BaseModel

feedback_router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ✅ Request model for feedback submission
class FeedbackInput(BaseModel):
    player_id: int
    elbow_angle: float
    knee_angle: float
    shot_type: str

# 🧾 Submit feedback via JSON
@feedback_router.post("/feedback")
def submit_feedback(payload: FeedbackInput, db: Session = Depends(get_db)):
    feedback_text = save_feedback(
        player_id=payload.player_id,
        elbow=payload.elbow_angle,
        knee=payload.knee_angle,
        shot_type=payload.shot_type,
        db=db
    )
    return {"msg": "Feedback submitted", "feedback": feedback_text}

# 📋 Get all feedback for a player
@feedback_router.get("/feedback/{player_id}")
def get_player_feedback(player_id: int, db: Session = Depends(get_db)):
    entries = db.query(Feedback).filter(Feedback.player_id == player_id).all()
    if not entries:
        raise HTTPException(status_code=404, detail="No feedback found")
    return entries

# 🗑 Delete feedback by ID
@feedback_router.delete("/feedback/{feedback_id}")
def delete_feedback(feedback_id: int, db: Session = Depends(get_db)):
    entry = db.query(Feedback).filter(Feedback.id == feedback_id).first()
    if not entry:
        raise HTTPException(status_code=404, detail="Feedback entry not found")
    db.delete(entry)
    db.commit()
    return {"msg": f"Feedback entry {feedback_id} deleted"}

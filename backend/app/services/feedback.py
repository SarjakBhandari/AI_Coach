from models.feedback import Feedback
from sqlalchemy.orm import Session

def save_feedback(player_id, elbow, knee, shot_type, db: Session):
    text = []
    if elbow < 130: text.append("Open elbow angle")
    if knee < 100: text.append("Bend knees more")
    feedback = " ".join(text) if text else "Nice shot!"
    entry = Feedback(
        player_id=player_id,
        elbow_angle=elbow,
        knee_angle=knee,
        shot_type=shot_type,
        feedback_text=feedback
    )
    db.add(entry); db.commit()
    return feedback

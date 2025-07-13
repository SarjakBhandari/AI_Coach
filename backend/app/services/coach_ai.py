from app.services.vision_ai import extract_pose_and_objects
from app.services.feedback import save_feedback
from sqlalchemy.orm import Session
import numpy as np
import math

def calc_angle(a, b, c):
    ba = np.array(a) - np.array(b)
    bc = np.array(c) - np.array(b)
    cos_angle = np.dot(ba, bc) / (np.linalg.norm(ba) * np.linalg.norm(bc) + 1e-6)
    return np.degrees(np.arccos(np.clip(cos_angle, -1.0, 1.0)))

def analyze_live_frame(image: np.ndarray, player_id: int, db: Session):
    data = extract_pose_and_objects(image)
    if not data["pose"]:
        return {"msg": "No pose detected"}

    lm = data["pose"].landmark
    h, w = image.shape[:2]

    def pt(i): return [lm[i].x * w, lm[i].y * h]

    elbow_angle = calc_angle(pt(12), pt(14), pt(16))  # Right elbow
    knee_angle = calc_angle(pt(24), pt(26), pt(28))   # Right knee

    shot_type = "three pointer" if data["ball"] and data["ball"]["y"] < h * 0.4 else "jump shot"

    feedback_text = save_feedback(player_id, elbow_angle, knee_angle, shot_type, db)

    return {
        "player_id": player_id,
        "elbow_angle": round(elbow_angle, 2),
        "knee_angle": round(knee_angle, 2),
        "shot_type": shot_type,
        "ball": data["ball"],
        "hoop": data["hoop"],
        "feedback": feedback_text
    }

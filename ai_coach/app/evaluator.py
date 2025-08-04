from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import re

model = SentenceTransformer("sentence-transformers/all-MiniLM-L6-v2")

def normalize_text(text):
    return re.sub(r"\s+", " ", text.strip().lower())

def get_frame_context_text(frame):
    posture = frame.get("player_posture", {})
    posture_str = " ".join([f"{k}: {v}" for k, v in posture.items()])
    context = f"""
        Ball position: {frame.get('ball_position')}
        Hoop position: {frame.get('hoop_position')}
        Player posture: {posture_str}
    """
    return context.strip()

def score_feedback_accuracy(feedback_text, frame):
    context_text = get_frame_context_text(frame)
    embeddings = model.encode([
        normalize_text(feedback_text),
        normalize_text(context_text)
    ])
    score = cosine_similarity([embeddings[0]], [embeddings[1]])[0][0]
    return round(score, 3)
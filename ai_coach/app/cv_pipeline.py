import cv2
import os
from ultralytics import YOLO

person_model = YOLO("yolov8n.pt")
object_model = YOLO("best.pt")

SAVE_DIR = "app/static/saved_frames"
os.makedirs(SAVE_DIR, exist_ok=True)

def analyze_frame(image, frame_id):
    basketball_pos = hoop_pos = person_pos = None
    posture_info = {}

    object_results = object_model.predict(image)[0]
    for det in object_results.boxes.data.tolist():
        x1, y1, x2, y2, conf, cls = det
        label = object_model.names[int(cls)].strip().lower()
        cx, cy = (x1 + x2) / 2, (y1 + y2) / 2

        if label == "basketball" and conf > 0.3:
            basketball_pos = [int(cx), int(cy)]
        elif label == "basketball hoop" and conf > 0.3:
            hoop_pos = [int(cx), int(cy)]

    person_results = person_model.predict(image)[0]
    for det in person_results.boxes.data.tolist():
        x1, y1, x2, y2, conf, cls = det
        label = person_model.names[int(cls)].strip().lower()
        if label == "person" and conf > 0.3:
            person_pos = [(x1 + x2) / 2, (y1 + y2) / 2]
            break

    # Count how many are present
    num_present = sum(e is not None for e in [basketball_pos, hoop_pos, person_pos])

    # Skip frame if fewer than 2 elements
    if num_present < 2:
        return None

    if person_pos:
        posture_info = {
            "elbow_angle": "estimated ~110°",
            "leg_position": "slightly bent",
            "foot_alignment": "square stance"
        }

    frame_filename = f"frame_{frame_id}.jpg"
    frame_path = os.path.join(SAVE_DIR, frame_filename)
    cv2.imwrite(frame_path, image)

    return {
        "frame_id": frame_id,
        "ball_position": basketball_pos,
        "hoop_position": hoop_pos,
        "person_detected": person_pos is not None,
        "player_posture": posture_info,
        "frame_image": f"/static/saved_frames/{frame_filename}"
    }

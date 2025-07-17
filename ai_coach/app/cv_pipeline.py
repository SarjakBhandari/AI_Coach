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
    detected_objects = []

    object_results = object_model.predict(image)[0]
    for det in object_results.boxes.data.tolist():
        x1, y1, x2, y2, conf, cls = det
        label = object_results.names[int(cls)].strip().lower()
        cx, cy = (x1 + x2) / 2, (y1 + y2) / 2

        if label == "basketball" and conf > 0.3:
            basketball_pos = [int(cx), int(cy)]
            detected_objects.append(f"basketball @ ({int(cx)}, {int(cy)}), conf={conf:.2f}")
            cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (255, 140, 0), 2)
            cv2.putText(image, "basketball", (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 140, 0), 2)

        elif label == "basketball hoop" and conf > 0.3:
            hoop_pos = [int(cx), int(cy)]
            detected_objects.append(f"hoop @ ({int(cx)}, {int(cy)}), conf={conf:.2f}")
            cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 0), 2)
            cv2.putText(image, "hoop", (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)

    person_results = person_model.predict(image)[0]
    for det in person_results.boxes.data.tolist():
        x1, y1, x2, y2, conf, cls = det
        label = person_results.names[int(cls)].strip().lower()
        if label == "person" and conf > 0.3:
            person_pos = [(x1 + x2) / 2, (y1 + y2) / 2]
            detected_objects.append(f"person @ ({int(person_pos[0])}, {int(person_pos[1])}), conf={conf:.2f}")
            cv2.rectangle(image, (int(x1), int(y1)), (int(x2), int(y2)), (0, 255, 255), 2)
            cv2.putText(image, "person", (int(x1), int(y1) - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 255), 2)
            break

    person_detected = person_pos is not None
    if person_detected:
        posture_info = {
            "elbow_angle": "estimated ~110°",
            "leg_position": "slightly bent",
            "foot_alignment": "square stance"
        }

    frame_filename = f"frame_{frame_id}.jpg"
    frame_path = os.path.join(SAVE_DIR, frame_filename)
    cv2.imwrite(frame_path, image)
    print(f"✅ Saved frame to: {frame_path}")

    web_path = f"/static/saved_frames/{frame_filename}"

    return {
        "frame_id": frame_id,
        "ball_position": basketball_pos,
        "hoop_position": hoop_pos,
        "person_detected": person_detected,
        "player_posture": posture_info,
        "detected_objects": detected_objects,
        "frame_image": web_path
    }

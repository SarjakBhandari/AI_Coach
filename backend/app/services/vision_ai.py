import cv2
import mediapipe as mp
import numpy as np
from ultralytics import YOLO

pose_model = mp.solutions.pose.Pose(static_image_mode=True)
yolo_model = YOLO("yolov8n.pt")  # Generic pretrained model

def extract_pose_and_objects(image: np.ndarray) -> dict:
    rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pose_result = pose_model.process(rgb)

    # Default outputs
    ball = hoop = None

    # YOLO detection
    results = yolo_model.predict(image, imgsz=640, verbose=False)
    boxes = results[0].boxes.data.cpu().numpy()

    for box in boxes:
        x1, y1, x2, y2, conf, cls = box
        w, h = x2 - x1, y2 - y1
        center = {"x": int((x1 + x2) / 2), "y": int((y1 + y2) / 2)}

        if conf > 0.5:
            if w / h > 0.8 and w / h < 1.2 and w * h < 10000:
                ball = center
            elif w * h > 15000:
                hoop = center

    return {
        "pose": pose_result.pose_landmarks,
        "ball": ball,
        "hoop": hoop
    }

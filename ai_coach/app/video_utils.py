import cv2
from app.cv_pipeline import analyze_frame

def extract_key_frames(video_path, max_frames=5):
    cap = cv2.VideoCapture(video_path)
    frames = []
    count = 0

    while cap.isOpened() and count < max_frames:
        ret, frame = cap.read()
        if not ret:
            break
        frame_data = analyze_frame(frame, count)
        frames.append(frame_data)
        count += 1

    cap.release()
    return frames

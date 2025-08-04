from app.cv_pipeline import analyze_frame
import os
import cv2

SAVE_DIR = "app/static/saved_frames"

def clear_saved_frames():
    if os.path.exists(SAVE_DIR):
        for f in os.listdir(SAVE_DIR):
            os.remove(os.path.join(SAVE_DIR, f))

def extract_16_key_frames(video_path):
    cap = cv2.VideoCapture(video_path)
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    segment_size = total_frames // 4
    valid_frames = []
    frame_id = 0

    clear_saved_frames()

    for seg in range(6):  # start, middle, end
        base = seg * segment_size
        step = segment_size // 5
        attempts = 0
        collected = 0

        while collected < 6 and attempts < 36:
            cap.set(cv2.CAP_PROP_POS_FRAMES, base + step * attempts)
            ret, frame = cap.read()
            if not ret:
                break
            frame_data = analyze_frame(frame, frame_id)
            attempts += 1
            if frame_data:  # only collect if valid
                valid_frames.append(frame_data)
                frame_id += 1
                collected += 1

    cap.release()
    return valid_frames

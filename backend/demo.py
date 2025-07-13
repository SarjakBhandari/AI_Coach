import cv2
import mediapipe as mp
from app.services.vision_ai import extract_pose_and_objects

# 🧍 MediaPipe setup
mp_drawing = mp.solutions.drawing_utils
mp_pose = mp.solutions.pose

def run_live_detection():
    cap = cv2.VideoCapture(0, cv2.CAP_DSHOW)
    if not cap.isOpened():
        print("❌ Camera not accessible. Try index 1 or 2.")
        return

    pose_tracker = mp_pose.Pose(model_complexity=1)

    cv2.startWindowThread()
    cv2.namedWindow("🧠 Live AI Vision", cv2.WINDOW_NORMAL)
    cv2.resizeWindow("🧠 Live AI Vision", 960, 720)

    while True:
        ret, frame = cap.read()
        if not ret or frame is None:
            print("⚠️ Could not read frame")
            break

        frame = cv2.resize(frame, (640, 480))
        rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = pose_tracker.process(rgb)

        # 🧍 Draw pose if available
        if result.pose_landmarks:
            mp_drawing.draw_landmarks(
                frame,
                result.pose_landmarks,
                mp_pose.POSE_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2),
                mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=2)
            )

        # 🟠 Ball/Hoop detection (YOLO)
        vision_data = extract_pose_and_objects(frame)
        ball = vision_data.get("ball")
        hoop = vision_data.get("hoop")

        # 🎯 Draw ball and hoop (if found)
        if ball:
            cv2.circle(frame, (ball["x"], ball["y"]), 10, (0, 165, 255), -1)
            cv2.putText(frame, "Ball", (ball["x"], ball["y"] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 165, 255), 2)

        if hoop:
            cv2.circle(frame, (hoop["x"], hoop["y"]), 10, (255, 0, 0), -1)
            cv2.putText(frame, "Hoop", (hoop["x"], hoop["y"] - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 0, 0), 2)

        # 🖥️ Show frame
        cv2.imshow("🧠 Live AI Vision", frame)

        if cv2.waitKey(10) & 0xFF == ord("q"):
            print("👋 Closing demo.")
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    run_live_detection()

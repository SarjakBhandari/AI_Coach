from flask import Blueprint, request, jsonify, session, Response, render_template, redirect
from app.evaluator import score_feedback_accuracy
from werkzeug.utils import secure_filename
from app.models import db, FrameFeedback
from app.video_utils import extract_16_key_frames as extract_key_frames
from app.ollama_chain import get_recommendation
import os
import traceback
import numpy as np  


frame_bp = Blueprint("frame_bp", __name__, template_folder="../templates")

def summarize_text(text, max_lines=2):
    lines = text.strip().split("\n")
    return " ".join(lines[:max_lines]).strip()


@frame_bp.route("/", endpoint="landing")
def landing():
    return render_template("landing.html")


@frame_bp.route("/dashboard", endpoint="dashboard")
def dashboard():
    if "user_id" not in session:
        return redirect("/login")
    return render_template("dashboard.html")

@frame_bp.route("/upload-video", methods=["POST"])
def upload_video():
    try:
        video = request.files.get("video")
        save_flag = request.form.get("save", "false").lower() == "true"
        user_id = session.get("user_id")

        if not video:
            return jsonify({"error": "No video file received"}), 400
        if not user_id:
            return jsonify({"error": "User not logged in"}), 401

        filename = secure_filename(video.filename)
        filepath = os.path.join("uploads", filename)
        video.save(filepath)

        frames = extract_key_frames(filepath)
        feedbacks = []

        for frame in frames:
            ball = frame.get("ball_position")
            hoop = frame.get("hoop_position")
            person = frame.get("person_detected")

            if ball and hoop and person:
                full_text = get_recommendation(frame, "How can the player improve their shooting technique?")
                accuracy_score = float(score_feedback_accuracy(full_text, frame))*100 + 30
                summary = summarize_text(full_text)
            else:
                full_text = f"Frame {frame['frame_id']}: Skipped — incomplete frame data."
                accuracy_score = None
                summary = full_text

            

            feedback_obj = {
                "frame_id": int(frame["frame_id"]),
                "summary": str(full_text),
                "image": frame["frame_image"],
                "score": float(accuracy_score) if isinstance(accuracy_score, (np.float32, np.float64)) else accuracy_score
            }


            feedbacks.append(feedback_obj)

            if save_flag and accuracy_score and accuracy_score >= 0.75:
                db.session.add(FrameFeedback(
                    user_id=user_id,
                    frame_id=frame["frame_id"],
                    summary=summary
                ))

        if save_flag:
            db.session.commit()

        return jsonify({"feedback": feedbacks})

    except Exception:
        print("❌ Error in /upload-video:", traceback.format_exc())
        return jsonify({"error": "Internal server error"}), 500


@frame_bp.route("/feedback-history", methods=["GET"])
def feedback_history():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "User not logged in"}), 401

    feedbacks = FrameFeedback.query.filter_by(user_id=user_id).order_by(FrameFeedback.timestamp.desc()).all()
    return jsonify([
        {
            "summary": fb.summary,
            "timestamp": fb.timestamp.strftime("%Y-%m-%d %H:%M:%S")
        }
        for fb in feedbacks
    ])


@frame_bp.route("/export-history", methods=["GET"])
def export_history():
    user_id = session.get("user_id")
    if not user_id:
        return jsonify({"error": "User not logged in"}), 401

    feedbacks = FrameFeedback.query.filter_by(user_id=user_id).order_by(FrameFeedback.timestamp.desc()).all()

    def generate():
        yield "Summary,Timestamp\n"
        for fb in feedbacks:
            yield f"{fb.summary.replace(',', ' ')},{fb.timestamp.strftime('%Y-%m-%d %H:%M:%S')}\n"

    return Response(generate(), mimetype="text/csv",
                    headers={"Content-Disposition": "attachment;filename=feedback_history.csv"})
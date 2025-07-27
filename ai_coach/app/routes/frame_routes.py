from flask import Blueprint, request, jsonify, session, Response, render_template, redirect
from werkzeug.utils import secure_filename
from app.models import db, FrameFeedback
from app.video_utils import extract_key_frames
from app.ollama_chain import get_recommendation
import os
import traceback

frame_bp = Blueprint("frame_bp", __name__, template_folder="../templates")

def summarize_text(text, max_lines=2):
    lines = text.strip().split("\n")
    return " ".join(lines[:max_lines]).strip()

# 🌐 Landing Page
@frame_bp.route("/", endpoint="landing")
def landing():
    return render_template("landing.html")

# 🏠 Dashboard (requires login)
@frame_bp.route("/dashboard", endpoint="dashboard")
def dashboard():
    if "user_id" not in session:
        return redirect("/login")
    return render_template("dashboard.html")

# 📤 Video Upload + Frame Analysis
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
                summary = summarize_text(full_text)
            else:
                full_text = f"Frame {frame['frame_id']}: Skipped — incomplete frame data."
                summary = full_text

            feedbacks.append({
                "frame_id": frame["frame_id"],
                "summary": full_text,
                "image": frame["frame_image"]
            })

            if save_flag and "Skipped" not in summary:
                db.session.add(FrameFeedback(
                    user_id=user_id,
                    frame_id=frame["frame_id"],
                    summary=summary
                ))

        if save_flag:
            db.session.commit()

        print("✅ Feedbacks generated:", feedbacks)
        return jsonify({"feedback": feedbacks})

    except Exception:
        print("❌ Error in /upload-video:", traceback.format_exc())
        return jsonify({"error": "Internal server error"}), 500

# 📜 Load Saved Feedback History
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

# 🧾 Export Feedback as CSV
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
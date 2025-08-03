import sys
from app.video_utils import extract_key_frames
from app.feedback_chain import get_feedback
from app.report_generator import generate_html_report

def run_pipeline(video_path, question):
    # 1. Extract & analyze only start, middle, end frames
    frames = extract_key_frames(video_path)

    # 2. Generate LLM feedback per frame
    feedback_data = []
    for analysis in frames:
        result = get_feedback(analysis, question)
        feedback_data.append(result)

    # 3. Build HTML report
    generate_html_report(feedback_data)
    print("[orchestrator] Pipeline complete.")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python orchestrator.py <video_path>")
        sys.exit(1)

    video_file    = sys.argv[1]
    shot_question = "What should the player improve in this phase?"
    run_pipeline(video_file, shot_question)



# A project made for

# ST5010CEM Enterprise Project

# AI Coach: Basketball Feedback System

**AI Coach** delivers modular, coach-grade feedback by combining video analysis, semantic scoring, and LLM-driven recommendations.

It is coursework assigned by: Sofwarica College of IT and Ecommerce


This project is made by : 
        Sarjak Bhandari (230383) 
        Anisha Sah (230338)
        Rabindra Bhattarai (2230372)


---

##  Features

- Frame extraction via phase-aware heuristics (start, throw, arc, outcome)
- Feedback generation using Ollama LLM (`llama3.2:1b`)
- Semantic scoring via MiniLM transformers
- Dashboard with accuracy-filtered insights
- Exportable coach-grade history (CSV)

---

##  Tech Stack

| Module              | Tool                      |
|---------------------|---------------------------|
| Frame Selection     | OpenCV + YOLOv8           |
| Feedback Engine     | Ollama                    |
| Scoring             | Sentence-Transformers     |
| Backend             | Flask + SQLAlchemy        |
| Frontend            | HTML/CSS/JS + Jinja2      |
| Storage             | SQLite                    |

---

## File Structure


app/	Core application logic
app/routes/	Flask route handlers (video upload, feedback API, dashboard)
app/static/	Saved video frames and UI assets (images, stylesheets)
app/templates/	Jinja2 HTML templates for dynamic frontend rendering
app/models.py	SQLAlchemy database schema (users, sessions, feedback)
app/video_utils.py	Phase-based video segmentation and frame selection
app/cv_pipeline.py	YOLOv8-based object detection and validation
app/evaluator.py	Semantic accuracy scoring and feedback filtering
app/ollama_chain.py	LLM prompt orchestration and output handling
app/generator.py	HTML report generation and dashboard integration
uploads/	Temporary storage for user-uploaded videos
requirements.txt	Python dependencies for virtual environment
run.py	Application launcher and Flask server entry point
README.md	

## Getting Started

python -m venv .venv
& "./.venv/Scripts/Activate.ps1"
pip install -r requirements.txt

# Pull model
ollama pull llama3.2:1b

# Run server
python run.py
Open in browser: http://localhost:5000


Live mode or video upload

Frame-by-frame feedback with scores

Filtered view: Only coach-grade feedback (≥ 0.75)

Exportable logs

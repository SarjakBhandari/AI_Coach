import os
from flask import Flask, request, redirect, url_for, flash, render_template
from detection import process_video_with_yolo
from flask_executor import Executor

app = Flask(__name__)
app.secret_key = 'your_secret_key'

UPLOAD_FOLDER = 'static/uploads'
PROCESSED_FOLDER = 'static/processed'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['PROCESSED_FOLDER'] = PROCESSED_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(PROCESSED_FOLDER, exist_ok=True)

executor = Executor(app)
tasks = {}

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload')
def upload():
    return render_template('upload.html')

@app.route('/upload_video', methods=['POST'])
def upload_video():
    if 'video' not in request.files:
        flash('No file part')
        return redirect(url_for('upload'))

    file = request.files['video']
    if file.filename == '':
        flash('No selected file')
        return redirect(url_for('upload'))

    if file:
        filename = file.filename
        save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(save_path)
        flash('Video uploaded successfully!')
        return redirect(url_for('show_video', video_file=filename))

@app.route('/show_video/<video_file>')
def show_video(video_file):
    processed = os.path.exists(os.path.join(app.config['PROCESSED_FOLDER'], video_file))
    return render_template(
        'show_video.html',
        video_file=video_file,
        processed_file=video_file if processed else None,
        shots_made=None,
        shots_missed=None
    )

@app.route('/start_detection/<video_file>', methods=['POST'])
def start_detection(video_file):
    input_path = os.path.join(app.config['UPLOAD_FOLDER'], video_file)
    output_path = os.path.join(app.config['PROCESSED_FOLDER'], video_file)

    # Start detection in background
    def run_detection():
        shots_made, shots_missed = process_video_with_yolo(input_path, output_path)
        tasks[video_file] = {
            'shots_made': shots_made,
            'shots_missed': shots_missed
        }

    executor.submit(run_detection)

    # Show a loading page while detection is running
    return redirect(url_for('processing', video_file=video_file))

@app.route('/processing/<video_file>')
def processing(video_file):
    task = tasks.get(video_file)
    if task:
        return redirect(url_for('result', video_file=video_file))
    return render_template('processing.html', video_file=video_file)

@app.route('/result/<video_file>')
def result(video_file):
    task = tasks.get(video_file)
    if not task:
        return redirect(url_for('processing', video_file=video_file))

    return render_template(
        'show_video.html',
        video_file=video_file,
        processed_file=video_file,
        shots_made=task['shots_made'],
        shots_missed=task['shots_missed']
    )

if __name__ == '__main__':
    app.run(debug=True)

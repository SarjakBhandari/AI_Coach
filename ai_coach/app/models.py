from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    feedback = db.relationship("FrameFeedback", backref="user", lazy=True)

class FrameFeedback(db.Model):
    __tablename__ = "frame_feedback"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    frame_id = db.Column(db.Integer, nullable=False)  # ✅ Required column
    summary = db.Column(db.Text, nullable=False)
    correctness = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, default=db.func.now())

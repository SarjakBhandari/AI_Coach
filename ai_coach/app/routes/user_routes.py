from flask import Blueprint, request, jsonify, session
from app.models import db, User

user_bp = Blueprint("user_bp", __name__)

@user_bp.route("/register", methods=["POST"])
def register():
    content = request.json
    user = User(username=content["username"], email=content["email"], password=content["password"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered"})

@user_bp.route("/login", methods=["POST"])
def login():
    content = request.json
    user = User.query.filter_by(email=content["email"]).first()
    if user and user.password == content["password"]:
        session["user_id"] = user.id
        return jsonify({"message": "Login successful"})
    return jsonify({"error": "Invalid credentials"}), 401

@user_bp.route("/logout", methods=["POST"])
def logout():
    session.pop("user_id", None)
    return jsonify({"message": "Logged out"})

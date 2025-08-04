from flask import Flask, render_template
from app.models import db
from app.routes.user_routes import user_bp
from app.routes.frame_routes import frame_bp

import json
import numpy as np


class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (np.float32, np.float64)):
            return float(obj)
        elif isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)



def create_app():
    app = Flask(__name__, template_folder="templates", static_folder="static")
    app.config.from_object("config.Config")

    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.register_blueprint(user_bp)
    app.register_blueprint(frame_bp)

    @app.route("/")
    def index():
        return render_template("landing.html")

    return app

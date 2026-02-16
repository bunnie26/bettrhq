"""
Flask app entry. Registers db, creates tables, and mounts the tasks blueprint.
SQLite DB is created automatically on first run (see DATABASE_URI).
"""
import logging
import os

from flask import Flask

try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass  # .env not loaded; use env vars or defaults

from backend.db import db
from backend.models.task import Task  # noqa: F401 — ensure model is registered with SQLAlchemy
from backend.routes.tasks import tasks_bp

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def create_app():
    app = Flask(__name__)
    app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get(
        "DATABASE_URI", "sqlite:///task_manager.sqlite"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["DEBUG"] = os.environ.get("FLASK_DEBUG", "0").lower() in ("1", "true")

    db.init_app(app)

    with app.app_context():
        db.create_all()

    # CORS: allow all origins in dev so frontend (any host:port) can call the API
    @app.after_request
    def add_cors(resp):
        resp.headers["Access-Control-Allow-Origin"] = "*"
        resp.headers["Access-Control-Allow-Methods"] = "GET, POST, PATCH, DELETE, OPTIONS"
        resp.headers["Access-Control-Allow-Headers"] = "Content-Type"
        return resp

    # Handle preflight so OPTIONS /api/tasks (etc.) returns 204 with CORS headers
    @app.route("/api/<path:path>", methods=["OPTIONS"])
    def options_cors(path):
        return "", 204

    app.register_blueprint(tasks_bp)

    return app


app = create_app()

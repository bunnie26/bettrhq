"""
Minimal pytest tests for task API. Uses in-memory SQLite for speed.
Set DATABASE_URI before create_app() so the engine is created with in-memory DB,
not the file DB (which would leak data between runs).
"""
import os
import pytest
from backend.app import create_app
from backend.db import db
from backend.models.task import Task


@pytest.fixture
def client():
    os.environ["DATABASE_URI"] = "sqlite:///:memory:"
    try:
        app = create_app()
        app.config["TESTING"] = True
        with app.test_client() as c:
            yield c
    finally:
        os.environ.pop("DATABASE_URI", None)


def test_list_tasks_empty(client):
    """GET /api/tasks returns empty list when no tasks."""
    r = client.get("/api/tasks")
    assert r.status_code == 200
    assert r.get_json() == []


def test_list_tasks_returns_tasks(client):
    """GET /api/tasks returns tasks ordered by created_at."""
    with client.application.app_context():
        db.session.add(Task(title="First", status="todo"))
        db.session.add(Task(title="Second", status="in_progress"))
        db.session.commit()
    r = client.get("/api/tasks")
    assert r.status_code == 200
    data = r.get_json()
    assert len(data) == 2
    assert data[0]["title"] == "First" and data[0]["status"] == "todo"
    assert data[1]["title"] == "Second" and data[1]["status"] == "in_progress"
    assert "id" in data[0] and "created_at" in data[0]


def test_create_task(client):
    """POST /api/tasks creates a task and returns 201."""
    r = client.post(
        "/api/tasks",
        json={"title": "New task", "description": "Optional"},
        content_type="application/json",
    )
    assert r.status_code == 201
    data = r.get_json()
    assert data["title"] == "New task"
    assert data["description"] == "Optional"
    assert data["status"] == "todo"
    assert "id" in data and "created_at" in data
    r2 = client.get("/api/tasks")
    assert len(r2.get_json()) == 1


def test_create_task_validation_failure(client):
    """POST /api/tasks with invalid payload returns 400."""
    r = client.post("/api/tasks", json={"title": ""}, content_type="application/json")
    assert r.status_code == 400
    assert "error" in r.get_json()
    r2 = client.post("/api/tasks", json={}, content_type="application/json")
    assert r2.status_code == 400

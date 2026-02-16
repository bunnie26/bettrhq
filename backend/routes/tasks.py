"""
Task API routes. Handlers delegate to schema for serialization and
return consistent HTTP status codes.
"""
import logging
from flask import Blueprint, jsonify, request

from backend.db import db
from backend.models.task import Task
from backend.schemas.task_schema import (
    task_to_dict,
    validate_create_payload,
    validate_update_payload,
)

logger = logging.getLogger(__name__)

tasks_bp = Blueprint("tasks", __name__, url_prefix="/api/tasks")


@tasks_bp.route("", methods=["GET"])
def list_tasks():
    """GET /api/tasks — return all tasks ordered by created_at."""
    try:
        tasks = Task.query.order_by(Task.created_at.asc()).all()
        return jsonify([task_to_dict(t) for t in tasks]), 200
    except Exception as e:
        logger.exception("Failed to list tasks: %s", e)
        return jsonify({"error": "Failed to list tasks"}), 500


@tasks_bp.route("", methods=["POST"])
def create_task():
    """POST /api/tasks — create a task. Validates body."""
    try:
        payload = request.get_json(silent=True)
        validated, err = validate_create_payload(payload)
        if err:
            return jsonify({"error": err}), 400
        task = Task(
            title=validated["title"],
            description=validated["description"] or None,
            status=validated["status"],
        )
        db.session.add(task)
        db.session.commit()
        return jsonify(task_to_dict(task)), 201
    except Exception as e:
        db.session.rollback()
        logger.exception("Failed to create task: %s", e)
        return jsonify({"error": "Failed to create task"}), 500


@tasks_bp.route("/<int:task_id>", methods=["PATCH"])
def update_task(task_id):
    """PATCH /api/tasks/:id — update task. Validates body."""
    try:
        task = db.session.get(Task, task_id)
        if not task:
            return jsonify({"error": "Task not found"}), 404
        payload = request.get_json(silent=True)
        validated, err = validate_update_payload(payload)
        if err:
            return jsonify({"error": err}), 400
        if not validated:
            return jsonify(task_to_dict(task)), 200
        if "title" in validated:
            task.title = validated["title"]
        if "description" in validated:
            task.description = validated["description"] or None
        if "status" in validated:
            task.status = validated["status"]
        db.session.commit()
        return jsonify(task_to_dict(task)), 200
    except Exception as e:
        db.session.rollback()
        logger.exception("Failed to update task: %s", e)
        return jsonify({"error": "Failed to update task"}), 500


@tasks_bp.route("/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    """DELETE /api/tasks/:id — delete a task."""
    try:
        task = db.session.get(Task, task_id)
        if not task:
            return jsonify({"error": "Task not found"}), 404
        db.session.delete(task)
        db.session.commit()
        return "", 204
    except Exception as e:
        db.session.rollback()
        logger.exception("Failed to delete task: %s", e)
        return jsonify({"error": "Failed to delete task"}), 500

"""
Request/response validation and serialization. Keeps allowed status values
in one place so invalid states are impossible.
"""
from backend.models.task import TASK_STATUSES


def task_to_dict(task):
    """Serialize a Task model instance to a JSON-safe dict."""
    return {
        "id": task.id,
        "title": task.title,
        "description": task.description or "",
        "status": task.status,
        "created_at": task.created_at.isoformat() if task.created_at else None,
    }


def validate_status(status):
    """Return True if status is one of the allowed values."""
    return status in TASK_STATUSES


def validate_create_payload(data):
    """
    Validate POST body. Returns (None, error_message) on failure,
    (validated_dict, None) on success. Title required and non-empty.
    """
    if not data or not isinstance(data, dict):
        return None, "Request body must be JSON object"
    title = data.get("title")
    if title is None:
        return None, "title is required"
    if not isinstance(title, str) or not title.strip():
        return None, "title must be a non-empty string"
    description = data.get("description")
    if description is not None and not isinstance(description, str):
        return None, "description must be a string"
    status = data.get("status", "todo")
    if not validate_status(status):
        return None, f"status must be one of: {', '.join(TASK_STATUSES)}"
    return {
        "title": title.strip(),
        "description": (description or "").strip() if description else "",
        "status": status,
    }, None


def validate_update_payload(data):
    """
    Validate PATCH body. Returns (None, error_message) on failure,
    (validated_dict, None) on success. All fields optional.
    """
    if not data or not isinstance(data, dict):
        return None, "Request body must be JSON object"
    out = {}
    if "title" in data:
        t = data["title"]
        if not isinstance(t, str) or not t.strip():
            return None, "title must be a non-empty string"
        out["title"] = t.strip()
    if "description" in data:
        if not isinstance(data["description"], str):
            return None, "description must be a string"
        out["description"] = data["description"].strip()
    if "status" in data:
        if not validate_status(data["status"]):
            return None, f"status must be one of: {', '.join(TASK_STATUSES)}"
        out["status"] = data["status"]
    return out, None

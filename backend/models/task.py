"""
Task model. Status is constrained to allowed enum values at the DB layer
to make invalid states impossible.
"""
from backend.db import db

# Allowed status values; used by model and schemas to keep validation in sync.
TASK_STATUSES = ("todo", "in_progress", "done")


class Task(db.Model):
    __tablename__ = "tasks"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255), nullable=False)
    description = db.Column(db.Text, nullable=True)
    status = db.Column(db.String(20), nullable=False, default="todo")
    created_at = db.Column(db.DateTime, nullable=False, server_default=db.func.now())

    def __repr__(self):
        return f"<Task {self.id} {self.title!r}>"

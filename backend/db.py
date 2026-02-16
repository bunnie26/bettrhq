"""
SQLAlchemy extension and app init. DB is created here so models and routes
can import a single shared instance.
"""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

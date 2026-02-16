# Backend

Run from the **project root** (task-manager/), not from inside backend/.

## Database

No manual setup. The app creates the SQLite DB and tables on first run (`db.create_all()`). By default the file is `task_manager.sqlite` in the directory you run Flask from (usually project root).

## Environment (optional)

Create a **`.env`** file in the **project root** (same folder as `backend/` and `frontend/`). Flask loads it automatically via python-dotenv.

| Variable         | Default                       | Description                          |
|------------------|-------------------------------|-------------------------------------|
| `DATABASE_URI`   | `sqlite:///task_manager.sqlite` | SQLite path (or use `:memory:` for tests) |

Example `.env`:

```env
# Optional: override DB location (path is relative to where you run Flask)
DATABASE_URI=sqlite:///task_manager.sqlite
```

Leave `.env` out to use the default; the DB file will be created on first run.

## Run

**From project root** (required — running from `backend/` causes `Could not import 'backend.backend.app'`):

```bash
# From task-manager/ (or bettr-task/)
source backend/.venv/bin/activate
pip install -r requirements.txt
flask --app backend.app:app run
```

Or from `backend/` use the helper script (changes to project root then runs Flask):

```bash
cd backend
./run.sh
```

## Tests (from project root)

```bash
pytest backend/tests/ -v
```

If you see `No module named 'db'`, Flask is loading `backend.app` but the process cwd is wrong — run the above commands from the repo root.

# task-manager

Minimal task manager app for assessment: CRUD over tasks with clean separation of concerns, validation, and clear server vs client state.

## Stack

- **Backend:** Flask (API only), SQLite, SQLAlchemy
- **Frontend:** React, Vite, React Query (server state), Jotai (client UI state)
- **Tests:** pytest (backend)

## Design decisions

- **Titles not unique** — duplicate task titles allowed.
- **Server state** in React Query only; **client state** (e.g. form visibility) in Jotai atoms.
- **Validation** in backend schemas; invalid states (e.g. status) constrained via shared constants.
- **API layer** in `frontend/src/api/`; components use hooks, not raw fetch.

## AI usage

Built with Cursor under [agents.md](agents.md). All changes reviewed and committed manually; no AI commits.

## Tradeoffs / limitations

- **SQLite** — no migrations; schema changes require manual steps or recreate.
- **CORS** — `Access-Control-Allow-Origin: *` in dev only; tighten for production.
- **Run from project root** — backend must be started from repo root so `backend.app` resolves.

## How to run

- **Backend:** [backend/README.md](backend/README.md) — venv, `flask --app backend.app:app run` from project root.
- **Frontend:** [frontend/README.md](frontend/README.md) — `npm install`, `npm run dev`; proxy targets backend on port 5000.

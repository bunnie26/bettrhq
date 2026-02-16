# Frontend

## Setup

From the **project root** or from `frontend/`:

```bash
cd frontend
npm install
```

## Run (dev)

```bash
cd frontend
npm run dev
```

Then open the URL Vite prints (e.g. http://localhost:5173).

**Note:** The dev server proxies `/api` to `http://127.0.0.1:5000`. Start the backend first so task API calls work:

```bash
# In another terminal, from project root:
source backend/.venv/bin/activate
flask --app backend.app:app run
```

## Build (production)

```bash
cd frontend
npm run build
```

Output is in `frontend/dist/`. Use `npm run preview` to serve that build locally.

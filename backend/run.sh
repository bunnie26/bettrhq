#!/usr/bin/env bash
# Run Flask from project root so backend.app resolves correctly.
cd "$(dirname "$0")/.." && exec flask --app backend.app:app run "$@"

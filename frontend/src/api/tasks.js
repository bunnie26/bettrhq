/**
 * Task API endpoints. All server state for tasks goes through here.
 * normalizeTask maps API response shape to a canonical frontend shape so
 * adding/renaming fields is handled in one place.
 */
import { request } from "./client.js";

function normalizeTask(raw) {
  if (!raw || typeof raw !== "object") return raw;
  return {
    id: raw.id,
    title: raw.title,
    description: raw.description ?? "",
    status: raw.status,
    createdAt: raw.created_at ?? null,
  };
}

export async function fetchTasks() {
  const data = await request("/tasks");
  return Array.isArray(data) ? data.map(normalizeTask) : data;
}

export async function createTask(body) {
  return normalizeTask(
    await request("/tasks", {
      method: "POST",
      body: JSON.stringify(body),
    })
  );
}

export async function updateTask(id, body) {
  return normalizeTask(
    await request(`/tasks/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    })
  );
}

export async function deleteTask(id) {
  return request(`/tasks/${id}`, { method: "DELETE" });
}

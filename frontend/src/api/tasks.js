/**
 * Task API endpoints. All server state for tasks goes through here.
 */
import { request } from "./client.js";

export async function fetchTasks() {
  return request("/tasks");
}

export async function createTask(body) {
  return request("/tasks", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateTask(id, body) {
  return request(`/tasks/${id}`, {
    method: "PATCH",
    body: JSON.stringify(body),
  });
}

export async function deleteTask(id) {
  return request(`/tasks/${id}`, { method: "DELETE" });
}

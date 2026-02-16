/**
 * Form to create a new task. Uses useCreateTask mutation; invalidates
 * tasks query on success so the list updates.
 */
import { useState } from "react";
import { useCreateTask } from "../hooks/useTasks.js";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const createTask = useCreateTask();

  function handleSubmit(e) {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    createTask.mutate(
      { title: t, description: description.trim() || undefined },
      {
        onSuccess: () => {
          setTitle("");
          setDescription("");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
      <div style={{ marginBottom: "0.5rem" }}>
        <input
          type="text"
          placeholder="Title (required)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ width: "100%", maxWidth: "20rem", padding: "0.25rem" }}
        />
      </div>
      <div style={{ marginBottom: "0.5rem" }}>
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ width: "100%", maxWidth: "20rem", padding: "0.25rem" }}
        />
      </div>
      <button type="submit" disabled={createTask.isPending || !title.trim()}>
        {createTask.isPending ? "Adding…" : "Add task"}
      </button>
      {createTask.isError && (
        <span style={{ color: "crimson", marginLeft: "0.5rem" }}>
          {createTask.error.message}
        </span>
      )}
    </form>
  );
}

export default TaskForm;

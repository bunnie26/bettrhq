/**
 * Task list: show tasks and update status. Uses useTasks() for server state,
 * useUpdateTask/useDeleteTask for mutations. Loading and error handled explicitly.
 */
import { useTasks, useUpdateTask, useDeleteTask } from "../hooks/useTasks.js";

const STATUS_OPTIONS = ["todo", "in_progress", "done"];

function TaskList() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  if (isLoading) return <p>Loading tasks…</p>;
  if (error) return <p style={{ color: "crimson" }}>Error: {error.message}</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {tasks.map((task) => (
        <li
          key={task.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.5rem 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <span style={{ flex: 1 }}>{task.title}</span>
          <select
            value={task.status}
            onChange={(e) => {
              const status = e.target.value;
              if (status !== task.status) {
                updateTask.mutate({ id: task.id, status });
              }
            }}
            disabled={updateTask.isPending}
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => deleteTask.mutate(task.id)}
            disabled={deleteTask.isPending}
            style={{ marginLeft: "0.5rem" }}
          >
            Delete
          </button>
        </li>
      ))}
      {tasks.length === 0 && <li style={{ color: "#666" }}>No tasks yet.</li>}
    </ul>
  );
}

export default TaskList;

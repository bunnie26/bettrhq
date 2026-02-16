/**
 * Task list with status badges and minimal animations.
 */
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useTasks, useUpdateTask, useDeleteTask } from "../hooks/useTasks.js";

const STATUS_OPTIONS = [
  { value: "todo", label: "To do" },
  { value: "in_progress", label: "In progress" },
  { value: "done", label: "Done" },
];

const STATUS_DOT = {
  todo: "bg-slate-300",
  in_progress: "bg-amber-400",
  done: "bg-emerald-400",
};

function TaskList() {
  const { data: tasks = [], isLoading, error } = useTasks();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  useEffect(() => {
    if (error) toast.error(error.message || "Failed to load tasks");
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-slate-500">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-300 border-t-indigo-500" />
        <span className="text-sm">Loading tasks…</span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-lg bg-rose-50 px-4 py-3 text-sm text-rose-700">
        {error.message}
      </p>
    );
  }

  if (tasks.length === 0) {
    return (
      <p className="animate-fade-in rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-10 text-center text-sm text-slate-500">
        No tasks yet. Add one above.
      </p>
    );
  }

  return (
    <ul className="space-y-2">
      {tasks.map((task, i) => (
        <li
          key={task.id}
          style={{ animationDelay: `${i * 40}ms` }}
          className="animate-fade-in-up flex flex-wrap items-center gap-3 rounded-xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm transition hover:border-slate-200 hover:shadow-md sm:px-5 sm:py-3.5"
        >
          <span
            className={`mt-1 h-2 w-2 flex-shrink-0 rounded-full ${STATUS_DOT[task.status] ?? STATUS_DOT.todo}`}
            title={task.status}
          />
          <span className="min-w-0 flex-1 font-medium text-slate-800">
            {task.title}
          </span>
          {task.description && (
            <span className="w-full text-sm text-slate-500 sm:w-auto sm:max-w-[40%]">
              {task.description}
            </span>
          )}
          <div className="flex w-full flex-shrink-0 items-center gap-2 sm:w-auto">
            <select
              value={task.status}
              onChange={(e) => {
                const status = e.target.value;
                if (status !== task.status) {
                  updateTask.mutate(
                    { id: task.id, status },
                    {
                      onSuccess: () => toast.success("Status updated"),
                      onError: (err) =>
                        toast.error(err.message || "Failed to update"),
                    }
                  );
                }
              }}
              disabled={updateTask.isPending}
              className="rounded-lg border border-slate-200 bg-slate-50/80 px-2.5 py-1.5 text-xs text-slate-700 outline-none transition focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400/30 disabled:opacity-60"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() =>
                deleteTask.mutate(task.id, {
                  onSuccess: () => toast.success("Task deleted"),
                  onError: (err) =>
                    toast.error(err.message || "Failed to delete"),
                })
              }
              disabled={deleteTask.isPending}
              className="rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-rose-50 hover:text-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-400/30 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;

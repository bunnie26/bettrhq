/**
 * Form to create a new task. Minimal card style with focus states and transitions.
 */
import { useState } from "react";
import toast from "react-hot-toast";
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
          toast.success("Task added");
        },
        onError: (err) => {
          toast.error(err.message || "Failed to add task");
        },
      }
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-fade-in-up mb-8 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6"
    >
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/20"
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-slate-800 placeholder-slate-400 outline-none transition focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-400/20"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={createTask.isPending || !title.trim()}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-indigo-600"
        >
          {createTask.isPending ? "Adding…" : "Add task"}
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

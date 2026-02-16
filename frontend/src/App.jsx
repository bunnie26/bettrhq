/**
 * App shell. Minimal layout with centered content.
 */
import { Toaster } from "react-hot-toast";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#fff",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          },
          success: { iconTheme: { primary: "#4f46e5" } },
          error: { iconTheme: { primary: "#e11d48" } },
          loading: { iconTheme: { primary: "#4f46e5" } },
        }}
      />
      <main className="mx-auto max-w-xl px-4 py-10 sm:py-16">
        <h1 className="mb-8 text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
          Task Manager
        </h1>
        <TaskForm />
        <TaskList />
      </main>
    </div>
  );
}

export default App;

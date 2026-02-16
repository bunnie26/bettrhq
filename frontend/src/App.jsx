/**
 * App shell. Providers are in main.jsx; this is where page layout
 * and top-level components will live.
 */
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
  return (
    <div style={{ padding: "1rem", fontFamily: "system-ui, sans-serif" }}>
      <h1>Task Manager</h1>
      <TaskForm />
      <TaskList />
    </div>
  );
}

export default App;

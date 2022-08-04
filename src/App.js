import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import './App.css';

function App() {
  const [task, setTask] = useState("");
  const [error, setError] = useState(false);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  console.log(tasks);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (task.trim() !== "") {
      const newTask = {
        id: uuidv4(),
        note: task,
        // itemList: [{}]
      };

      setTasks((tasks) => [...tasks, newTask]);
      setTask("");
    } else {
      setError(true);
      setTask("");
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <input
          name="user"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Create a note"
        />
        {error && <p>Enter something</p>}
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks.map((item, index) => {
          return (
            <>
            <li key={item.id}>{item.note}</li>
            <button type="button">
              Delete
            </button>
            </>
          )
        })}
      </ul>
    </div>
  );
}

export default App;

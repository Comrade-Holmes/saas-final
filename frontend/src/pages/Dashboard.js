
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    const res = await axios.get("${process.env.REACT_APP_API_URL}/api/tasks", {
      headers: { Authorization: token }
    });
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    await axios.post(
      "${process.env.REACT_APP_API_URL}/api/tasks",
      { title, description },
      { headers: { Authorization: token } }
    );
    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${process.env.REACT_APP_API_URL}  /api/tasks/${id}`, {
      headers: { Authorization: token }
    });
    fetchTasks();
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Productivity Dashboard</h1>

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={addTask}>Add Task</button>

        <h2>Your Tasks</h2>

        {tasks.map((task) => (
          <div key={task._id} className="task">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
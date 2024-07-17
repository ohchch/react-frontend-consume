import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskView.css';

function TaskView() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', category: '', priority: '' });
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const userId = localStorage.getItem('userId'); // 获取当前用户的 userId
    try {
      const response = await axios.get(`http://localhost:8080/api/tasks?userId=${userId}`);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (editTask) {
      setEditTask({ ...editTask, [name]: value });
    } else {
      setNewTask({ ...newTask, [name]: value });
    }
  };

  const handleCreateTask = async () => {
    const userId = localStorage.getItem('userId'); // 获取当前用户的 userId
    try {
      await axios.post('http://localhost:8080/api/tasks', newTask, { params: { userId } });
      setNewTask({ title: '', description: '', category: '', priority: '' });
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleUpdateTask = async () => {
    try {
      await axios.put(`http://localhost:8080/api/tasks/${editTask.id}`, editTask);
      setEditTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${taskId}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const startEditTask = (task) => {
    setEditTask(task);
  };

  return (
    <div className="task-view">
      <h1>Task Management</h1>
      <div className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={editTask ? editTask.title : newTask.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={editTask ? editTask.description : newTask.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={editTask ? editTask.category : newTask.category}
          onChange={handleChange}
        />
        <input
          type="text"
          name="priority"
          placeholder="Priority"
          value={editTask ? editTask.priority : newTask.priority}
          onChange={handleChange}
        />
        {editTask ? (
          <button onClick={handleUpdateTask}>Update Task</button>
        ) : (
          <button onClick={handleCreateTask}>Create Task</button>
        )}
      </div>
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task.id} className="task-item">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Category:</strong> {task.category}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <button onClick={() => startEditTask(task)}>Edit</button>
            <button onClick={() => handleDeleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskView;

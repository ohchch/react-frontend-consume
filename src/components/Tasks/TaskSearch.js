import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskView.css';

const TaskSearch = () => {
    const [userId, setUserId] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleSearch = async () => {
        try {
            const params = { userId, query: searchQuery };

            const response = await axios.get('/api/tasks', { params });
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks', error);
        }
    };

    return (
        <div className="task-search-container">
            <h1>Task Search</h1>
            <div className="form-group">
                <label>User ID:</label>
                <input 
                    type="text" 
                    value={userId} 
                    onChange={(e) => setUserId(e.target.value)} 
                    disabled
                />
            </div>
            <div className="form-group">
                <label>Search:</label>
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                />
            </div>
            <button onClick={handleSearch}>Search</button>
            <div className="task-list">
                <h2>Task Results</h2>
                {tasks.length > 0 ? (
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id}>
                                <strong>Title:</strong> {task.title}<br/>
                                <strong>Description:</strong> {task.description}<br/>
                                <strong>Category:</strong> {task.category}<br/>
                                <strong>Priority:</strong> {task.priority}<br/>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tasks found</p>
                )}
            </div>
        </div>
    );
};

export default TaskSearch;

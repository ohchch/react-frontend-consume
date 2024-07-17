import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskCreate() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('');
    const [userId, setUserId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        if (storedUserId) {
            setUserId(storedUserId);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/tasks', {
                title,
                description,
                category,
                priority
            }, {
                params: { userId }
            });
            setMessage('Task created successfully!');
            console.log(response.data);
        } catch (error) {
            setMessage('Error creating task.');
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Priority:</label>
                    <input
                        type="text"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>User ID:</label>
                    <input
                        type="text"
                        value={userId}
                        readOnly
                    />
                </div>
                <button type="submit">Create Task</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default TaskCreate;

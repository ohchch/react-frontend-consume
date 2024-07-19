import React, { useState } from 'react';
import axios from 'axios';

function Registration() {
    const [registerData, setRegisterData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const [message, setMessage] = useState('');

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/register', registerData)
            .then(response => {
                setMessage(response.data.message); // 获取后端返回的信息
            })
            .catch(error => {
                if (error.response && error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage('Registration failed.');
                }
            });
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegisterSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={registerData.username}
                        onChange={handleRegisterChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Registration;

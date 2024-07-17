import React, { useState } from 'react';
import axios from 'axios';

function UserAuth() {
    const [registerData, setRegisterData] = useState({
        username: '',
        password: '',
        email: ''
    });

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/register', registerData)
            .then(response => {
                setMessage('Registration successful!');
            })
            .catch(error => {
                setMessage('Registration failed.');
            });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/login', loginData)
            .then(response => {
                const userId = response.data.userId; // 假设后端返回的数据包含userId
                localStorage.setItem('userId', userId); // 将用户ID存储到本地存储
                setMessage('Login successful!');
            })
            .catch(error => {
                setMessage('Invalid username or password.');
            });
    };

    return (
        <div>
            <h1>User Authentication</h1>
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
            </div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLoginSubmit}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={loginData.username}
                            onChange={handleLoginChange}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={loginData.password}
                            onChange={handleLoginChange}
                        />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
            {message && <p>{message}</p>}
        </div>
    );
}

export default UserAuth;

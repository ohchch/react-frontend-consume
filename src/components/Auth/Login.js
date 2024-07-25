import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OAuthLogin from './OAuthLogin'; // 引入OAuthLogin组件
import './Login.css';

function Login() {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [message, setMessage] = useState('');

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/users/login', loginData)
            .then(response => {
                const userId = response.data.userId;
                localStorage.setItem('userId', userId);
                setMessage('Login successful!');
                window.location.href = '/';
            })
            .catch(error => {
                setMessage('Invalid username or password.');
            });
    };

    return (
        <div className="login-container">
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
            {message && <p>{message}</p>}
            <OAuthLogin /> 
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
}

export default Login;

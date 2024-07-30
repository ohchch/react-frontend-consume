import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import OAuthLogin from './OAuthLogin'; // Import OAuthLogin component
import './Login.css';

function Login() {
    // State for login form data
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    // State for displaying messages
    const [message, setMessage] = useState('');

    // Handle input changes in the login form
    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
    };

    // Handle form submission for login
    const handleLoginSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        axios.post('http://localhost:8080/api/users/login', loginData)
            .then(response => {
                const userId = response.data.userId; // Extract userId from response
                localStorage.setItem('userId', userId); // Store userId in localStorage
                setMessage('Login successful!'); // Set success message
                window.location.href = '/'; // Redirect to home page
            })
            .catch(error => {
                setMessage('Invalid username or password.'); // Set error message
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
                <button className="login-button" type="submit">Login</button>
            </form>
            {message && <p>{message}</p>}
            <OAuthLogin /> {/* Render OAuthLogin component for OAuth login */}
            <p>Don't have an account? <Link to="/register">Register here</Link></p> {/* Link to registration page */}
        </div>
    );
}

export default Login;

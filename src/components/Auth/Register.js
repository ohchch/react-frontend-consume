import React, { useState } from 'react';
import axios from 'axios';
import './Register.css'; 

function Registration() {
    // State to hold registration data
    const [registerData, setRegisterData] = useState({
        username: '',
        password: '',
        email: ''
    });

    // State to hold message for feedback
    const [message, setMessage] = useState('');

    // Handle changes to the registration form fields
    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData({ ...registerData, [name]: value });
    };

    // Handle form submission for registration
    const handleRegisterSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        axios.post('http://localhost:8080/api/users/register', registerData)
            .then(response => {
                setMessage(response.data.message); // Set success message from server response
            })
            .catch(error => {
                // Check if the error response contains a message
                if (error.response && error.response.data.message) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage('Registration failed.'); // Fallback error message
                }
            });
    };

    return (
        <div className="register-container">
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
            {message && <p>{message}</p>} {/* Display the message if it exists */}
        </div>
    );
}

export default Registration;

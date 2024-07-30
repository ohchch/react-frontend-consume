import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserInformation.css'; // 引入样式文件

function UserInformation() {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const userId = localStorage.getItem('userId');
                if (!userId) {
                    setMessage('No user ID found in local storage.');
                    return;
                }

                console.log(`Fetching user information for user ID: ${userId}`);
                const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
                console.log('User data fetched:', response.data);
                setUser(response.data.user); 
            } catch (error) {
                setMessage('Error fetching user information.');
                console.error('Error fetching user information:', error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="user-info-container">
            <h1>User Information</h1>
            {message && <p>{message}</p>}
            {user ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                !message && <p>Loading user information...</p>
            )}
        </div>
    );
}

export default UserInformation;

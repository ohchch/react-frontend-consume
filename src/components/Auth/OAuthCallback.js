import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Client, Account } from 'appwrite';

// Initialize Appwrite client with endpoint and project ID
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')  // Appwrite API endpoint
    .setProject('66a1b4d2002b1711fd39');          // Appwrite project ID

const account = new Account(client);

function OAuthCallback() {
    const navigate = useNavigate(); // Hook to programmatically navigate
    const [loadingMessage, setLoadingMessage] = useState('Loading...'); // State for loading message
    const [error, setError] = useState(''); // State for error message

    useEffect(() => {
        // Function to fetch session and handle OAuth login
        const fetchSessionAndLogin = async () => {
            try {
                // Fetch current session details
                const sessionResponse = await account.getSession('current');
                console.log('OAuth session info:', sessionResponse); // Log session info

                // Check if session response is valid and contains userId
                if (sessionResponse && sessionResponse.userId) {
                    const providerUid = sessionResponse.userId;

                    // Fetch user details from Appwrite
                    const userDetails = await account.get();
                    const email = userDetails.email;

                    // Send user details to the backend API for login
                    const apiResponse = await axios.post('http://localhost:8080/api/users/oauth/login', { 
                        userId: providerUid, 
                        email: email    
                    });

                    console.log('User info:', apiResponse.data.user); // Log user info

                    // Store user ID in local storage
                    localStorage.setItem('userId', apiResponse.data.user.id);

                    // Check if refresh has already occurred
                    if (!localStorage.getItem('hasRefreshed')) {
                        localStorage.setItem('hasRefreshed', 'true');
                        window.location.reload(); // Reload the page
                    } else {
                        localStorage.removeItem('hasRefreshed');
                        navigate('/user-info'); // Redirect to the user info page
                    }
                } else {
                    setError('Unable to get user info from OAuth provider.'); // Set error message
                }
            } catch (error) {
                console.error('Error during OAuth callback:', error); // Log error
                setError('Login failed: ' + error.message); // Set error message
            } finally {
                setLoadingMessage(''); // Clear loading message
            }
        };

        fetchSessionAndLogin();
    }, [navigate]);

    return (
        <div>
            {loadingMessage}
            {error && <div style={{ color: 'red' }}>{error}</div>}
        </div>
    );
}

export default OAuthCallback;

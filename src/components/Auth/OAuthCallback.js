import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Client, Account } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66a1b4d2002b1711fd39');

const account = new Account(client);

function OAuthCallback() {
    const navigate = useNavigate();
    const [loadingMessage, setLoadingMessage] = useState('Loading...');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSessionAndLogin = async () => {
            try {
                const sessionResponse = await account.getSession('current');
                console.log('OAuth session info:', sessionResponse);

                if (sessionResponse && sessionResponse.userId) {
                    const providerUid = sessionResponse.userId;

                    const userDetails = await account.get();
                    const email = userDetails.email;

                    const apiResponse = await axios.post('http://localhost:8080/api/users/oauth/login', { 
                        userId: providerUid, 
                        email: email    
                    });

                    console.log('User info:', apiResponse.data.user);

                    localStorage.setItem('userId', apiResponse.data.user.id);

                    // Check if refresh has already occurred
                    if (!localStorage.getItem('hasRefreshed')) {
                        localStorage.setItem('hasRefreshed', 'true');
                        window.location.reload();
                    } else {
                        localStorage.removeItem('hasRefreshed');
                        navigate('/user-info'); // Redirect to the new page
                    }
                } else {
                    setError('Unable to get user info from OAuth provider.');
                }
            } catch (error) {
                console.error('Error during OAuth callback:', error);
                setError('Login failed: ' + error.message);
            } finally {
                setLoadingMessage('');
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

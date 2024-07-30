import React, { useEffect, useState } from 'react';
import { Client, Account } from 'appwrite';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66a1b4d2002b1711fd39');

const account = new Account(client);

function UserInfoPage() {
    const [loadingMessage, setLoadingMessage] = useState('Loading...');
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState({
        providerUid: '',
        email: ''
    });
    const [sessionInfo, setSessionInfo] = useState(null);

    useEffect(() => {
        const fetchUserInfoAndSession = async () => {
            try {
                const sessionResponse = await account.getSession('current');
                console.log('Current session info:', sessionResponse);

                if (sessionResponse && sessionResponse.userId) {
                    const providerUid = sessionResponse.userId;

                    const userDetails = await account.get();
                    const email = userDetails.email;

                    setUserInfo({ providerUid, email });
                    setSessionInfo(sessionResponse);
                } else {
                    setError('Unable to get user info from OAuth provider.');
                }
            } catch (error) {
                console.error('Error fetching user info and session:', error);
                setError('Failed to fetch user info: ' + error.message);
            } finally {
                setLoadingMessage('');
            }
        };

        fetchUserInfoAndSession();
    }, []);

    return (
        <div className="user-info-container">
            {loadingMessage && <div className="loading">{loadingMessage}</div>}
            <div>
                <h2>User Info</h2>
                <p><strong>Provider UID:</strong> {userInfo.providerUid}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
            </div>
            {sessionInfo && (
                <div>
                    <h2>Session Info</h2>
                    <p><strong>Session ID:</strong> {sessionInfo.$id}</p>
                    <p><strong>Created At:</strong> {sessionInfo.$createdAt}</p>
                    <p><strong>Expires:</strong> {sessionInfo.expire}</p>
                </div>
            )}
            {error && <div className="error">{error}</div>}
        </div>
    );
}

export default UserInfoPage;

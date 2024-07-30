import { Client, Account } from "appwrite";
import React from 'react';
import './OAuthLogin.css'; 

// Initialize Appwrite client with endpoint and project ID
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')  // Appwrite API endpoint
    .setProject('66a1b4d2002b1711fd39');          // Appwrite project ID

const account = new Account(client);

// Function to handle OAuth login with a specified provider
const handleOAuthLogin = async (provider) => {
    try {
        // Initiate OAuth2 session with the specified provider
        await account.createOAuth2Session(
            provider,                           // OAuth2 provider (e.g., 'github', 'discord')
            'http://localhost:3000/oauth/callback', // URL for successful login redirect
            'http://localhost:3000/oauth/failure',  // URL for failed login redirect
            []                                 // Scopes (if any) for OAuth2 permissions
        );
        console.log(`OAuth login initiated with ${provider}`); // Log successful initiation
    } catch (error) {
        console.error(`OAuth login with ${provider} failed`, error); // Log any errors
    }
};

// OAuthLogin component renders buttons for OAuth login
const OAuthLogin = () => {
    return (
        <div>
            {/* Button for GitHub login */}
            <button className="oauth-login-button github-button" onClick={() => handleOAuthLogin('github')}>
                Login with GitHub
            </button>
            {/* Button for Discord login */}
            <button className="oauth-login-button discord-button" onClick={() => handleOAuthLogin('discord')}>
                Login with Discord
            </button>
        </div>
    );
};

export default OAuthLogin;

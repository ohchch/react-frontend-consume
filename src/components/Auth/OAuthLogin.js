import { Client, Account } from "appwrite";
import React from 'react';
import './OAuthLogin.css'; 

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') 
    .setProject('66a1b4d2002b1711fd39'); 

const account = new Account(client);

const handleOAuthLogin = async (provider) => {
    try {
        await account.createOAuth2Session(
            provider,                           
            'http://localhost:3000/oauth/callback', 
            'http://localhost:3000/oauth/failure', 
            []                                  
        );
        console.log(`OAuth login initiated with ${provider}`);
    } catch (error) {
        console.error(`OAuth login with ${provider} failed`, error);
    }
};

const OAuthLogin = () => {
    return (
        <div>
            <button className="oauth-login-button github-button" onClick={() => handleOAuthLogin('github')}>
                Login with GitHub
            </button>
            <button className="oauth-login-button discord-button" onClick={() => handleOAuthLogin('discord')}>
                Login with Discord
            </button>
        </div>
    );
};

export default OAuthLogin;

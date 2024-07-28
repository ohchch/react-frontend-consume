import { Client, Account } from "appwrite";
import React from 'react';

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
        console.log('OAuth login initiated');
    } catch (error) {
        console.error('OAuth login failed', error);
    }
};

const OAuthLogin = () => {
    return (
        <div>
            <button onClick={() => handleOAuthLogin('github')}>Login with GitHub</button>
        </div>
    );
};

export default OAuthLogin;

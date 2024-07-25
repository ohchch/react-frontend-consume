import { Client, Account } from "appwrite";
import React from 'react';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // 你的 API Endpoint
    .setProject('66a1b4d2002b1711fd39'); // 你的项目 ID

const account = new Account(client);

const handleOAuthLogin = async (provider) => {
    try {
        await account.createOAuth2Session(
            provider,                           // 提供商，如 'github'
            'http://localhost:3000/oauth/callback', // 登录成功后的重定向 URL
            'http://localhost:3000/oauth/failure', // 登录失败后的重定向 URL
            []                                  // 可选的 scopes
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

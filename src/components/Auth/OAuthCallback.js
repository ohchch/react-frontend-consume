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
    const [loadingMessage, setLoadingMessage] = useState('加载中...');
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState({
        providerUid: '',
        email: ''
    });
    const [sessionInfo, setSessionInfo] = useState(null);

    useEffect(() => {
        const fetchSessionAndLogin = async () => {
            try {
                // 获取当前会话
                const sessionResponse = await account.getSession('current');
                console.log('OAuth 会话信息:', sessionResponse);

                if (sessionResponse && sessionResponse.userId) {
                    const providerUid = sessionResponse.userId;

                    // 获取用户的详细信息
                    const userDetails = await account.get();
                    const email = userDetails.email;

                    setUserInfo({ providerUid, email });

                    // 将 userInfo 发送到后端
                    const apiResponse = await axios.post('http://localhost:8080/api/users/oauth/login', { 
                        userId: providerUid, 
                        email: email    
                    });

                    console.log('用户信息:', apiResponse.data.user);

                    // 保存 userId 到 localStorage
                    localStorage.setItem('userId', apiResponse.data.user.id);

                } else {
                    setError('无法从 OAuth 提供商处获取用户信息。');
                }
            } catch (error) {
                console.error('OAuth 回调期间的错误:', error);
                setError('登录失败: ' + error.message);
            } finally {
                setLoadingMessage('');
            }
        };

        fetchSessionAndLogin();
    }, [navigate]);

    // 检查当前会话信息的函数
    const checkCurrentSession = async () => {
        try {
            const sessionResponse = await account.getSession('current');
            console.log('当前会话信息:', sessionResponse);
            setSessionInfo(sessionResponse);
        } catch (error) {
            console.error('检查当前会话时出错:', error);
        }
    };

    return (
        <div>
            {loadingMessage}
            <div>
                <h2>用户信息</h2>
                <p><strong>Provider UID:</strong> {userInfo.providerUid}</p>
                <p><strong>Email:</strong> {userInfo.email}</p>
            </div>
            {sessionInfo && (
                <div>
                    <h2>当前会话信息</h2>
                    <p><strong>会话ID:</strong> {sessionInfo.$id}</p>
                    <p><strong>创建时间:</strong> {sessionInfo.$createdAt}</p>
                    <p><strong>过期时间:</strong> {sessionInfo.expire}</p>
                </div>
            )}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <button onClick={checkCurrentSession}>检查当前会话</button>
        </div>
    );
}

export default OAuthCallback;

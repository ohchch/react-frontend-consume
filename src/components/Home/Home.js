import React from 'react';
import './Home.css';

function Home() {
  const userId = localStorage.getItem('userId');
  const username = 'User'; // 假设从后端获取用户信息

  return (
    <div className="home-container">
      <h1>Welcome to the Task Management System</h1>
      <p>This is your go-to place for managing your tasks efficiently and effectively.</p>
      {userId ? (
        <div className="user-info">
          <h2>Hello, {username}!</h2>
          <p>You have 5 pending tasks.</p> 
        </div>
      ) : (
        <div className="guest-info">
          <p>Please <a href="/login">login</a> or <a href="/register">register</a> to get started.</p>
        </div>
      )}
      <div className="main-features">
        <h2>Main Features</h2>
        <div className="features">
          <div className="feature">
            <h3>Create Tasks</h3>
            <p>Quickly create and manage your tasks.</p>
            <a href="/tasks">Go to Tasks</a>
          </div>
          <div className="feature">
            <h3>View Profile</h3>
            <p>Manage your user profile and settings.</p>
            <a href="/profile">Go to Profile</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

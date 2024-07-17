import React from 'react';
import logo from './logo.svg';
import './Header.css';

function Header() {
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('userId');
  };

  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <nav className="nav">
        <a href="/">Home</a>
        <a href="/tasks">Tasks</a>
        <a href="/profile">Profile</a>
      </nav>
      <div className="auth">
        {userId ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </header>
  );
}

export default Header;

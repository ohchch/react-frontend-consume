import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../resources/logo.svg';
import './Header.css';

function Header() {
  const userId = localStorage.getItem('userId');

  const handleLogout = () => {
    localStorage.removeItem('userId');
    window.location.href = '/login';
  };

  return (
    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/tasksearch">Search Tasks</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <div className="auth">
        {userId ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </header>
  );
}

export default Header;

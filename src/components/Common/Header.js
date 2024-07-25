import React from 'react';
import { Link } from 'react-router-dom';
import { Client, Account } from 'appwrite';
import './Header.css';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66a1b4d2002b1711fd39');

const account = new Account(client);

function Header() {

  const handleLogout = async () => {
    try {
      await account.deleteSession('current');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/tasksearch">Search Tasks</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <div className="auth">
        <button onClick={() => window.location.href = '/login'}>Login</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;

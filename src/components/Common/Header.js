import React from 'react';
import { Link } from 'react-router-dom';
import { Client, Account } from 'appwrite';
import './Header.css';

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66a1b4d2002b1711fd39');

const account = new Account(client);

function Header() {
  const userId = localStorage.getItem('userId');

  const handleLogout = async () => {
    try {
      await deleteSession();
      removeUserId();
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  const deleteSession = async () => {
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.error('Error deleting session', error);
    }
  };

  const removeUserId = () => {
    localStorage.removeItem('userId');
  };

  const handleLogin = () => {
    window.location.reload();
    window.location.href = '/login';
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/about">About Us</Link>
        <Link to="/terms">Terms and Conditions</Link>
      </nav>
      <div className="auth">
        {!userId && <button onClick={handleLogin}>Login</button>}
        {userId && <button onClick={handleLogout}>Logout</button>}
      </div>
    </header>
  );
}

export default Header;

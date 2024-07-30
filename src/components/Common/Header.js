import React from 'react';
import { Link } from 'react-router-dom';
import { Client, Account } from 'appwrite';
import './Header.css';

// Initialize Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite API endpoint
    .setProject('66a1b4d2002b1711fd39'); // Your Appwrite project ID

// Initialize Appwrite account object
const account = new Account(client);

function Header() {
  // Retrieve user ID from local storage
  const userId = localStorage.getItem('userId');

  // Handle user logout
  const handleLogout = async () => {
    try {
      // Delete the current session
      await deleteSession();
      // Remove user ID from local storage
      removeUserId();
      // Redirect to login page
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed', error); // Log any error that occurs during logout
    }
  };

  // Function to delete the current user session
  const deleteSession = async () => {
    try {
      await account.deleteSession('current'); // Call Appwrite API to delete session
    } catch (error) {
      console.error('Error deleting session', error); // Log any error that occurs during session deletion
    }
  };

  // Function to remove user ID from local storage
  const removeUserId = () => {
    localStorage.removeItem('userId');
  };

  // Function to handle login button click
  const handleLogin = () => {
    window.location.reload(); // Reload the page
    window.location.href = '/login'; // Redirect to login page
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
        {/* Show login button if user is not logged in */}
        {!userId && <button onClick={handleLogin}>Login</button>}
        {/* Show logout button if user is logged in */}
        {userId && <button onClick={handleLogout}>Logout</button>}
      </div>
    </header>
  );
}

export default Header;

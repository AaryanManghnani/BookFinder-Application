import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BookReaderNavbar.css';

export default function BookReaderNavbar() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');
    const role = localStorage.getItem('userRole');

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to logout?");
        if (confirmLogout) {
            localStorage.clear();
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                BookFinder
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-item">Home</Link>
                <Link to="/reader-books" className="nav-item">Books</Link>
            </div>
            
            <div className="navbar-user">
                 <div className="user-info">
                    <span className="user-name">Hello, {username}</span>
                    <span className="user-role">({role})</span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
}
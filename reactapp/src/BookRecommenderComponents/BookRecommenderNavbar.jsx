import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './BookRecommenderNavbar.css';

export default function BookRecommenderNavbar() {
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
                
                <div className="nav-item dropdown">
                    <span>Books ▾</span>
                    <div className="dropdown-content">
                        <Link to="/add-book">Add Book</Link>
                        <Link to="/books">View Book</Link>
                    </div>
                </div>
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
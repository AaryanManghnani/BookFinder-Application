import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ErrorPage.css';

export default function ErrorPage() {
    const navigate = useNavigate();

    return (
        <div className="error-container">
            <div className="error-card">
                <h1 className="error-code">404</h1>
                <h2 className="error-title">Page Not Found</h2>
                <p className="error-message">
                    Oops! The page you are looking for does not exist. 
                    It might have been moved or deleted.
                </p>
                <button className="home-btn" onClick={() => navigate('/')}>
                    Go Back Home
                </button>
            </div>
        </div>
    );
}
import React from 'react';
import BookRecommenderNavbar from '../BookRecommenderComponents/BookRecommenderNavbar';
import BookReaderNavbar from '../BookReaderComponents/BookReaderNavbar';
import './HomePage.css';

export default function HomePage() {
    const role = localStorage.getItem('userRole');

    return (
        <div className="home-wrapper">
            {role === 'BookRecommender' ? (
                <BookRecommenderNavbar />
            ) : (
                <BookReaderNavbar />
            )}

            <div className="home-content">
                <div className="hero-text">
                    <h1>Welcome to BookFinder Application</h1>
                    <p>
                        Your one-stop destination to discover, read, and recommend books. 
                        Explore our collection or manage the library catalog.
                    </p>
                </div>
            </div>

            <footer className="contact-section">
                <h3>Contact Us</h3>
                <div className="contact-grid">
                    <div className="contact-item">
                        <strong>Email</strong>
                        <p>support@bookfinder.com</p>
                    </div>
                    <div className="contact-item">
                        <strong>Phone</strong>
                        <p>+91 98765 43210</p>
                    </div>
                    <div className="contact-item">
                        <strong>Address</strong>
                        <p>123 Knowledge Park, Book City, India</p>
                    </div>
                </div>
                <div className="copyright">
                    &copy; {new Date().getFullYear()} BookFinder. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
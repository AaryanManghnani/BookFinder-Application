import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import BookReaderNavbar from './BookReaderNavbar';
import './BookReaderViewBook.css';

export default function BookReaderViewBook() {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchBooks = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await axios.get(`${API_BASE_URL}/book`, {
                headers: {
                    'Authorization': `Bearer ${token}` 
                }
            });
            setBooks(response.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching books:", err);
            setError("Failed to load books. Please login again.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="view-book-page">
            <BookReaderNavbar />
            
            <div className="list-container">
                <h2>Available Books</h2>
                
                {loading ? (
                    <p>Loading books...</p>
                ) : error ? (
                    <p className="error-text">{error}</p>
                ) : books.length === 0 ? (
                    <p>No books available in the library.</p>
                ) : (
                    <table className="book-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                                <th>Published Date</th>
                                <th>Cover Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.bookId}>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.genre}</td>
                                    <td>{formatDate(book.publishedDate)}</td>
                                    <td>
                                        <img 
                                            src={book.coverImage} 
                                            alt={book.title} 
                                            className="book-cover-thumb"
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
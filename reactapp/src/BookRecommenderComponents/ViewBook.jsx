import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import API_BASE_URL from '../apiConfig';
import BookRecommenderNavbar from './BookRecommenderNavbar';
import './ViewBook.css';

export default function ViewBook() {
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
        } catch (error) {
            console.error("Fetch error:", error);
            setError("Failed to fetch books.");
            setLoading(false);
        }
    };

    const deleteHandler = async (bookId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;

        try {
            const token = localStorage.getItem('token');
            await axios.delete(`${API_BASE_URL}/book/${bookId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchBooks(); 
        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete book. It might not exist.");
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString();
    };

    return (
        <div className="view-book-page">
            <BookRecommenderNavbar />
            
            <div className="list-container">
                <div className="header-row">
                    <h2>Manage Books</h2>
                    <Link to="/add-book" className="add-btn"> + Add New Book</Link>
                </div>

                {loading ? (
                    <p>Loading...</p>
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
                                <th>Cover</th>
                                <th>Actions</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {books.map(book => (
                                <tr key={book.bookId || book.BookId}>
                                    <td>{book.title || book.Title}</td>
                                    <td>{book.author || book.Author}</td>
                                    <td>{book.genre || book.Genre}</td>
                                    <td>{formatDate(book.publishedDate || book.PublishedDate)}</td>
                                    <td>
                                        <img 
                                            src={book.coverImage || book.CoverImage} 
                                            alt="cover" 
                                            className="table-cover-img" 
                                        />
                                    </td>
                                    <td className="action-cell">
                                        <Link to={`/edit-book/${book.bookId || book.BookId}`}>
                                            <button type="button" className="edit-button">Edit</button>
                                        </Link>
                                        <button 
                                            type="button" 
                                            className="delete-button" 
                                            onClick={() => deleteHandler(book.bookId || book.BookId)}
                                        >
                                            Delete
                                        </button>
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
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import API_BASE_URL from '../apiConfig';
import BookRecommenderNavbar from './BookRecommenderNavbar';
import './BookForm.css';

export default function BookForm({ mode = "add" }) {
    const navigate = useNavigate();
    const { id } = useParams();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        genre: "",
        publishedDate: "",
        coverImage: "",
    });

    const [errors, setErrors] = useState({});
    const [serverError, setServerError] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            if (mode === "edit" && id) {
                try {
                    const token = localStorage.getItem('token');
                    const response = await axios.get(`${API_BASE_URL}/book/${id}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    
                    const data = response.data;
                    if(data.publishedDate) {
                        data.publishedDate = data.publishedDate.split('T')[0];
                    }

                    setFormData({
                        title: data.title,
                        author: data.author,
                        genre: data.genre,
                        publishedDate: data.publishedDate,
                        coverImage: data.coverImage
                    });
                } catch (error) {
                    console.error("Error fetching book details:", error);
                    if (error.response && error.response.status === 404) {
                        navigate('/404'); // Redirects to catch-all route
                    } else {
                        setServerError("Failed to load book details.");
                    }
                }
            }
        };
        fetchBooks();
    }, [mode, id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;
        if (!formData.title?.trim()) {
            tempErrors.title = "Title is required";
            isValid = false;
        }
        if (!formData.author?.trim()) {
            tempErrors.author = "Author is required";
            isValid = false;
        }
        if (!formData.genre?.trim()) {
            tempErrors.genre = "Genre is required";
            isValid = false;
        }
        if (!formData.publishedDate) {
            tempErrors.publishedDate = "Published Date is required";
            isValid = false;
        }
        if (!formData.coverImage?.trim()) {
            tempErrors.coverImage = "Cover Image URL is required";
            isValid = false;
        }
        setErrors(tempErrors);
        return isValid;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setServerError("");
        if (!validateForm()) return;

        try {
            const token = localStorage.getItem('token');
            const url = mode === "edit" ? `${API_BASE_URL}/book/${id}` : `${API_BASE_URL}/book`;
            const method = mode === "edit" ? "put" : "post";
            
            const payload = {
                Title: formData.title,
                Author: formData.author,
                Genre: formData.genre,
                PublishedDate: formData.publishedDate,
                CoverImage: formData.coverImage,
            };

            const response = await axios[method](url, payload, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const msg = mode === "edit" ? "Book updated successfully!" : "Book added successfully!";
            if (response.status === 200 || response.status === 201) {
                alert(msg);
                navigate('/books');
            }
        } catch (error) {
            console.error("Error saving book:", error);
            if(error.response && error.response.data) {
                 const errorMsg = typeof error.response.data === 'string' 
                    ? error.response.data 
                    : error.response.data.message || error.response.data.Message;
                setServerError(errorMsg || "Operation failed.");
            } else {
                setServerError("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="book-form-page">
            <BookRecommenderNavbar />
            
            <div className="form-container-card">
                <h1 className="form-title">{mode === "edit" ? "Edit Book" : "Add New Book"}</h1>
                
                <form className="book-form" onSubmit={submitHandler} noValidate>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            name="title" 
                            placeholder='Book Title'
                            value={formData.title}
                            onChange={handleChange}
                        />
                        {errors.title && <span className="error-text">{errors.title}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="author">Author:</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            placeholder='Author Name'
                            value={formData.author}
                            onChange={handleChange}
                        />
                        {errors.author && <span className="error-text">{errors.author}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="genre">Genre:</label>
                        <input
                            type="text"
                            id="genre"
                            name="genre"
                            placeholder='Genre'
                            value={formData.genre}
                            onChange={handleChange}
                        />
                        {errors.genre && <span className="error-text">{errors.genre}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="publishedDate">Published Date:</label>
                        <input
                            type="date"
                            id="publishedDate"
                            name="publishedDate"
                            value={formData.publishedDate}
                            onChange={handleChange}
                        />
                        {errors.publishedDate && <span className="error-text">{errors.publishedDate}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="coverImage">Cover Image URL:</label>
                        <input
                            type="text"
                            id="coverImage"
                            name="coverImage"
                            placeholder='https://example.com/image.jpg'
                            value={formData.coverImage}
                            onChange={handleChange}
                        />
                        {errors.coverImage && <span className="error-text">{errors.coverImage}</span>}
                    </div>

                    {serverError && <div className="server-error">{serverError}</div>}

                    <button type="submit" className="submit-btn">
                        {mode === "edit" ? "Update Book" : "Add Book"}
                    </button>
                </form>
            </div>
        </div>
    );
}
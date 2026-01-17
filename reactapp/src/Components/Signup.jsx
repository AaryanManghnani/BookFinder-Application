import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import './Signup.css';

export default function Signup() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
        role: ""
    });

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [serverError, setServerError] = useState("");

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

        let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let mobileRegex = /^[0-9]{10}$/;

        if (!formData.username.trim()) {
            tempErrors.username = "User Name is required";
            isValid = false;
        }

        if (!formData.email.trim()) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Invalid email format";
            isValid = false;
        }

        if (!formData.mobileNumber.trim()) {
            tempErrors.mobileNumber = "Mobile Number is required";
            isValid = false;
        } else if (!mobileRegex.test(formData.mobileNumber)) {
            tempErrors.mobileNumber = "Mobile number must be 10 digits";
            isValid = false;
        }

        if (!formData.password) {
            tempErrors.password = "Password is required";
            isValid = false;
        } else if (formData.password.length < 6) {
            tempErrors.password = "Password must be at least 6 characters";
            isValid = false;
        }

        if (!formData.confirmPassword) {
            tempErrors.confirmPassword = "Confirm Password is required";
            isValid = false;
        } else if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "Passwords do not match";
            isValid = false;
        }

        if (!formData.role) {
            tempErrors.role = "Role is required";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setServerError("");

        if (validateForm()) {
            try {
                const payload = {
                    Username: formData.username,
                    Email: formData.email,
                    MobileNumber: formData.mobileNumber,
                    Password: formData.password,
                    UserRole: formData.role
                };

                const response = await axios.post(`${API_BASE_URL}/register`, payload);

                if (response.status === 201) {
                    setShowModal(true);
                }
            } catch (error) {
                console.error("Signup Error:", error);
                if (error.response && error.response.data) {
                    setServerError(error.response.data.Message || "Registration failed. Please try again.");
                } else {
                    setServerError("Server is not responding. Please try again later.");
                }
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        navigate('/login');
    };

    return (
        <div className="signup-container">
            <div className="signup-wrapper">
                {/* Left side - Visual Banner */}
                <div className="signup-visual">
                    <div className="book-icon">📚</div>
                    <h1 className="visual-title">Join BookFinder</h1>
                    <p className="visual-subtitle">
                        Discover your next favorite read. Connect with fellow book lovers and explore personalized recommendations.
                    </p>
                    
                    <div className="feature-list">
                        <div className="feature-item">
                            <span className="feature-icon">📖</span>
                            <span>Personalized book recommendations</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">✨</span>
                            <span>Curated reading lists</span>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🎯</span>
                            <span>Genre-based discovery</span>
                        </div>
                    </div>
                </div>

                {/* Right side - Form */}
                <div className="signup-card">
                    <h2 className="signup-title">Create Account</h2>
                    <p className="signup-subtitle">Fill in your details to get started</p>
                    
                    <form onSubmit={submitHandler} noValidate>
                        <div className="form-group">
                            <label>User Name *</label>
                            <input 
                                type="text" 
                                name="username" 
                                placeholder="Enter Username"
                                value={formData.username} 
                                onChange={handleChange} 
                            />
                            {errors.username && <span className="error-msg">{errors.username}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email *</label>
                            <input 
                                type="email" 
                                name="email" 
                                placeholder="Enter Email"
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                            {errors.email && <span className="error-msg">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>Mobile Number *</label>
                            <input 
                                type="text" 
                                name="mobileNumber" 
                                placeholder="Enter Mobile Number"
                                value={formData.mobileNumber} 
                                onChange={handleChange} 
                            />
                            {errors.mobileNumber && <span className="error-msg">{errors.mobileNumber}</span>}
                        </div>

                        <div className="form-group">
                            <label>Password *</label>
                            <input 
                                type="password" 
                                name="password" 
                                placeholder="Enter Password"
                                value={formData.password} 
                                onChange={handleChange} 
                            />
                            {errors.password && <span className="error-msg">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label>Confirm Password *</label>
                            <input 
                                type="password" 
                                name="confirmPassword" 
                                placeholder="Confirm Password"
                                value={formData.confirmPassword} 
                                onChange={handleChange} 
                            />
                            {errors.confirmPassword && <span className="error-msg">{errors.confirmPassword}</span>}
                        </div>

                        <div className="form-group">
                            <label>Role *</label>
                            <select name="role" value={formData.role} onChange={handleChange}>
                                <option value="">Select Role</option>
                                <option value="BookRecommender">Book Recommender</option>
                                <option value="BookReader">Book Reader</option>
                            </select>
                            {errors.role && <span className="error-msg">{errors.role}</span>}
                        </div>

                        {serverError && <div className="server-error">{serverError}</div>}

                        <button type="submit" className="signup-btn">Create Account</button>
                        
                        <div className="login-redirect">
                            Already have an Account? <Link to="/login">Login</Link>
                        </div>
                    </form>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Registration Successful!</h3>
                        <button className="modal-ok-btn" onClick={handleCloseModal}>Continue to Login</button>
                    </div>
                </div>
            )}
        </div>
    );
}
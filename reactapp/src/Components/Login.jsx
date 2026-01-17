import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../apiConfig';
import './Login.css';

export default function Login() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});
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

        if (!formData.email.trim()) {
            tempErrors.email = "Email is required"; // 
            isValid = false;
        }

        if (!formData.password.trim()) {
            tempErrors.password = "Password is required";
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
                const response = await axios.post(`${API_BASE_URL}/login`, {
                    Email: formData.email,     
                    Password: formData.password
                });

                if (response.status === 200) {
                    // The backend returns: { Status: "Success", token: "...", Role: "...", Email: "..." }
                    const token = response.data.token;
                    const role = response.data.role;
                    const email = response.data.email;
                    const username = response.data.username;

                    localStorage.setItem('token', token);
                    localStorage.setItem('userRole', role);
                    localStorage.setItem('email', email);
                    localStorage.setItem('username', username);

                    navigate('/');
                }
            } catch (error) {
                console.error("Login Error:", error);
                if (error.response && error.response.data) {
                    const msg = typeof error.response.data === 'string' 
                        ? error.response.data 
                        : error.response.data.Message;
                    setServerError(msg || "Login failed");
                } else {
                    setServerError("Server not responding");
                }
            }
        }
    };

    return (
        <div className="login-container">
            <div className="login-split">
                <div className="login-info">
                    <h1>BookFinder</h1>
                    <p>
                        An app to discover, explore, and recommend books tailored to your reading preferences.
                    </p>
                </div>

                <div className="login-form-card">
                    <h2>Login</h2>
                    <form onSubmit={submitHandler} noValidate>
                        
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                id="email" 
                                name="email" 
                                placeholder="Enter your email"
                                value={formData.email} 
                                onChange={handleChange} 
                            />
                            {errors.email && <span className="error-msg">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                name="password" 
                                placeholder="Enter your password"
                                value={formData.password} 
                                onChange={handleChange} 
                            />
                            {errors.password && <span className="error-msg">{errors.password}</span>}
                        </div>

                        {serverError && <div className="server-error">{serverError}</div>}

                        <button type="submit" className="login-btn">Login</button>

                        <div className="signup-redirect">
                            Don't have an account? <Link to="/register">Signup</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
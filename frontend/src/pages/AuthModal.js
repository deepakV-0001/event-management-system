import React, { useState, useEffect } from 'react';
import { User, Lock, Mail, X } from 'lucide-react';
import axios from 'axios';

const AuthModal = ({ isOpen, setIsOpen, onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // API URL (Make sure your backend is running)
    const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); // Clear error on typing
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const endpoint = isLogin ? '/auth/login' : '/auth/register';
            const response = await axios.post(`${API_URL}${endpoint}`, {
                ...(isLogin ? {} : { name: formData.name }),
                email: formData.email,
                password: formData.password
            }, { withCredentials: true });

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                
                if (onAuthSuccess) onAuthSuccess(response.data.user);
                
                setIsOpen(false);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    
    useEffect(() => {
        document.body.classList.toggle("overflow-hidden", isOpen);
        return () => document.body.classList.remove("overflow-hidden");
    }, [isOpen]);

    return (
        <div className="flex items-center justify-center">
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        {/* Modal Title */}
                        <div className="mb-6 text-center">
                            <h2 className="text-2xl font-bold text-gray-900">
                                {isLogin ? 'Welcome Back!' : 'Create Account'}
                            </h2>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name Field (Only for Sign Up) */}
                            {!isLogin && (
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-gray-700">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 pl-10 text-gray-900 placeholder-gray-400"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 pl-10 text-gray-900 placeholder-gray-400"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="block w-full rounded-lg border border-gray-300 px-4 py-2.5 pl-10 text-gray-900 placeholder-gray-400"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg bg-black px-4 py-2.5 text-center text-white transition-colors hover:bg-gray-800 focus:ring-4 focus:ring-gray-500 disabled:bg-gray-400"
                            >
                                {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
                            </button>

                            {/* Toggle Login/Register */}
                            <div className="text-center text-sm">
                                <span className="text-gray-500">
                                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError('');
                                        setFormData({ name: '', email: '', password: '' });
                                    }}
                                    className="text-blue-600 hover:underline"
                                >
                                    {isLogin ? 'Sign Up' : 'Login'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthModal;

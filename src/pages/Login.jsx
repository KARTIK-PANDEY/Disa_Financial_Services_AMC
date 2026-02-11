import React, { useState } from 'react';
import { authService } from '../services/api';
import { Mail, Lock, User, TrendingUp, ArrowRight, Eye, EyeOff, X, Smartphone, CreditCard } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import DisaLogo from '../assets/Disa_Financial.jpeg';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Social Login State
    const [showSocialModal, setShowSocialModal] = useState(false);
    const [socialProvider, setSocialProvider] = useState('');
    const [socialData, setSocialData] = useState({
        mobile: '',
        pan: ''
    });
    const [socialErrors, setSocialErrors] = useState({});

    // Forgot Password State
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
    const [forgotPasswordStatus, setForgotPasswordStatus] = useState('idle'); // idle, loading, success, error
    const [forgotPasswordError, setForgotPasswordError] = useState('');

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await authService.login({
                email: formData.email,
                password: formData.password
            });

            if (response.data.user) {
                // If token is returned, save it (backend currently doesn't return token, but good practice)
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }

                login(response.data.user);
                // Navigate handled by login function or Redirect in AuthContext usually, 
                // but if login just updates state, we might need to navigate.
                // Assuming login updates context which triggers re-render or navigation. 
                // If not, we can navigate here:
                if (response.data.user.role === 'admin') {
                    navigate('/admin');
                } else {
                    navigate('/dashboard');
                }
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSocialLogin = (provider) => {
        setSocialProvider(provider);
        setShowSocialModal(true);
        setSocialErrors({});
        setSocialData({ mobile: '', pan: '' });
    };

    const handleSocialInputChange = (e) => {
        setSocialData({
            ...socialData,
            [e.target.name]: e.target.value
        });
        // Clear error when user types
        if (socialErrors[e.target.name]) {
            setSocialErrors({
                ...socialErrors,
                [e.target.name]: ''
            });
        }
    };

    const validateSocialForm = () => {
        const errors = {};
        const mobileRegex = /^[6-9]\d{9}$/;
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

        if (!socialData.mobile) {
            errors.mobile = 'Mobile number is required';
        } else if (!mobileRegex.test(socialData.mobile)) {
            errors.mobile = 'Please enter a valid 10-digit mobile number';
        }

        if (!socialData.pan) {
            errors.pan = 'PAN number is required';
        } else if (!panRegex.test(socialData.pan.toUpperCase())) {
            errors.pan = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
        }

        setSocialErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSocialSubmit = async (e) => {
        e.preventDefault();

        if (!validateSocialForm()) return;

        setIsLoading(true);
        // Simulate API call for verification
        setTimeout(() => {
            setIsLoading(false);
            setShowSocialModal(false);
            login({
                id: `${socialProvider}-user-` + Date.now(),
                name: `Valued Client (via ${socialProvider})`,
                email: `user@${socialProvider.toLowerCase()}.com`,
                role: 'user',
                mobile: socialData.mobile,
                pan: socialData.pan.toUpperCase()
            });
        }, 1500);
    };

    const handleForgotPasswordSubmit = (e) => {
        e.preventDefault();
        setForgotPasswordStatus('loading');
        setForgotPasswordError('');

        // Basic email validation
        if (!forgotPasswordEmail || !/\S+@\S+\.\S+/.test(forgotPasswordEmail)) {
            setForgotPasswordStatus('error');
            setForgotPasswordError('Please enter a valid email address.');
            return;
        }

        // Simulate API call for password reset
        setTimeout(() => {
            // Check if user exists (mock check using local storage if available, or just success for demo)
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
            const userExists = registeredUsers.some(u => u.email === forgotPasswordEmail) ||
                forgotPasswordEmail === 'admin@disa.com'; // Allow admin for demo

            if (userExists) {
                setForgotPasswordStatus('success');
            } else {
                // For security reasons, usually you don't say "user not found", but for this demo:
                setForgotPasswordStatus('error');
                setForgotPasswordError('No account found with this email address.');
            }
        }, 1500);
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-logo">
                        <img src={DisaLogo} alt="Disa Financial Services" style={{ height: '50px', width: 'auto', borderRadius: '4px' }} />
                        <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Disa Financial Services Pvt. Ltd.</span>
                    </div>
                    <h2 className="login-title">Welcome Back</h2>
                    <p className="login-subtitle">Secure access to your portfolio</p>
                </div>

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label" htmlFor="email">Email Address</label>
                        <div className="form-input-wrapper">
                            <Mail className="form-input-icon" size={20} />
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-input"
                                placeholder="name@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label" htmlFor="password">Password</label>
                        <div className="form-input-wrapper">
                            <Lock className="form-input-icon" size={20} />
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                className="form-input"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <button
                                type="button"
                                className="form-input-icon"
                                style={{ left: 'auto', right: '1rem', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleChange}
                            />
                            <span>Remember me</span>
                        </label>
                        <button
                            type="button"
                            className="forgot-password"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                            onClick={() => {
                                setShowForgotPasswordModal(true);
                                setForgotPasswordStatus('idle');
                                setForgotPasswordEmail('');
                                setForgotPasswordError('');
                            }}
                        >
                            Forgot Password?
                        </button>
                    </div>

                    <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
                        {isLoading ? 'Authenticating...' : (
                            <>
                                Sign In <ArrowRight size={20} />
                            </>
                        )}
                    </button>
                </form>

                <div className="login-divider">
                    <span>or continue with</span>
                </div>

                <div className="social-login">
                    <button type="button" className="social-btn" onClick={() => handleSocialLogin('Google')}>
                        <svg className="social-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                        </svg>
                        <span>Google</span>
                    </button>
                    <button type="button" className="social-btn" onClick={() => handleSocialLogin('Apple')}>
                        <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.37-1.32.72.03 2.51.27 3.53 1.69-3.08 1.54-2.52 5.64.44 6.84-.71 1.73-1.6 3.46-3.42 5.02zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.54 4.33-3.74 4.25z" />
                        </svg>
                        <span>Apple</span>
                    </button>
                    <button type="button" className="social-btn" onClick={() => handleSocialLogin('Email')}>
                        <Mail size={20} />
                        <span>Email</span>
                    </button>
                </div>

                <p className="signup-link">
                    Don't have an account?
                    <Link to="/signup">Apply for Account</Link>
                </p>
            </div>
            {/* Social Login Validation Modal */}
            {showSocialModal && (
                <div className="modal-overlay" onClick={() => setShowSocialModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowSocialModal(false)}>
                            <X size={24} />
                        </button>

                        <div className="modal-header">
                            <h3 className="modal-title">Complete Your Profile</h3>
                            <p className="login-subtitle">Verifying details for {socialProvider} Login</p>
                        </div>

                        <form onSubmit={handleSocialSubmit} className="login-form">
                            <div className="form-group">
                                <label className="form-label" htmlFor="social-mobile">Mobile Number</label>
                                <div className="form-input-wrapper">
                                    <Smartphone className="form-input-icon" size={20} />
                                    <input
                                        type="tel"
                                        id="social-mobile"
                                        name="mobile"
                                        className="form-input"
                                        placeholder="Enter 10-digit mobile number"
                                        value={socialData.mobile}
                                        onChange={handleSocialInputChange}
                                        maxLength="10"
                                    />
                                </div>
                                {socialErrors.mobile && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.2rem' }}>{socialErrors.mobile}</span>}
                            </div>

                            <div className="form-group">
                                <label className="form-label" htmlFor="social-pan">PAN Number</label>
                                <div className="form-input-wrapper">
                                    <CreditCard className="form-input-icon" size={20} />
                                    <input
                                        type="text"
                                        id="social-pan"
                                        name="pan"
                                        className="form-input"
                                        placeholder="ABCDE1234F"
                                        value={socialData.pan}
                                        onChange={handleSocialInputChange}
                                        style={{ textTransform: 'uppercase' }}
                                        maxLength="10"
                                    />
                                </div>
                                {socialErrors.pan && <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.2rem' }}>{socialErrors.pan}</span>}
                            </div>

                            <button type="submit" className="btn btn-primary login-btn" disabled={isLoading}>
                                {isLoading ? 'Verifying...' : 'Complete Login'}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* Forgot Password Modal */}
            {showForgotPasswordModal && (
                <div className="modal-overlay" onClick={() => setShowForgotPasswordModal(false)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowForgotPasswordModal(false)}>
                            <X size={24} />
                        </button>

                        <div className="modal-header">
                            <h3 className="modal-title">Reset Password</h3>
                            <p className="login-subtitle">Enter your email to receive reset instructions</p>
                        </div>

                        {forgotPasswordStatus === 'success' ? (
                            <div style={{ textAlign: 'center', padding: '1rem' }}>
                                <div style={{
                                    width: '60px',
                                    height: '60px',
                                    borderRadius: '50%',
                                    background: 'rgba(16, 185, 129, 0.1)',
                                    color: '#10b981',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 1rem'
                                }}>
                                    <Mail size={32} />
                                </div>
                                <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Check your email</h4>
                                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                                    We have sent password reset instructions to <strong>{forgotPasswordEmail}</strong>
                                </p>
                                <button
                                    className="btn btn-primary login-btn"
                                    onClick={() => setShowForgotPasswordModal(false)}
                                >
                                    Back to Login
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleForgotPasswordSubmit} className="login-form">
                                <div className="form-group">
                                    <label className="form-label" htmlFor="reset-email">Email Address</label>
                                    <div className="form-input-wrapper">
                                        <Mail className="form-input-icon" size={20} />
                                        <input
                                            type="email"
                                            id="reset-email"
                                            className="form-input"
                                            placeholder="name@company.com"
                                            value={forgotPasswordEmail}
                                            onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    {forgotPasswordError && (
                                        <span style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.2rem' }}>
                                            {forgotPasswordError}
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-primary login-btn"
                                    disabled={forgotPasswordStatus === 'loading'}
                                >
                                    {forgotPasswordStatus === 'loading' ? 'Sending Link...' : 'Send Reset Link'}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;

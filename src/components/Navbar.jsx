import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Briefcase, Calculator, Mail, LogIn, Sun, Moon, TrendingUp, User, Users } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user, isAdmin, logout } = useAuth();

    const toggleMenu = () => setIsOpen(!isOpen);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
            setIsOpen(false);
        }
    };
    // ... [rest of handlers same as before] ...

    // Close menu when clicking on a link
    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const handleNavigation = (e, href) => {
        // ... [keep existing logic] ...
        e.preventDefault();
        const targetId = href.replace('#', '');

        if (location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(targetId);
                if (element) element.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            } else if (href === '#home') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
        setIsOpen(false);
    };

    // ... [effects same as before] ...
    // Theme effect
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Navigation items with icons
    const navItems = [
        { name: 'Home', href: '#home', icon: Home },
        { name: 'Services', href: '#services', icon: Briefcase },
        { name: 'Team', href: '#team', icon: Users },
        { name: 'Calculator', href: '#calculators', icon: Calculator },
        { name: 'Contact', href: '#contact', icon: Mail },
    ];

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-container">
                {/* Premium Logo */}
                <a href="#home" className="logo" onClick={(e) => handleNavigation(e, '#home')}>
                    <TrendingUp size={28} className="logo-icon-svg" />
                    <span className="logo-text">
                        Disa Financial Services Pvt. Ltd.
                    </span>
                </a>

                <div className="menu-icon" onClick={toggleMenu}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </div>

                {/* Navigation Menu */}
                <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
                    {navItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <li key={index} className="nav-item">
                                <a
                                    href={item.href}
                                    className="nav-link"
                                    onClick={(e) => handleNavigation(e, item.href)}>
                                    <Icon size={18} />
                                    <span>{item.name}</span>
                                </a>
                            </li>
                        );
                    })}

                    {/* Dynamic Auth Button */}
                    <li className="nav-item">
                        {user ? (
                            <div className="nav-user-controls" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                {isAdmin ? (
                                    <Link
                                        to="/admin"
                                        className="btn-primary"
                                        style={{ textDecoration: 'none', fontSize: '0.9rem', padding: '0.5rem 1rem' }}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <span style={{ fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <User size={18} /> {user.name}
                                    </span>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className="btn-outline"
                                    style={{ padding: '0.4rem 1rem', fontSize: '0.9rem', borderRadius: '4px' }}
                                    title="Logout"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="btn-primary login-button"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}
                                onClick={() => setIsOpen(false)}
                            >
                                <LogIn size={18} />
                                <span>Client Login</span>
                            </Link>
                        )}
                    </li>

                    {/* Premium Theme Toggle */}
                    <li className="nav-item">
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle"
                            aria-label="Toggle Dark Mode"
                        >
                            <div className="theme-toggle-inner">
                                {theme === 'light' ? (
                                    <Moon size={20} className="theme-icon" />
                                ) : (
                                    <Sun size={20} className="theme-icon" />
                                )}
                            </div>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
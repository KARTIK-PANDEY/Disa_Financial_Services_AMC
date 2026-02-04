import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Trash2, Search, Download, User, TrendingUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import context
import { adminService } from '../services/api';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [requests, setRequests] = useState([]); // Kept for contact requests if we want to add later
    const [investmentRequests, setInvestmentRequests] = useState([]);
    const [registeredUsers, setRegisteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Simple client-side protection (API also protected but this is for UX)
        // Note: user might be null initially if loading, but assuming AuthContext handles initial load.
        // We will fetch data anyway, if API returns 401/403 we can handle it.
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersRes, investmentsRes, contactsRes] = await Promise.all([
                adminService.getAllUsers(),
                adminService.getAllInvestments(),
                adminService.getAllContacts()
            ]);
            setRegisteredUsers(usersRes.data);
            setInvestmentRequests(investmentsRes.data);
            setRequests(contactsRes.data);
        } catch (error) {
            console.error("Error fetching admin data", error);
            // If unauthorized, redirect to login
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            logout();
            navigate('/login');
        }
    };

    if (loading) {
        return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading Dashboard...</div>;
    }

    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <div className="container header-content">
                    <h1>Admin Dashboard</h1>
                    <div className="header-actions">
                        <span style={{ marginRight: '1rem', fontWeight: 500 }}>
                            {user?.name || 'Admin'}
                        </span>
                        <button className="btn btn-outline" onClick={handleLogout}>
                            <LogOut size={18} /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="container admin-content">
                <div className="dashboard-stats">
                    <div className="stat-card">
                        <h3>Total Users</h3>
                        <p className="stat-number" style={{ color: '#3b82f6' }}>{registeredUsers.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Investment Requests</h3>
                        <p className="stat-number" style={{ color: '#10b981' }}>{investmentRequests.length}</p>
                    </div>
                    <div className="stat-card">
                        <h3>Contact Inquiries</h3>
                        <p className="stat-number">{requests.length}</p>
                    </div>
                </div>

                {/* Registered Users Section */}
                <div className="records-section" style={{ marginBottom: '2rem' }}>
                    <div className="section-header">
                        <h2>Registered Users</h2>
                        <button className="btn-text" onClick={() => fetchData()}>
                            Refresh
                        </button>
                    </div>

                    {registeredUsers.length === 0 ? (
                        <div className="empty-state">
                            <p>No registered users found.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Date Joined</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Role</th>
                                        <th>ID</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {registeredUsers.map((user) => (
                                        <tr key={user.id}>
                                            <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                    <User size={16} />
                                                    <strong>{user.fullName}</strong>
                                                </div>
                                            </td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>
                                                <span className={`badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}`}
                                                    style={{
                                                        backgroundColor: user.role === 'admin' ? '#e0f2fe' : '#f3f4f6',
                                                        color: user.role === 'admin' ? '#0369a1' : '#374151',
                                                        padding: '0.2rem 0.5rem',
                                                        borderRadius: '4px',
                                                        fontSize: '0.8rem',
                                                        textTransform: 'capitalize'
                                                    }}>
                                                    {user.role}
                                                </span>
                                            </td>
                                            <td><small className="text-muted">{user.id}</small></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Investment Requests Section */}
                <div className="records-section">
                    <div className="section-header">
                        <h2>Investment Requests</h2>
                    </div>

                    {investmentRequests.length === 0 ? (
                        <div className="empty-state">
                            <p>No investment requests found.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Client</th>
                                        <th>Type</th>
                                        <th>Amount</th>
                                        <th>Status</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {investmentRequests.map((req) => (
                                        <tr key={req.id}>
                                            <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                                            <td>
                                                <div><strong>{req.User?.fullName || 'Unknown User'}</strong></div>
                                                <small>{req.User?.email}</small>
                                            </td>
                                            <td>{req.type}</td>
                                            <td style={{ fontWeight: 'bold', color: '#10b981' }}>
                                                ₹ {parseFloat(req.amount).toLocaleString()}
                                            </td>
                                            <td>
                                                <span style={{
                                                    padding: '0.2rem 0.6rem',
                                                    borderRadius: '1rem',
                                                    fontSize: '0.8rem',
                                                    backgroundColor: req.status === 'pending' ? '#fef3c7' : '#dcfce7',
                                                    color: req.status === 'pending' ? '#b45309' : '#15803d'
                                                }}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td>
                                                <small>{JSON.stringify(req.details)}</small>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                {/* Contact Requests Section */}
                <div className="records-section" style={{ marginTop: '2rem' }}>
                    <div className="section-header">
                        <h2>Contact Inquiries</h2>
                    </div>

                    {requests.length === 0 ? (
                        <div className="empty-state">
                            <p>No contact inquiries found.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Message</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requests.map((req) => (
                                        <tr key={req.id}>
                                            <td>{new Date(req.createdAt).toLocaleDateString()}</td>
                                            <td><strong>{req.name}</strong></td>
                                            <td>{req.email}</td>
                                            <td>{req.phone}</td>
                                            <td style={{ maxWidth: '300px' }}>{req.message}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;

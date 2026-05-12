import React, { useEffect } from 'react';

const Login = () => {
    useEffect(() => {
        window.location.href = 'https://disafinancial.investwell.app/app/#/login';
    }, []);

    return (
        <div style={{ minHeight: '60vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '1rem' }}>
            <h2>Redirecting to Client Login...</h2>
            <p>If you are not redirected automatically, <a href="https://disafinancial.investwell.app/app/#/login" style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>click here</a>.</p>
        </div>
    );
};

export default Login;

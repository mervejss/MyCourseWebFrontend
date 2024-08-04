import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', null, {
                params: { email, password }
            });

            if (response.status === 200) {
                // Store user information in cookies
                Cookies.set('userEmail', email, { expires: 7 });
                Cookies.set('userPassword', password, { expires: 7 });
                Cookies.set('userID', response.data.userID, { expires: 7 });

                console.log('Login successful:', response.data);
                navigate('/courses');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    useEffect(() => {
        const storedEmail = Cookies.get('userEmail');
        const storedPassword = Cookies.get('userPassword');

        if (storedEmail && storedPassword) {
            axios.post('http://localhost:8080/users/login', null, {
                params: { email: storedEmail, password: storedPassword }
            })
            .then(response => {
                if (response.status === 200) {
                    navigate('/courses');
                }
            })
            .catch(error => {
                console.error('Automatic login failed:', error);
                navigate('/login');
            });
        }
    }, [navigate]);

    return (
        <div className="login-container">
            <h1 className="login-title">GİRİŞ YAP</h1>
            <form onSubmit={handleSubmit} className="login-form">
                <label htmlFor="email">Kullanıcı E-Posta:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Kullanıcı Şifre:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Giriş Yap</button>
            </form>
        </div>
    );
}

export default Login;

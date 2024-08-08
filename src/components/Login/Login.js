import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { addLogEntry } from '../Log/LogUtils'; 

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAutoLogged, setIsAutoLogged] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', null, {
                params: { email, password }
            });

            if (response.status === 200) {
                const userID = response.data.userID;

                Cookies.set('userEmail', email, { expires: 7 });
                Cookies.set('userPassword', password, { expires: 7 });
                Cookies.set('userID', userID, { expires: 7 });

                console.log('Login successful:', response.data);
                await addLogEntry(userID, 0); // 0 corresponds to LOGIN

                navigate('/courses');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    useEffect(() => {

        const attemptAutoLogin = async () => {
            const storedEmail = Cookies.get('userEmail');
            const storedPassword = Cookies.get('userPassword');
    
            if (storedEmail && storedPassword && !isAutoLogged) {
                try {
                    const response = await axios.post('http://localhost:8080/users/login', null, {
                        params: { email: storedEmail, password: storedPassword }
                    });

                    if (response.status === 200) {
                        const userID = response.data.userID;
                        
                        await addLogEntry(userID, 5); // 5 corresponds to AUTO_LOGIN

                        setIsAutoLogged(true);
    
                        navigate('/courses');
                    }
                } catch (error) {
                    console.error('Automatic login failed:', error);
                    navigate('/login');
                }
            }
        };
        
        attemptAutoLogin();
    }, [navigate, isAutoLogged]); // Only depend on navigate and isAutoLogged

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

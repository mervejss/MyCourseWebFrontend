import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Login.css'; // Stil dosyamızı import ediyoruz
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/users/login', null, {
                params: { email, password }
            });

            if (response.status === 200) {
                // Kullanıcı bilgilerini çerezde sakla
                Cookies.set('userEmail', email, { expires: 7 }); // 7 gün geçerlilik süresi
                Cookies.set('userPassword', password, { expires: 7 });

                console.log('Login successful:', response.data);
                // Başarılı giriş sonrası yapılacak işlemler
                navigate('/courses'); // Ana sayfaya yönlendir
            }
        } catch (error) {
            console.error('Login failed:', error);
            // Hata mesajını kullanıcıya gösterin
        }
    };

    useEffect(() => {
        // Çerezlerde kullanıcı bilgilerini kontrol et
        const storedEmail = Cookies.get('userEmail');
        const storedPassword = Cookies.get('userPassword');

        if (storedEmail && storedPassword) {
            // Otomatik giriş yapmak için backend'e istek gönder
            axios.post('http://localhost:8080/users/login', null, {
                params: { email: storedEmail, password: storedPassword }
            })
            .then(response => {
                if (response.status === 200) {
                    // Başarılı giriş sonrası ana sayfaya yönlendir
                    navigate('/courses');
                }
            })
            .catch(error => {
                console.error('Automatic login failed:', error);
                // Giriş başarısızsa, kullanıcıyı giriş sayfasına yönlendir
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

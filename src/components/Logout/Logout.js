import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { addLogEntry } from '../Log/LogUtils'; // Eğer Login.js src/components klasöründe ise

function Logout() {
    const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme

    const handleLogout = () => {
        const userID = Cookies.get('userID');

        addLogEntry(userID, 1); // 0 corresponds to LOGIN

        // Çerezleri temizle
        Cookies.remove('userEmail');
        Cookies.remove('userPassword');
        Cookies.remove('userID');
        
        // Kullanıcıyı giriş sayfasına yönlendir
        navigate('/login');
    };

    useEffect(() => {
        // Logout işlemi için handleLogout fonksiyonunu çağır
        handleLogout();
    }, []); // component mount olduğunda çalışır

    return (
        <div className="logout-container">
            <h1 className="logout-title">Çıkış Yapılıyor...</h1>
            <p>Yönlendiriliyorsunuz...</p>
        </div>
    );
}

export default Logout;

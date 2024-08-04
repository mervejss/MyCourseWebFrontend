import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Cookies from 'js-cookie';

const Profile = () => {
  const [user, setUser] = useState(null);
  const userID = Cookies.get('userID'); // Get user ID from cookies

  useEffect(() => {
    if (userID) {
      axios.get(`http://localhost:8080/users/${userID}/profile`)
        .then(response => {
          console.log(response.data); // Yanıtı kontrol edin
          setUser(response.data);
        })
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [userID]);

  // Tarih ve saati formatlama
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false // 24 saat formatı için
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Merhaba <strong>{user.userFullName}</strong>, Profil detaylarınızı buradan inceleyebilirsiniz</h1>
      <div className="profile-container">
        <div className="profile-details">
          <p><strong>Kullanıcı Kimlik Numarası:</strong> {user.userID}</p>
          <p><strong>Kullanıcı Tipi:</strong> {user.roleType}</p>
          <p><strong>Kullanıcı Adı Soyadı:</strong> {user.userFullName}</p>
          <p><strong>Kullanıcı Rumuz:</strong> {user.userName}</p>
          <p><strong>Kullanıcı E-Posta:</strong> {user.userMail}</p>
          <p><strong>Kullanıcı Şifre:</strong> {user.userPassword} </p>
          <p><strong>Kullanıcı Kayıt Olma Tarihi:</strong> {user.createdAt ? formatDate(user.createdAt) : 'Bilgi Yok'}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

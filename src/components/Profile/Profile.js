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
        .then(response => setUser(response.data))
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [userID]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Merhaba <strong>{user.userFullName}</strong>, Profil detaylarınızı buradan inceleyebilirsiniz</h1>
      <div className="profile-details">
        <p><strong>Kullanıcı Kimlik:</strong> {user.userID}</p>
        <p><strong>Kullanıcı Tipi:</strong> {user.roleType}</p>
        <p><strong>Kullanıcı Adı Soyadı:</strong> {user.userFullName}</p>
        <p><strong>Kullanıcı Adı:</strong> {user.userName}</p>
        <p><strong>Kullanıcı E-Posta:</strong> {user.userMail}</p>
        <p><strong>Kullanıcı Şifre:</strong> ******</p>
        <p><strong>Kullanıcı Kayıt Olma Tarihi:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Profile;

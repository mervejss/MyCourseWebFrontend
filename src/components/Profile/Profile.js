// C:\VsCodeProjects\my-course-web\src\components\Profile\Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import Cookies from 'js-cookie';
import EditProfile from '../EditProfile/EditProfile';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const userID = Cookies.get('userID');

  useEffect(() => {
    if (userID) {
      axios.get(`http://localhost:8080/users/${userID}/profile`)
        .then(response => {
          setUser(response.data);
          // Rol tipini cookies'e kaydet
          if (response.data.roleType) {
            Cookies.set('userRoleType', response.data.roleType, { expires: 7 }); // Çerez süresi 7 gün olarak ayarlanıyor
          }
        })
        .catch(error => console.error('Error fetching user:', error));
    }
  }, [userID]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <h1>Merhaba <strong>{user.userFullName}</strong>, Profil detaylarınızı buradan inceleyebilirsiniz</h1>
      <button onClick={handleEditClick}>
        {isEditing ? 'Geri Dön' : 'Profili Düzenle'}
      </button>
      <div className="profile-container">
        {isEditing ? (
          <EditProfile user={user} setUser={setUser} setIsEditing={setIsEditing} />
        ) : (
          <div className="profile-details">
            <p><strong>Kullanıcı Kimlik Numarası:</strong> {user.userID}</p>
            <p><strong>Kullanıcı Tipi:</strong> {user.roleType}</p>
            <p><strong>Kullanıcı Adı Soyadı:</strong> {user.userFullName}</p>
            <p><strong>Kullanıcı Rumuz:</strong> {user.userName}</p>
            <p><strong>Kullanıcı E-Posta:</strong> {user.userMail}</p>
            <p><strong>Kullanıcı Şifre:</strong> {user.userPassword} </p>
            <p><strong>Kullanıcı Kayıt Olma Tarihi:</strong> {user.createdAt ? formatDate(user.createdAt) : 'Bilgi Yok'}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

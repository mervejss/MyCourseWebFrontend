// C:\VsCodeProjects\my-course-web\src\components\EditProfile\EditProfile.js
import React, { useState } from 'react';
import './EditProfile.css';
import axios from 'axios';
import Cookies from 'js-cookie';

const EditProfile = ({ user, setUser, setIsEditing }) => {
  const [formData, setFormData] = useState(user);
  const [role, setRole] = useState(user.roleType === 'TRAINER' ? '0' : '1');
  const userID = Cookies.get('userID');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      ...formData,
      userRoleID: role === '0' ? 6 : 7,
    };

    axios.put(`http://localhost:8080/users/${userID}`, updatedData)
      .then(response => {
        const updatedUser = response.data;
        console.log('Profile updated:', updatedUser);
        if (updatedUser.roleType) {
          setUser(updatedUser);
          setFormData(updatedUser);
          setRole(updatedUser.roleType === 'TRAINER' ? '0' : '1');
        }
        setIsEditing(false);
        window.location.reload();
      })
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <form onSubmit={handleSubmit} className="edit-profile-form">
      <label>
        Kullanıcı Adı Soyadı:
        <input type="text" name="userFullName" value={formData.userFullName} onChange={handleChange} />
      </label>
      <label>
        Kullanıcı Rumuz:
        <input type="text" name="userName" value={formData.userName} onChange={handleChange} />
      </label>
      <label>
        Kullanıcı E-Posta:
        <input type="email" name="userMail" value={formData.userMail} onChange={handleChange} />
      </label>
      <label>
        Kullanıcı Şifre:
        <input type="password" name="userPassword" value={formData.userPassword} onChange={handleChange} />
      </label>
      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="role"
            value="0"
            checked={role === '0'}
            onChange={() => handleRoleChange('0')}
          />
          Eğitimciyim
        </label>
        <label>
          <input
            type="radio"
            name="role"
            value="1"
            checked={role === '1'}
            onChange={() => handleRoleChange('1')}
          />
          Müşteriyim
        </label>
      </div>
      <button type="submit">Kaydet</button>
    </form>
  );
};

export default EditProfile;

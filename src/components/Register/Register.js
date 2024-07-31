// C:\VsCodeProjects\my-course-web\src\components\Register\Register.js

import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate(); // useNavigate hook'u ile yönlendirme



const handleSubmit = async (e) => {
    e.preventDefault();
 // Console'a yazdır
 console.log('Kullanıcı Tam Ad:', fullName);
 console.log('Kullanıcı Adı:', username);
 console.log('Kullanıcı E-Posta:', email);
 console.log('Kullanıcı Şifre:', password);
 console.log('Kullanıcı Rolü:', role); // 0 veya 1
    const userDTO = {
        userFullName: fullName,
        userName: username,
        userMail: email,
        userPassword: password,
        userRoleID: role === '0' ? 6 : 7, // Eğitmen için 1, Müşteri için 2 olduğunu varsayıyoruz
    };

    try {
      const response = await axios.post('http://localhost:8080/users/register', userDTO);
      console.log('Kayıt Başarılı:', response.data);

      navigate('/login'); // Ana sayfaya yönlendir

    } catch (error) {
        console.error('Kayıt Hatası:', error);
    }
};
  

  return (
    <div className="register-container">
      <h2>Kaydolun ve Kurslara başlayın</h2>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Kullanıcı Tam Ad:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Kullanıcı Adı:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Kullanıcı E-Posta:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Kullanıcı Şifre:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="role"
              value="0"
              checked={role === '0'}
              onChange={() => setRole('0')}
            />
            Eğitimciyim
          </label>
          <label>
            <input
              type="radio"
              name="role"
              value="1"
              checked={role === '1'}
              onChange={() => setRole('1')}
            />
            Müşteriyim
          </label>
        </div>
        <button type="submit" className="register-button" disabled={!role}>
          Kaydol
        </button>
      </form>
    </div>
  );
}

export default Register;

import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Navbar.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Courses from '../Courses/Courses';
import Logout from '../Logout/Logout';
import Profile from '../Profile/Profile';

function Navbar() {
  return (
    <div className="App">
      <header className="App-header">
        <nav>
          <Link to="/login" className="App-link">
            Giriş Yap
          </Link>
          <Link to="/register" className="App-link">
            Kayıt Ol
          </Link>
          <Link to="/logout" className="App-link">
            Çıkış Yap
          </Link>
          <Link to="/profile" className="App-link">
            Profilim
          </Link>
        </nav>
      </header>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default Navbar;

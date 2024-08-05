import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Navbar.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Courses from '../Courses/Courses';
import Logout from '../Logout/Logout';
import Profile from '../Profile/Profile';
import PurchaseHistory from '../PurchaseHistory/PurchaseHistory'; // import your components here
import Home from '../Home/Home';
import Log from '../Log/Log';

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setTimeout(() => setIsDropdownOpen(false), 200);

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo-container">
          <Link to="/home">
            <img
              src="https://github.com/mervejss/MyCourseWebFrontend/blob/64d6b634cd7d2c9169337bfa75117fc511bfdc15/public/logo1.png?raw=true"
              alt="Logo"
              className="logo"
            />
          </Link>
        </div>
        <nav className="nav-links">
          <Link to="/login" className="App-link">Giriş Yap</Link>
          <Link to="/register" className="App-link">Kayıt Ol</Link>
          <Link to="/logout" className="App-link">Çıkış Yap</Link>
        </nav>
        <div 
          className="nav-profile"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Link to="/profile" className="App-link profile-link">Profilim</Link>
          {isDropdownOpen && (
            <div 
              className="dropdown-menu"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link to="/courses" className="dropdown-item">Kurslarım</Link>
              <Link to="/purchase-history" className="dropdown-item">Sipariş/Satış Geçmişim</Link>
              <Link to="/log" className="dropdown-item">Log Kayıtlarım</Link>

            </div>
          )}
        </div>
      </header>
      
    </div>
  );
}

export default Navbar;

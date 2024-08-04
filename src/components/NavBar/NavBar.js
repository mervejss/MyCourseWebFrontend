import React, { useState } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Navbar.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import Courses from '../Courses/Courses';
import Logout from '../Logout/Logout';
import Profile from '../Profile/Profile';
import PurchaseHistory from '../PurchaseHistory/PurchaseHistory'; // import your components here
import EditProfile from '../EditProfile/EditProfile';
import Home from '../Home/Home';

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
              <Link to="/purchase-history" className="dropdown-item">Satın alma geçmişim</Link>
              <Link to="/edit-profile" className="dropdown-item">Profili düzenle</Link>
            </div>
          )}
        </div>
      </header>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/purchase-history" element={<PurchaseHistory />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default Navbar;

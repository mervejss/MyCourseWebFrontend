import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


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
              src="/logo1.jpeg"
              
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
              <Link to="/my-courses" className="dropdown-item">Kurslarım</Link>
              <Link to="/purchase-history" className="dropdown-item">Sipariş Geçmişim</Link>
              <Link to="/log" className="dropdown-item">Log Kayıtlarım</Link>
              <Link to="/my-comments" className="dropdown-item">Yorumlarım</Link>
              <Link to="/my-sale-courses" className="dropdown-item">Satış Geçmişim</Link>
              

            </div>
          )}
        </div>
      </header>
      
    </div>
  );
}

export default Navbar;

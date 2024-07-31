import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Courses from './components/Courses/Courses';
import Logout from './components/Logout/Logout';

function App() {
  return (
    <Router>
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
          </nav>
        </header>
        <Routes>
          {/* Route tanımlamaları */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/logout" element={<Logout />} />

          {/* Diğer sayfalar için yönlendirmeleri ekleyebilirsiniz */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

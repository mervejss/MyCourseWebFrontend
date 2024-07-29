import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Register from './components/Register/Register';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav>
            <Link to="/login" className="App-link">
              Giriş Yap
            </Link>
            {' | '}
            <Link to="/register" className="App-link">
              Kayıt Ol
            </Link>
          </nav>
        </header>
        <Routes>
          {/* Route tanımlamaları */}
          <Route path="/register" element={<Register />} />
          {/* Diğer sayfalar için yönlendirmeleri ekleyebilirsiniz */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/NavBar'; // Navbar bileşenini import edin

function App() {
  return (
    <Router>
      <Navbar />
      
    </Router>
  );
}

export default App;

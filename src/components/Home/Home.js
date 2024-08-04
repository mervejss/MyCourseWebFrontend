import React from 'react';
import './Home.css';
import Courses from '../Courses/Courses';

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-message">ANA SAYFAYA HOŞ GELDİNİZ</h1>
      <Courses />
    </div>
  );
}

export default Home;

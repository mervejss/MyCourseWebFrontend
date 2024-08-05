import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/NavBar/NavBar';
import Courses from './components/Courses/Courses';
import CourseDetails from './components/CourseDetails/CourseDetails';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Logout from './components/Logout/Logout';
import Profile from './components/Profile/Profile';
import PurchaseHistory from './components/PurchaseHistory/PurchaseHistory';
import Home from './components/Home/Home';
import Log from './components/Log/Log';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course-details/:courseID" element={<CourseDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/purchase-history" element={<PurchaseHistory />} />
        <Route path="/log" element={<Log />} />
      </Routes>
    </Router>
  );
}

export default App;

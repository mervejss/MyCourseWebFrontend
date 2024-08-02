import React, { useState, useEffect } from 'react';
import './Courses.css';
import CategoriesNavBar from '../CategoriesNavBar/CategoriesNavBar'; // Doğru dosya yolu

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/courses') // Backend URL ve endpoint
      .then(response => response.json())
      .then(data => setCourses(data))
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  return (
    <div>
      <CategoriesNavBar /> {/* CategoriesNavBar bileşeni */}
      <div className="courses-container">
        {courses.map(course => (
          <div key={course.courseID} className="course-card">
            <h2 className="course-name">{course.courseName}</h2>
            <p className="user-name">{course.userFullName}</p> {/* Yeni eklenen alan */}
            <p className="course-description">{course.courseDescription}</p>
            <p className="course-time">Kurs Saati: {course.courseTotalTime} saat</p>
            <p className="course-price">Kurs Fiyatı: {course.coursePrice} ₺</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

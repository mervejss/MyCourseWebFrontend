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

  const renderStars = (courseScore) => {
    const totalStars = 5;
    const stars = [];

    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span key={i} className={i <= courseScore ? 'star filled' : 'star'}>★</span>
      );
    }

    return stars;
  };
  
  return (
    <div>
      <CategoriesNavBar /> {/* CategoriesNavBar bileşeni */}
      <div className="courses-container">
        {courses.map(course => (
          <div key={course.courseID} className="course-card">
            <h2 className="course-name">{course.courseName}</h2>
            <p className="user-name">{course.userFullName}</p> {/* Yeni eklenen alan */}

            <h3 className="course-category-name">{course.mainCategoryName} / {course.subCategoryName}</h3>



            <p className="course-description">{course.courseDescription}</p>
            <p className="course-time">Kurs Saati: {course.courseTotalTime} saat</p>
            <p className="course-price">Kurs Fiyatı: {course.coursePrice} ₺</p>
            <div className="course-score">
              {renderStars(course.courseScore)}
            </div>



          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;

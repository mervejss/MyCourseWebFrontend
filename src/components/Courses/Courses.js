import React, { useState, useEffect } from 'react';
import './Courses.css';
import CategoriesNavBar from '../CategoriesNavBar/CategoriesNavBar';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});

  useEffect(() => {
    // Tüm kursları çek
    fetch('http://localhost:8080/courses')
      .then(response => response.json())
      .then(data => {
        setCourses(data);
        // Tüm kurs detaylarını çek
        data.forEach(course => fetchCourseDetails(course.courseID));
      })
      .catch(error => console.error('Error fetching courses:', error));
  }, []);

  const fetchCourseDetails = (courseId) => {
    fetch(`http://localhost:8080/courses/courseDetails/${courseId}`)
      .then(response => response.json())
      .then(data => setCourseDetails(prevDetails => ({
        ...prevDetails,
        [courseId]: data
      })))
      .catch(error => console.error('Error fetching course details:', error));
  };

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
      <CategoriesNavBar />
      <div className="courses-container">
        {courses.map(course => {
          // State'den detayları alır
          const details = courseDetails[course.courseID];
          //console.log(details?.mainCategoryName);
          //console.log(details?.subCategoryName);


          return (
            <div key={course.courseID} className="course-card">
              <h2 className="course-name">{course.courseName}</h2>
              <p className="user-name">{details?.userFullName || 'Yükleniyor...'}</p> {/* Kullanıcı adı */}
              <h3 className="course-category-name">
                {details?.subCategoryName 
                  ? `${details.mainCategoryName} / ${details.subCategoryName}` 
                  : details?.mainCategoryName}
              </h3>

              <p className="course-description">{course.courseDescription}</p>
              <p className="course-time">Kurs Saati: {course.courseTotalTime} saat</p>
              <p className="course-price">Kurs Fiyatı: {course.coursePrice} ₺</p>
              <div className="course-score">
                {renderStars(course.courseScore)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;

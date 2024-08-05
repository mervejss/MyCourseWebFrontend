import React, { useState, useEffect } from 'react';
import './Courses.css';
import CategoriesNavBar from '../CategoriesNavBar/CategoriesNavBar';
import { Route, Routes, Link } from 'react-router-dom';
import CourseDetails from '../CourseDetails/CourseDetails';

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});

  useEffect(() => {
    // Fetch all courses
    fetch('http://localhost:8080/courses')
      .then(response => response.json())
      .then(data => {
        setCourses(data);
        // Fetch all course details
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
          const details = courseDetails[course.courseID] || {};
          return (
            <Link to={`/course-details/${course.courseID}`} key={course.courseID} className="course-link">
              <div className="course-card">
                <h2 className="course-name">{course.courseName || 'Kurs Adı Belirtilmemiş'}</h2>
                <p className="user-name">{details.userFullName || 'Eğitmen Bilgisi Belirtilmemiş'}</p>
                <h3 className="course-category-name">
                  {details.subCategoryName 
                    ? `${details.mainCategoryName} / ${details.subCategoryName}` 
                    : details.mainCategoryName || 'Kategori Bilgisi Belirtilmemiş'}
                </h3>
                <p className="course-description">{course.courseDescription || 'A beginner-friendly course on Java programming.'}</p>
                <p className="course-time">Kurs Saati: {course.courseTotalTime || 'Belirtilmemiş'} saat</p>
                <p className="course-price">Kurs Fiyatı: {course.coursePrice ? `${course.coursePrice} ₺` : 'Belirtilmemiş ₺'}</p>
                <div className="course-score-container">
                  {renderStars(course.courseScore || 0)}
                  <p className="course-score">({course.courseScore || '0'})</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <Routes>
        <Route path="/course-details/:courseID" element={<CourseDetails />} />
      </Routes>
    </div>
  );
};

export default Courses;

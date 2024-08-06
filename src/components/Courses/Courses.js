import React, { useState, useEffect } from 'react';
import CategoriesNavBar from '../CategoriesNavBar/CategoriesNavBar';
import { Route, Routes, Link } from 'react-router-dom';
import CourseDetails from '../CourseDetails/CourseDetails';
import CourseCard from '../CourseCard/CourseCard'; 

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
        <span key={i} className={`star ${i <= courseScore ? 'filled' : 'unfilled'}`}>★</span>
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
              <CourseCard course={course} details={details} />
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

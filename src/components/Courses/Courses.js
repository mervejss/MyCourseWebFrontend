import React, { useState, useEffect } from 'react';
import CategoriesNavBar from '../CategoriesNavBar/CategoriesNavBar';
import { Route, Routes, Link } from 'react-router-dom';
import CourseDetails from '../CourseDetails/CourseDetails';
import CourseCard from '../CourseCard/CourseCard'; 

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]); // Kategori state'i
  const [courseDetails, setCourseDetails] = useState({});
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
    // Tüm kursları çekme
    fetch('http://localhost:8080/courses')
      .then(response => response.json())
      .then(data => {
        setCourses(data);
        setFilteredCourses(data); 
        data.forEach(course => fetchCourseDetails(course.courseID));
      })
      .catch(error => console.error('Kurslar yüklenirken hata oluştu:', error));
  }, []);

  useEffect(() => {
    // Tüm kategorileri çekme
    fetch('http://localhost:8080/courseCategories')
      .then(response => response.json())
      .then(data => {
        setCourseCategories(data);
      })
      .catch(error => console.error('Kategoriler yüklenirken hata oluştu:', error));
  }, []);

  const fetchCourseDetails = (courseId) => {
    fetch(`http://localhost:8080/courses/courseDetails/${courseId}`)
      .then(response => response.json())
      .then(data => setCourseDetails(prevDetails => ({
        ...prevDetails,
        [courseId]: data
      })))
      .catch(error => console.error('Kurs detayları yüklenirken hata oluştu:', error));
  };

  const handleCategoryClick = (categoryId) => {
    const filtered = courses.filter(course => {
      if (course.courseCategoryID === categoryId) {
        return true;
      }
      
      if (course.parentCategoryID === categoryId) {
        return true;
      }

      const courseCategory = courseCategories.find(cat => cat.courseCategoryID === course.courseCategoryID);
      if (courseCategory && courseCategory.parentCategoryID === categoryId) {
        return true;
      }

      return false;
    });
  
    setFilteredCourses(filtered);
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
      <CategoriesNavBar onCategoryClick={handleCategoryClick} />
      <div className="courses-container">
        {Array.isArray(filteredCourses) && filteredCourses.length > 0 ? (
          filteredCourses.map(course => {
            const details = courseDetails[course.courseID] || {};
            return (
              <Link to={`/course-details/${course.courseID}`} key={course.courseID} className="course-link">
                <CourseCard course={course} details={details} />
              </Link>
            );
          })
        ) : (
          <p>Kurs bulunamadı.</p>
        )}
      </div>
      <Routes>
        <Route path="/course-details/:courseID" element={<CourseDetails />} />
      </Routes>
    </div>
  );
};

export default Courses;

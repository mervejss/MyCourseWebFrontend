import React, { useState, useEffect } from 'react';
import CategoriesNavBar from '../CategoriesNavBar/CategoriesNavBar';
import SortMenu from '../SortMenu/SortMenu';
import { Route, Routes, Link } from 'react-router-dom';
import CourseDetails from '../CourseDetails/CourseDetails';
import CourseCard from '../CourseCard/CourseCard'; 

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [courseCategories, setCourseCategories] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [filteredCourses, setFilteredCourses] = useState([]);

  useEffect(() => {
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

  const handleSortChange = (sortType) => {
    let sortedCourses;
    switch (sortType) {
      case 'highestScore':
        sortedCourses = [...filteredCourses].sort((a, b) => b.courseScore - a.courseScore);
        break;
      case 'lowestScore':
        sortedCourses = [...filteredCourses].sort((a, b) => a.courseScore - b.courseScore);
        break;
      case 'highestPrice':
        sortedCourses = [...filteredCourses].sort((a, b) => b.coursePrice - a.coursePrice);
        break;
      case 'lowestPrice':
        sortedCourses = [...filteredCourses].sort((a, b) => a.coursePrice - b.coursePrice);
        break;
      case 'highestTime':
        sortedCourses = [...filteredCourses].sort((a, b) => b.courseTotalTime - a.courseTotalTime);
        break;
      case 'lowestTime':
        sortedCourses = [...filteredCourses].sort((a, b) => a.courseTotalTime - b.courseTotalTime);
        break;
      case 'newest':
        sortedCourses = [...filteredCourses].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        sortedCourses = [...filteredCourses].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      default:
        sortedCourses = filteredCourses;
    }
    setFilteredCourses(sortedCourses);
  };

  return (
    <div>
      <CategoriesNavBar onCategoryClick={handleCategoryClick} />
      <div className="header">
        <SortMenu onSortChange={handleSortChange} />
      </div>
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

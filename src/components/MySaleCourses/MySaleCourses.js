import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import CourseCard from '../CourseCard/CourseCard';
import './MySaleCourses.css'; // CSS dosyasını import et
import { FaSearch } from 'react-icons/fa'; // Arama simgesini import et
import SortMenu from '../SortMenu/SortMenu';

const MySaleCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const userID = Cookies.get('userID');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/courses/withUser/${userID}`);
        const userCourses = response.data;
        setCourses(userCourses);
        setFilteredCourses(userCourses);
        userCourses.forEach(course => fetchCourseDetails(course.courseID));
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, [userID]);

  const fetchCourseDetails = async (courseId) => {
    try {
      const response = await axios.get(`http://localhost:8080/courses/courseDetails/${courseId}`);
      setCourseDetails(prevDetails => ({
        ...prevDetails,
        [courseId]: response.data
      }));
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  const handleAddCourse = () => {
    navigate('/add-course');
  };

  const handleEditCourse = (courseID) => {
    navigate(`/edit-course/${courseID}`);
  };

  const handleDeleteCourse = async (courseID) => {
    try {
      await axios.delete(`http://localhost:8080/courses/${courseID}`);
      setCourses(courses.filter(course => course.courseID !== courseID));
      setFilteredCourses(filteredCourses.filter(course => course.courseID !== courseID));
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filtered = courses.filter(course =>
      course.courseName.toLowerCase().includes(searchValue)
    );
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
    <div className="head">

    <h1><strong>Satıştaki Kurslarım</strong></h1>

    <div className="my-sale-courses-container">
      <button onClick={handleAddCourse} className="add-course-button">
        <span className="plus-icon">+</span> Yeni Kurs Ekle
      </button>
      <div className="header">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Kurs adı ile ara..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        <SortMenu onSortChange={handleSortChange} />
      </div>
      <div className="courses-container">
        {filteredCourses.map(course => {
          const details = courseDetails[course.courseID] || {};
          return (
            <div key={course.courseID} className="course-card-container">
              <CourseCard course={course} details={details} />
              <div className="course-card-actions">
                <button className="edit-button" onClick={() => handleEditCourse(course.courseID)}>
                  <span className="edit-icon">✏️</span>
                </button>
                <button className="delete-button" onClick={() => handleDeleteCourse(course.courseID)}>
                  <span className="delete-icon">🗑️</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>

  );
};

export default MySaleCourses;

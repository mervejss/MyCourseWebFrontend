import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../CourseCard/CourseCard'; // CourseCard bileşenini içe aktardık

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const userID = Cookies.get('userID');
  const navigate = useNavigate(); // useNavigate kancasını ekleyin

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const transactionsResponse = await axios.get(`http://localhost:8080/transactions/user?userID=${userID}`);
        const transactionData = transactionsResponse.data;
        const courseIDs = transactionData.map(transaction => transaction.courseID);
        const coursesResponse = await axios.get('http://localhost:8080/courses');
        const allCourses = coursesResponse.data;
        const userCourses = allCourses.filter(course => courseIDs.includes(course.courseID));
        setCourses(userCourses);
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

  const handleCourseClick = (courseID) => {
    navigate(`/my-course-details/${courseID}`, { state: { fromMyCourses: true } });
  };
 

  return (
    <div className="head">
      <h1><strong>Benim Kurslarım</strong></h1>
      <div className="courses-container">
        {courses.map(course => {
          const details = courseDetails[course.courseID] || {};
          return (
            <div key={course.courseID} onClick={() => handleCourseClick(course.courseID)}>
      <CourseCard course={course} details={details} />
    </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;

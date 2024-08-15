import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CourseCard from '../CourseCard/CourseCard'; // Importing CourseCard component

const MySaleCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const userID = Cookies.get('userID');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/courses/withUser/${userID}`);
        const userCourses = response.data;
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

  return (
    <div className="head">
      <h1><strong>Satıştaki Kurslarım</strong></h1>
      <div className="courses-container">
        {courses.map(course => {
          const details = courseDetails[course.courseID] || {};
          return (
            <CourseCard key={course.courseID} course={course} details={details} />
          );
        })}
      </div>
    </div>
  );
};

export default MySaleCourses;

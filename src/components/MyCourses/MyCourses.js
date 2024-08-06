import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import CourseCard from '../CourseCard/CourseCard'; // CourseCard bileşenini içe aktardık

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const userID = Cookies.get('userID');

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Kullanıcının satın aldığı tüm işlemleri çek
        const transactionsResponse = await axios.get(`http://localhost:8080/transactions/user?userID=${userID}`);
        const transactionData = transactionsResponse.data;
        console.log('Transactions:', transactionData); // Log transactions
    
        // Satın alınan kursID'leri al
        const courseIDs = transactionData.map(transaction => transaction.courseID);
        console.log('Course IDs:', courseIDs); // Log course IDs
    
        // Kurs detaylarını çek
        const coursesResponse = await axios.get('http://localhost:8080/courses');
        const allCourses = coursesResponse.data;
        console.log('All Courses:', allCourses); // Log all courses
    
        // Kullanıcıya ait kursları filtrele
        const userCourses = allCourses.filter(course => courseIDs.includes(course.courseID));
        console.log('User Courses:', userCourses); // Log user courses
    
        // Kurs detaylarını ayarla
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
    <div className="head">
    <h1> <strong> Benim Kurslarım</strong></h1>
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

export default MyCourses;

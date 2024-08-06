import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyCourses.css';
import Cookies from 'js-cookie';

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
            <div key={course.courseID} className="course-card">
              <h2 className="course-name">{course.courseName || 'Kurs Adı Belirtilmemiş'}</h2>
              <p className="user-name">{details.userFullName || 'Eğitmen Bilgisi Belirtilmemiş'}</p>
              <h3 className="course-category-name">
                {details.subCategoryName 
                  ? `${details.mainCategoryName} / ${details.subCategoryName}` 
                  : details.mainCategoryName || 'Kategori Bilgisi Belirtilmemiş'}
              </h3>
              <p className="course-time">Kurs Saati: {course.courseTotalTime || 'Belirtilmemiş'} saat</p>
              <p className="course-price">Kurs Fiyatı: {course.coursePrice ? `${course.coursePrice} ₺` : 'Belirtilmemiş ₺'}</p>
              <div className="course-score-container">
                {renderStars(course.courseScore || 0)}
                <p className="course-score">({course.courseScore || '0'})</p>
              </div>
            </div>
          );
        })}
      </div>
      </div>
  );
};

export default MyCourses;

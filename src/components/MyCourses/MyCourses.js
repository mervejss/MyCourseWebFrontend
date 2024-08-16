import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../CourseCard/CourseCard'; // Import the CourseCard component

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const [courseDetails, setCourseDetails] = useState({});
  const [courseProgress, setCourseProgress] = useState({});
  const userID = Cookies.get('userID');
  const navigate = useNavigate();

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
        
        // Fetch details and progress for each course
        userCourses.forEach(course => {
          fetchCourseDetails(course.courseID);
          fetchCourseProgress(userID, course.courseID);
        });
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

  const fetchCourseProgress = async (userID, courseID) => {
    try {
      const response = await axios.get(`http://localhost:8080/courseProgresses/byUserAndCourseFull?userID=${userID}&courseID=${courseID}`);
      console.log(`Fetched progress for courseID ${courseID}:`, response.data);
  
      // Process response to ensure correct handling of multiple records if necessary
      const progress = response.data.length > 0 ? response.data[0] : {};
  
      // Update state
      setCourseProgress(prevProgress => ({
        ...prevProgress,
        [courseID]: progress
      }));
    } catch (error) {
      console.error('Error fetching course progress:', error);
    }
  };

  const handleCourseClick = (courseID) => {
    navigate(`/my-course-details/${courseID}`, { state: { fromMyCourses: true } });
  };

  const getProgressPercentage = (course) => {
    const details = courseDetails[course.courseID] || {};
    const progress = courseProgress[course.courseID] || {};
    const totalTime = details.courseTotalTime || 0;
    const userProgressTime = progress.userProgressTime || 0;
    const percentage = totalTime ? (userProgressTime / totalTime) * 100 : 0;
    return Math.min(100, Math.max(0, percentage)); // Ensure percentage is between 0 and 100
  };

  return (
    <div className="head">
      <h1><strong>Satın Aldığım Kurslarım</strong></h1>
      <div className="courses-container">
        {courses.map(course => {
          const details = courseDetails[course.courseID] || {};
          const progressPercentage = getProgressPercentage(course);

          return (
            <div key={course.courseID} onClick={() => handleCourseClick(course.courseID)} className="course-card">
              <CourseCard course={course} details={details} />
              <div className="progress-bar-container" style={{ marginTop: '10px' }}>
  <div className="progress-bar" style={{ width: `${progressPercentage}%`, backgroundColor: '#4caf50' }}></div>
</div>

              <div className="progress-text">
                {progressPercentage.toFixed(1)}% Tamamlandı
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyCourses;

import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './MyCourseDetails.css';
import Cookies from 'js-cookie';

const MyCourseDetails = () => {
  const { courseID } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const [progressTime, setProgressTime] = useState('');
  const [existingProgress, setExistingProgress] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const userID = Cookies.get('userID');

  useEffect(() => {
    fetch(`http://localhost:8080/courses/courseDetails/${courseID}`)
      .then(response => response.json())
      .then(data => setCourseDetail(data))
      .catch(error => console.error('Error fetching course details:', error));
  }, [courseID]);

  useEffect(() => {
    fetch(`http://localhost:8080/courseProgresses?userID=${userID}&courseID=${courseID}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setExistingProgress(data[0]);
          setProgressTime(data[0].userProgressTime);
        }
      })
      .catch(error => console.error('Error fetching course progress:', error));
  }, [courseID]);

  const handleProgressSave = () => {
    const method = existingProgress ? 'PUT' : 'POST';
    const url = existingProgress
      ? `http://localhost:8080/courseProgresses/${existingProgress.courseProgressID}`
      : `http://localhost:8080/courseProgresses`;

    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID,
        courseID,
        userProgressTime: parseInt(progressTime, 10),
      }),
    })
      .then(response => response.json())
      .then(() => {
        alert('Kurs ilerleme kaydedildi.');
        // Optionally refresh the page or navigate to another page
      })
      .catch(error => console.error('Error saving course progress:', error));
  };

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

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
    <div className="course-details-container">
      <div className="course-card">
        <h2 className="course-name">{courseDetail.courseName || 'Kurs Adı Belirtilmemiş'}</h2>
        <p className="user-name">{courseDetail.userFullName || 'Eğitmen Bilgisi Belirtilmemiş'}</p>
        <h3 className="course-category-name">
          {courseDetail.subCategoryName 
            ? `${courseDetail.mainCategoryName} / ${courseDetail.subCategoryName}` 
            : courseDetail.mainCategoryName || 'Kategori Bilgisi Belirtilmemiş'}
        </h3>
        <p className="course-description">{courseDetail.courseDescription || 'A beginner-friendly course on Java programming.'}</p>
        <p className="course-time">Kurs Saati: {courseDetail.courseTotalTime || 'Belirtilmemiş'} saat</p>
        <p className="course-price">Kurs Fiyatı: {courseDetail.coursePrice ? `${courseDetail.coursePrice} ₺` : 'Belirtilmemiş ₺'}</p>
        <div className="course-score-container">
          {renderStars(courseDetail.courseScore || 0)}
          <p className="course-score">({courseDetail.courseScore || '0'})</p>
        </div>

        {location.state?.fromMyCourses ? (
          <>
            <button 
              className="review-button" 
              onClick={() => navigate(`/addCourseComment/${courseID}`)}>
              Bu Kursa Yorum Yap
            </button>
            <button 
              className="rate-button" 
              onClick={() => navigate(`/addCourseScore/${courseID}`)}>
              Bu Kursa Puanlama Yap
            </button>
            <button 
              className="progress-button" 
              onClick={() => navigate(`/course-progress/${courseID}`)}>
              Bu Kursa İlerleme Kaydet
            </button>
          </>
        ) : (
          <button className="purchase-button" onClick={() => navigate(`/purchase/${courseID}`)}>
            Bu Kursu Satın Al
          </button>
        )}
      </div>
    </div>
  );
};

export default MyCourseDetails;

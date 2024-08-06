import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetails = () => {
  const { courseID } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/courses/courseDetails/${courseID}`)
      .then(response => response.json())
      .then(data => setCourseDetail(data))
      .catch(error => console.error('Error fetching course details:', error));
  }, [courseID]);

  const handlePurchaseClick = () => {
    navigate(`/purchase/${courseID}`);
  };

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  const renderStars = (courseScore) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span key={i} className={i <= courseScore ? 'star filled' : 'star'}>★</span>
      );
    }
    return stars;
  };

  return (
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
      <button className="purchase-button" onClick={handlePurchaseClick}>Bu Kursu Satın Al</button>
    </div>
  );
};

export default CourseDetails;

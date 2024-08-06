import React from 'react';
import './CourseCard.css';

const CourseCard = ({ course, details }) => {
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
    
    
    <div className="course-card">
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
};

export default CourseCard;

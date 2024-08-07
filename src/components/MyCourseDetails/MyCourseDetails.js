import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import './MyCourseDetails.css';

const MyCourseDetails = () => {
  const { courseID } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/courses/courseDetails/${courseID}`)
      .then(response => response.json())
      .then(data => setCourseDetail(data))
      .catch(error => console.error('Error fetching course details:', error));
  }, [courseID]);

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

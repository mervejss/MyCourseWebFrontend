import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetails = () => {
  const { courseID } = useParams();
  const [courseDetail, setCourseDetail] = useState(null);
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState({}); // To store user details
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch course details
        const courseResponse = await fetch(`http://localhost:8080/courses/courseDetails/${courseID}`);
        const courseData = await courseResponse.json();
        setCourseDetail(courseData);

        // Fetch comments
        const commentsResponse = await fetch(`http://localhost:8080/comments/course/${courseID}`);
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

        // Fetch user details for each comment
        const userPromises = commentsData.map(comment =>
          fetch(`http://localhost:8080/users/${comment.userID}`).then(res => res.json())
        );
        const userResponses = await Promise.all(userPromises);

        // Create a mapping of userID to user details
        const userMap = userResponses.reduce((acc, user) => {
          acc[user.userID] = user;
          return acc;
        }, {});
        setUsers(userMap);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [courseID]);

  const handlePurchaseClick = () => {
    navigate(`/purchase/${courseID}`);
  };

  const renderStars = (score) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        <span key={i} className={`star ${i <= score ? 'filled' : 'unfilled'}`}>★</span>
      );
    }
    return stars;
  };

  if (!courseDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="head">
      <h1><strong>Kurs Detayları</strong></h1>
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
          <button className="purchase-button" onClick={handlePurchaseClick}>Bu Kursu Satın Al</button>
        </div>
      </div>
      <div className="head">
        <h1><strong>Kurs Değerlendirmeleri</strong></h1>
        <div className="comments-container">
          {comments.length > 0 ? (
            comments.map(comment => (
              <div key={comment.commentID} className="comment-card">
                <div className="user-info">
                  <p><strong> {users[comment.userID]?.userFullName || 'Belirtilmemiş'}</strong> </p>
                  <p>@{users[comment.userID]?.userName || 'Belirtilmemiş'}</p>
                  <p><strong></strong> {users[comment.userID]?.userMail || 'Belirtilmemiş'}</p>
                  <p><strong>Hesap Oluşturma Tarihi:</strong> {new Date(users[comment.userID]?.createdAt).toLocaleString() || 'Belirtilmemiş'}</p>
                  </div>

                <p className="comment-description"><strong> {comment.commentDescription}</strong></p>
                <div className="comment-score-container">
                  {renderStars(comment.commentScore)}
                  <p className="comment-score">({comment.commentScore})</p>
                </div>
                <p className="comment-date"><strong>Yorum Tarihi:</strong> {new Date(comment.createdAt).toLocaleString()}</p>
                <p className="comment-date"><strong>Güncelleme Tarihi:</strong> {new Date(comment.updatedAt).toLocaleString()}</p>
                </div>
            ))
          ) : (
            <p>Yorum bulunamadı.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;

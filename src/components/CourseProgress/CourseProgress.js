import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './CourseProgress.css';
import { addLogEntry } from '../Log/LogUtils'; 

const CourseProgress = () => {
  const { courseID } = useParams();
  const [progressTime, setProgressTime] = useState('');
  const [existingProgress, setExistingProgress] = useState(null);
  const userID = Cookies.get('userID');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/courseProgresses/byUserAndCourse?userID=${userID}&courseID=${courseID}`)
      .then(response => response.json())
      .then(data => {
        if (data.length > 0) {
          setExistingProgress(data[0]);
          setProgressTime(data[0].userProgressTime);
        }
      })
      .catch(error => console.error('Error fetching course progress:', error));
  }, [courseID, userID]);

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
        userID: parseInt(userID, 10),
        courseID: parseInt(courseID, 10),
        userProgressTime: parseInt(progressTime, 10),
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        addLogEntry(userID, 4); // 4 corresponds to COURSE_PROGRESS

        alert('Kurs ilerleme kaydedildi.');

        navigate(`/my-courses`);
      })
      .catch(error => {
        console.error('Error saving course progress:', error);
        alert('Kurs ilerleme kaydedilirken bir hata oluştu.');
      });
  };

  return (
    <div className="course-progress-container">
      <div className="course-progress-card">
        <h2 className="course-progress-title">Bu Kursta İlerleme Kaydet</h2>
        <label htmlFor="progressTime">Bu kursta kaç saat ilerleme yaptınız?</label>
        <input
          type="number"
          id="progressTime"
          className="progress-input"
          value={progressTime}
          onChange={(e) => setProgressTime(e.target.value)}
          placeholder="Saat cinsinden ilerleme"
        />
        <button className="save-button" onClick={handleProgressSave}>
          Kaydet
        </button>
        {existingProgress && (
          <div className="comment-timestamps">
            <p>İlerleme oluşturulma tarihi: {new Date(existingProgress.createdAt).toLocaleString()}</p>
            <p>İlerleme güncellenme tarihi: {new Date(existingProgress.updatedAt).toLocaleString()}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseProgress;

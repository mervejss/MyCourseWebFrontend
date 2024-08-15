import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './AddCourse.css'; // Import CSS file

const AddCourse = () => {
  const [courseCategoryID, setCourseCategoryID] = useState('');
  const [courseName, setCourseName] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseTotalTime, setCourseTotalTime] = useState('');
  const [coursePrice, setCoursePrice] = useState('');
  const userID = Cookies.get('userID');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCourse = {
      userID: parseInt(userID, 10),
      courseCategoryID: parseInt(courseCategoryID, 10),
      courseName,
      courseDescription,
      courseTotalTime: parseInt(courseTotalTime, 10),
      coursePrice: parseInt(coursePrice, 10),
    };

    try {
      await axios.post('http://localhost:8080/courses', newCourse);
      navigate('/my-sale-courses');
    } catch (error) {
      console.error('Error creating course:', error);
    }
  };

  const handleCancel = () => {
    navigate('/my-sale-courses');
  };

  return (
    <div className="add-course-container">
      <h1>Yeni Kurs Ekle</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseCategoryID">Kategori ID:</label>
          <input
            id="courseCategoryID"
            type="text"
            value={courseCategoryID}
            onChange={(e) => setCourseCategoryID(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseName">Kurs Adı:</label>
          <input
            id="courseName"
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseDescription">Kurs Açıklaması:</label>
          <textarea
            id="courseDescription"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="courseTotalTime">Kurs Süresi (saat):</label>
          <input
            id="courseTotalTime"
            type="text"
            value={courseTotalTime}
            onChange={(e) => setCourseTotalTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="coursePrice">Kurs Fiyatı:</label>
          <input
            id="coursePrice"
            type="text"
            value={coursePrice}
            onChange={(e) => setCoursePrice(e.target.value)}
            required
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">Kurs Ekle</button>
          <button type="button" onClick={handleCancel} className="cancel-btn">İptal</button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;

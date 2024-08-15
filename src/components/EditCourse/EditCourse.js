import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditCourse.css'; // CSS dosyasını import et

const EditCourse = () => {
  const { courseID } = useParams();
  const [course, setCourse] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/courses/${courseID}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };

    fetchCourse();
  }, [courseID]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/courses/${courseID}`, course);
      navigate('/my-sale-courses'); // Düzenleme işlemi tamamlandığında yönlendirme
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  return (
    <div className="edit-course-container">
      <h1>Kursu Düzenle</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Kurs Adı:</label>
          <input
            type="text"
            name="courseName"
            value={course.courseName || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Kurs Açıklaması:</label>
          <textarea
            name="courseDescription"
            value={course.courseDescription || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Toplam Süre:</label>
          <input
            type="number"
            name="courseTotalTime"
            value={course.courseTotalTime || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Fiyat:</label>
          <input
            type="number"
            name="coursePrice"
            value={course.coursePrice || ''}
            onChange={handleChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="submit-btn">Güncelle</button>
          <button type="button" className="cancel-btn" onClick={() => navigate('/my-sale-courses')}>İptal</button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;

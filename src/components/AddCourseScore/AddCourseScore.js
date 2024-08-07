// C:\VsCodeProjects\my-course-web\src\components\AddCourseScore\AddCourseScore.js
import React, { useState } from 'react';
import './AddCourseScore.css';
import Cookies from 'js-cookie';
const userID = Cookies.get('userID');

const AddCourseScore = () => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    console.log("Submitted rating:", rating);
    // Burada puanı sunucuya göndermek için bir API çağrısı yapabilirsiniz.
  };

  return (
    <div className="score-container">
      <h2>Bu Kursa Puanlama Yap</h2>
      <div className="stars">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < rating ? 'filled' : ''}`}
            onClick={() => handleStarClick(index)}
          >★</span>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>Puanı Gönder</button>
    </div>
  );
};

export default AddCourseScore;

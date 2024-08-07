
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddCourseComment.css';
import Cookies from 'js-cookie';

const AddCourseComment = () => {
  const [comment, setComment] = useState('');
  const { courseID } = useParams(); // courseID'yi URL'den alıyoruz
  const navigate = useNavigate(); // yönlendirme için navigate kullanacağız

  const handleCommentChange = (e) => {
    if (e.target.value.length <= 1500) {
      setComment(e.target.value);
    }
  };

  const handleSubmit = () => {
    const userID = Cookies.get('userID');
    const newComment = {
      userID,
      courseID: parseInt(courseID), // courseID'yi sayıya dönüştürüyoruz
      commentDescription: comment,
      commentScore: 0, // Yorum puanı sıfır olarak ayarlanabilir
    };

    fetch('http://localhost:8080/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Comment added:", data);
        navigate('/my-comments'); // Yorum ekleme işleminden sonra başka bir sayfaya yönlendirme
      })
      .catch(error => console.error('Error adding comment:', error));
  };

  

  return (
    <div className="comment-container">
      <h2>Bu Kursa Yorum Yap</h2>
      <textarea 
        className="comment-textarea"
        value={comment}
        onChange={handleCommentChange}
        placeholder="Yorumunuzu buraya yazın..."
      />
      <button className="submit-button" onClick={handleSubmit}>Yorumu Gönder</button>
    </div>
  );
};

export default AddCourseComment;

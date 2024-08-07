import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AddCourseComment.css';
import Cookies from 'js-cookie';

const AddCourseComment = () => {
  const [comment, setComment] = useState('');
  const { courseID } = useParams(); // courseID'yi URL'den alıyoruz
  const navigate = useNavigate(); // yönlendirme için navigate kullanacağız

  // Component yüklendiğinde mevcut yorumu kontrol et
  useEffect(() => {
    const userID = Cookies.get('userID');

    fetch(`http://localhost:8080/comments/user/${userID}/course/${courseID}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.commentDescription) {
          setComment(data.commentDescription); // Mevcut yorum varsa, state'e set et
        }
      })
      .catch(error => console.error('Error fetching comment:', error));
  }, [courseID]);

  const handleCommentChange = (e) => {
    if (e.target.value.length <= 1500) {
      setComment(e.target.value);
    }
  };

  const handleSubmit = () => {
    const userID = Cookies.get('userID');
    const newComment = {
      userID: parseInt(userID), // userID'yi sayıya dönüştürüyoruz
      courseID: parseInt(courseID), // courseID'yi sayıya dönüştürüyoruz
      commentDescription: comment,
      commentScore: 0, // Yorum puanı sıfır olarak ayarlanabilir
    };

    fetch('http://localhost:8080/comments/saveOrUpdate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newComment),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Comment saved or updated:", data);
        navigate('/my-comments'); // Yorum ekleme işleminden sonra başka bir sayfaya yönlendirme
      })
      .catch(error => console.error('Error saving or updating comment:', error));
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

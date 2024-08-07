import React, { useState, useEffect } from 'react';
import './AddCourseScore.css';
import Cookies from 'js-cookie';
import { useParams, useNavigate } from 'react-router-dom';

const AddCourseScore = () => {
  const [rating, setRating] = useState(0);
  const [existingComment, setExistingComment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userID = Cookies.get('userID');
  const { courseID } = useParams(); // courseID'yi URL'den alıyoruz
  const navigate = useNavigate(); // Sayfa yönlendirme için kullanılır

  useEffect(() => {
    // Kullanıcı ve kurs ID'si ile mevcut yorumu al
    fetch(`http://localhost:8080/comments/user/${userID}/course/${courseID}`)
      .then(response => {
        if (response.ok) return response.json();
        throw new Error('Yorum alınamadı');
      })
      .then(data => {
        setExistingComment(data);
        if (data) {
          setRating(data.commentScore); // Mevcut puanı yıldızlara ayarla
        }
        setLoading(false); // Yüklenme tamamlandı
      })
      .catch(error => {
        setError(error.message);
        setLoading(false); // Yüklenme tamamlandı, hata durumu
      });
  }, [userID, courseID]);

  const handleStarClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = () => {
    const newComment = {
      userID: parseInt(userID),
      courseID: parseInt(courseID),
      commentDescription: existingComment ? existingComment.commentDescription : '', // Mevcut yorumu düzenliyorsanız eski açıklama
      commentScore: rating,
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
        // Başarıyla güncelleme sonrası yapılacak işlemler
        navigate('/course-details'); // Yönlendirme örneği (Kurs detaylarına dön)
      })
      .catch(error => console.error('Error saving or updating comment:', error));
  };

  if (loading) return <p>Yorumlar yükleniyor...</p>;
  if (error) return <p>Yorumlar alınırken bir hata oluştu: {error}</p>;

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

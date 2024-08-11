import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyComments.css';
import Cookies from 'js-cookie';
import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Edit ve Silme ikonları için

const MyComments = () => {
  const [comments, setComments] = useState([]);
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingComment, setEditingComment] = useState(null);
  const [newCommentDescription, setNewCommentDescription] = useState('');
  const [newCommentScore, setNewCommentScore] = useState(0);
  const userID = Cookies.get('userID');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await axios.get(`http://localhost:8080/comments/user/${userID}/course`);
        const commentsData = commentsResponse.data;
        setComments(commentsData);

        const courseIDs = [...new Set(commentsData.map(comment => comment.courseID))];
        const courseDetailsPromises = courseIDs.map(courseID =>
          axios.get(`http://localhost:8080/courses/courseDetails/${courseID}`)
        );
        const courseDetailsResponses = await Promise.all(courseDetailsPromises);

        const coursesData = {};
        courseDetailsResponses.forEach(response => {
          coursesData[response.data.courseID] = response.data;
        });
        setCourses(coursesData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching comments and course details:', error);
        setLoading(false);
      }
    };

    fetchComments();
  }, [userID]);

  const handleDeleteComment = async (commentID) => {
    try {
      await axios.delete(`http://localhost:8080/comments/${commentID}`);
      setComments(comments.filter(comment => comment.commentID !== commentID));
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment.commentID);
    setNewCommentDescription(comment.commentDescription);
    setNewCommentScore(comment.commentScore);
  };

  const handleSaveEdit = async (commentID) => {
    try {
      const updatedComment = {
        ...comments.find(comment => comment.commentID === commentID),
        commentDescription: newCommentDescription,
        commentScore: newCommentScore,
      };
      const response = await axios.put(`http://localhost:8080/comments/${commentID}`, updatedComment);
      setComments(comments.map(comment => (comment.commentID === commentID ? response.data : comment)));
      setEditingComment(null);
    } catch (error) {
      console.error('Error updating comment:', error);
    }
  };

  const handleStarClick = (score) => {
    setNewCommentScore(score);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="comments-container">
          <div className="head">

      <h1><strong>Yorumlarım</strong></h1>
      
      {comments.length === 0 ? (
        <p>Henüz yorumunuz yok.</p>
      ) : (
        comments.map(comment => (
          <div className="comment-card">
            
  <h2 className="course-name">
    Kurs ID: {comment.courseID}
  </h2>
  {editingComment === comment.commentID && (
    <h2 className="edit-title">Yorumunuzu düzenleyin</h2>
  )}
  {editingComment === comment.commentID ? (
    <div>
      <textarea
        className="edit-textarea"
        value={newCommentDescription}
        onChange={(e) => setNewCommentDescription(e.target.value)}
        placeholder="Yorumunuzu buraya yazın..."
      />
      <div className="edit-score-container">
        {renderStarsEditable(newCommentScore, handleStarClick)}
      </div>
      <button className="save-button" onClick={() => handleSaveEdit(comment.commentID)}>Kaydet</button>
      <button className="cancel-button" onClick={() => setEditingComment(null)}>İptal</button>
    </div>
  ) : (
    <>
      <p className="comment-description">{comment.commentDescription}</p>
      <div className="comment-score-container">
        {renderStars(comment.commentScore)}
        <p className="comment-score">({comment.commentScore})</p>
      </div>
    </>
  )}
  <div className="comment-actions">
    <FaEdit onClick={() => handleEditComment(comment)} className="edit-icon" />
    <FaTrashAlt onClick={() => handleDeleteComment(comment.commentID)} className="delete-icon" />
  </div>
  <div className="comment-timestamps">
    <p>Yorum oluşturulma tarihi: {new Date(comment.createdAt).toLocaleString()}</p>
    <p>Yorum güncellenme tarihi: {new Date(comment.updatedAt).toLocaleString()}</p>
  </div>
</div>

        ))
      )}
    </div>
    </div>
  );
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

const renderStarsEditable = (score, handleStarClick) => {
  const totalStars = 5;
  const stars = [];
  for (let i = 1; i <= totalStars; i++) {
    stars.push(
      <span
        key={i}
        className={`star ${i <= score ? 'filled' : 'unfilled'}`}
        onClick={() => handleStarClick(i)}
        style={{ cursor: 'pointer' }}
      >
        ★
      </span>
    );
  }
  return stars;
};

export default MyComments;

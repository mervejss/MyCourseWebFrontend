import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyComments.css';
import Cookies from 'js-cookie';

const MyComments = () => {
  const [comments, setComments] = useState([]);
  const [courses, setCourses] = useState({});
  const [loading, setLoading] = useState(true);
  const userID = Cookies.get('userID');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await axios.get(`http://localhost:8080/comments/user/${userID}/course`);
        const commentsData = commentsResponse.data;
        setComments(commentsData);
  
        // Fetch course details for each comment
        const courseIDs = [...new Set(commentsData.map(comment => comment.courseID))];
        const courseDetailsPromises = courseIDs.map(courseID =>
          axios.get(`http://localhost:8080/courses/courseDetails/${courseID}`)
        );
        const courseDetailsResponses = await Promise.all(courseDetailsPromises);
        
        const coursesData = {};
        courseDetailsResponses.forEach(response => {
          console.log(`Course data for ${response.data.courseID}:`, response.data); // Debugging line
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
  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="head">
      <h1><strong>Yorumlarım</strong></h1>
      
      {comments.length === 0 ? (
        <p>Henüz yorumunuz yok.</p>
      ) : (
        comments.map(comment => (
          <div key={comment.commentID} className="comment-card">

             <h2 className="course-name">
              Kurs ID: {comment.courseID}
            </h2>

            <p className="comment-description">{comment.commentDescription}</p>
            <div className="comment-score-container">
              {renderStars(comment.commentScore)}
              <p className="comment-score">({comment.commentScore})</p>
            </div>
          </div>
        ))
      )}
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

export default MyComments;

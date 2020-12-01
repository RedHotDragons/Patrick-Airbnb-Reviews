/* eslint-disable react/prop-types */
import React from 'react';
import Comments from './Comments.jsx';
import styles from '../dist/reviews.module.css';

const months = [ "January", "February", "March", "April", "May", "June",
"July", "August", "September", "October", "November", "December" ];

const Review = ({review, searchQuery}) => {
  let {reviewer_picture, reviewer_name, date, comments} = review;
  let [month, , year] = new Date(date).toLocaleDateString('en-US').split('/');
  console.log('Review.searchQuery:', searchQuery);

  return (
    <div className={styles.review}>
      <div className={styles.reviewHeader}>
        <div><img className={styles.reviewThumbnail} src={reviewer_picture} /></div>
        <div>
          <div className={styles.reviewUser}>{reviewer_name}</div>
          <div className={styles.reviewDate}>{months[month - 1]} {year}</div>
        </div>
      </div>
      <Comments searchQuery={searchQuery}>{comments}</Comments>
    </div>
  );
};

export default Review;
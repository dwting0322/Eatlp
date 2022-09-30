import React from 'react'
import ReviewForm from './ReviewForm';



function CreateReviewForm() {
 
    const review = {};

  return (
    <ReviewForm myReview={review} formType="Post Review" />
  );
}

export default CreateReviewForm
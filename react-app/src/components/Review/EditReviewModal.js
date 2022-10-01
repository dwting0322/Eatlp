import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import {useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import ReviewForm from "./ReviewForm";


function EditReviewModal({ showModal, setShowModal, reviewId }) {
//   const [showModal, setShowModal] = useState(false);

    // const { reviewId } = useParams();
    const review = useSelector(state => state.reviews[reviewId])
    console.log("Review in Edit Modal*************", review)

  return (
    <>
      {/* <i
        className="fa-solid fa-pen-to-square"
        onClick={() => setShowModal(true)}
      /> */}
      {/* <button onClick={() => setShowModal(true)}> Edit Review</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm
            myReview={review} 
            formType="Update Review"
            setShowModal={setShowModal}
            showModal={showModal}
           
            // onHide={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
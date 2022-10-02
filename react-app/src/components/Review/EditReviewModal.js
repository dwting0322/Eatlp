import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import {useParams } from 'react-router-dom';
import {useSelector} from 'react-redux';
import ReviewForm from "./ReviewForm";


function EditReviewModal({ showModal, setShowModal, reviewId, businessId }) {
//   const [showModal, setShowModal] = useState(false);
// console.log("showModal***********", showModal)
    // const { reviewId } = useParams();
    const review = useSelector(state => state.reviews[reviewId])
    // console.log("Review in Edit Modal*************", review)


  return (
    <>
      {/* <i
        className="fa-solid fa-pen-to-square"
        onClick={() => setShowModal(true)}
      /> */}
      {/* <button onClick={() => setShowModal(true)}> X</button> */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
            <div>
                {/* <div onClick={() => setShowModal(false)}>X</div> */}
          <ReviewForm
            myReview={review} 
            formType="Update Review"
            setShowModal={setShowModal}
            showModal={showModal}
            businessId={businessId}
           
            // onHide={() => setShowModal(false)}
          />
          </div>
        </Modal>
      )}
    </>
  );
}

export default EditReviewModal;
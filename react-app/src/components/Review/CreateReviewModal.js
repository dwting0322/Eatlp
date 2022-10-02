import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./ReviewForm";


function CreateReviewModal({businessId}) {
  const [showModal, setShowModal] = useState(false);

  const review = {};

  return (
    <>
      {/* <i
        className="fa-solid fa-pen-to-square"
        onClick={() => setShowModal(true)}
      /> */}
      <button className="create_review_button_modal" onClick={() => setShowModal(true)}> Create Review </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ReviewForm
            myReview={review} 
            formType="Post Review" 
            businessId={businessId}
            setShowModal={setShowModal}
            showModal={showModal}
            // onHide={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default CreateReviewModal;
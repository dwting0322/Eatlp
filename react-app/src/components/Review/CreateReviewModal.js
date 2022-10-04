import React, { useEffect, useState } from "react";
import { Modal } from "../../context/Modal";
import ReviewForm from "./ReviewForm";


function CreateReviewModal({businessId}) {
  const [showModal, setShowModal] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const review = {};

  useEffect(() => {
    const LoadingTimeOut = setTimeout(() => {
        setLoaded(true);
        
    }, 100);

    return () => clearTimeout(LoadingTimeOut);

}, []);

  return (
    <>
      {/* <i
        className="fa-solid fa-pen-to-square"
        onClick={() => setShowModal(true)}
      /> */}
      {/* const LoadingTimeOut = setTimeout(() => {
            setLoaded(true);
        }, 500);

        return () => clearTimeout(LoadingTimeOut); */}

      {/* {setTimeout(() => {
          <button className="create_review_button_modal" onClick={() => setShowModal(true)}> Create Review </button>
      }, 5000)} */}



       {loaded && <button className="create_review_button_modal" onClick={() => setShowModal(true)}> Create Review </button>} 

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
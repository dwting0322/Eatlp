// import React, { useState } from "react";
// import { Modal } from "../../context/Modal";
// import {useParams } from 'react-router-dom';
// import {useSelector} from 'react-redux';
// import ReviewForm from "./ReviewForm";


// function EditReviewModal({ showModal, setShowModal, reviewId, businessId, onHide }) {
// //   const [showModal, setShowModal] = useState(false);
// // console.log("reviewId***********", reviewId)
//     // const { reviewId } = useParams();
//     const review = useSelector(state => state.reviews[reviewId])
//     // console.log("Review in Edit Modal*************", review)
//     // const [isShowModal, isSetShowModal] = useState(false);

//     console.log("showModal in EditReviewModal!!!!!!!!!!!!!!!!!!!!!", showModal)

//   return (
//     <>
//       {/* <i
//         className="fa-solid fa-pen-to-square"
//         onClick={() => setShowModal(true)}
//       /> */}
//       {/* <button onClick={() => setShowModal(true)}> X</button> */}
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//             <div>
//                 {/* <button onClick={onHide()}>X</button> */}
//           <ReviewForm
//             myReview={review} 
//             formType="Update Review"
//             setShowModal={setShowModal}
//             showModal={showModal}
//             businessId={businessId}
//             onHide={onHide}
//           />
//           </div>
//         </Modal>
//       )}
//     </>
//   );
// }

// export default EditReviewModal;
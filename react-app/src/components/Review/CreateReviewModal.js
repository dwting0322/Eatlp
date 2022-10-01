// import React, { useState } from "react";
// import { Modal } from "../../context/Modal";
// import ReviewForm from "./ReviewForm";


// function CreateReviewModal() {
//   const [showModal, setShowModal] = useState(false);

//   const review = {};

//   return (
//     <>
//       {/* <i
//         className="fa-solid fa-pen-to-square"
//         onClick={() => setShowModal(true)}
//       /> */}
//       <button onClick={() => setShowModal(true)}> Create Review</button>
//       {showModal && (
//         <Modal onClose={() => setShowModal(false)}>
//           <ReviewForm
//             myReview={review} formType="Post Review"
//             onHide={() => setShowModal(false)}
//           />
//         </Modal>
//       )}
//     </>
//   );
// }

// export default CreateReviewModal;
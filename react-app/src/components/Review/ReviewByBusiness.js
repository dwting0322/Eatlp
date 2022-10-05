import React, { useState } from 'react'
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { Modal } from '../../context/Modal';
import { deleteReview, getBusinessAllReview } from '../../store/review'
import EditReviewModal from './EditReviewModal';
import './Review.css'
import ReviewForm from './ReviewForm';
import LoadingPic from '../../Picture/pizzaLoadingPage.gif'


function ReviewByBusiness({ showModal, setShowModal, businessId}) {

    const dispatch = useDispatch();
    const { id } = useParams()
    const [loaded, setLoaded] = useState(false);
    const [isloaded, isSetLoaded] = useState(false);

    const reviewsObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewsObj)
    // console.log("reviews!!!!!!!!!!!!!!!!!!!!!", reviews)
    const filter = reviews.filter(review => review?.business_id === +id)

    // console.log("filter!!!!!!!!!!!!!!!!!!!!!", filter)
    const user = useSelector((state) => state.session.user)
    // const [review, setReview] = useState(null)
    const [reviewId, setReviewId] = useState(0)
    // const deletebiz = () => {
    //     dispatch(deleteReview(review.id));
    //     alert("I have successfully eaten the review for you!!!");
    // };
    // console.log("reviewId*********", reviewId)

    useEffect(() => {
        dispatch(getBusinessAllReview(id)).then(() => {
            isSetLoaded(true);
          })
       
    }, [dispatch]);


    useEffect(() => {
        const LoadingTimeOut = setTimeout(() => {
            setLoaded(true);
        }, 100);
        return () => clearTimeout(LoadingTimeOut);
    }, []);

    useEffect(() => {
        const LoadingTimeOut = setTimeout(() => {
            isSetLoaded(true);
        }, 200);
        return () => clearTimeout(LoadingTimeOut);
    }, []);

    if(!loaded) return (<img className='loading_page' src={LoadingPic} alt='loading page' />)
    

    return (
        <div className='review_outter_container'>
            <h2 className='Recommended'>Recommended Reviews: </h2>

            {filter.length ? (filter.map(review => (

                <div className='review_by_biz_contanier' key={review.id} >
                    <hr></hr>
                    <div className='profile_img_and_name_review'>
                        <img className='profile_img_review' src={review?.user?.profile_img} alt="profile image"
                            onError={e => { e.currentTarget.src = "https://s3-media0.fl.yelpcdn.com/photo/u_4AtMdPnNBQgn5fWEyTnw/ss.jpg" }}
                        />
                        <div className='profile_name_review'>{review?.user?.first_name}</div>
                    </div>
                    <div>
                   
                        {review?.stars === 1 && (<i className="fa-solid fa-star star-icon"/>)}
                        {review?.stars === 2 && (<><i className="fa-solid fa-star star-icon"/><i className="fa-solid fa-star star-icon"/></>)}
                        {review?.stars === 3 && (<><i className="fa-solid fa-star star-icon"/><i className="fa-solid fa-star star-icon"/><i className="fa-solid fa-star star-icon"/></>)}
                        {review?.stars === 4 && (<><i className="fa-solid fa-star star-icon"/><i className="fa-solid fa-star star-icon"/><i className="fa-solid fa-star star-icon"/><i className="fa-solid fa-star star-icon"/></>)}
                        {review?.stars === 5 && (<><i className="fa-solid fa-star star-icon"/><i className="fa-solid fa-star star-icon"/><i className="fa-solid fa-star star-icon"/><i className="fa-solid fa-star star-icon"/><i className="fa-solid fa-star star-icon"/></>)}
                        {/* {review?.stars}  */}

                    </div>
                    <div> {new Date(review.created_at).toLocaleDateString()} </div>
                    <div className="ReviewForm_review" > {review?.review} </div>
                    {user?.id === review?.user_id && (
                        <div>
                            {/* <NavLink className="edit_link_review" to={`/reviews/${review.id}/edit`}><i className="fa-solid fa-pen-to-square"></i> Edit</NavLink> */}
                            <span className='edit_review_modal' onClick={(e) => {
                                // setReview(review)
                                // e.stopPropagation();
                                
                                setReviewId(review.id)
                                setShowModal(true)
                            }}>
                                <i className="fa-solid fa-pen-to-square" />
                                <EditReviewModal reviewId={reviewId}  showModal={showModal} setShowModal={setShowModal} businessId={businessId}/>
                                Edit
                            </span>

                            <button className='delete_review' onClick={() => {
                                dispatch(deleteReview(review.id))
                                alert("I have successfully eaten the message for you!!!")
                                }}> <i className="fa-solid fa-trash-can"/> Delete</button>
                        
                        </div>
                        
                    )}

                    {/* {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <ReviewForm
                                formType="Update Review"
                                // myReview={review} 
                                reviewId={reviewId}
                                setShowModal={setShowModal}
                                showModal={showModal}
                                // businessId={businessId}
                            // onHide={() => setShowModal(false)}
                            />
                        </Modal>
                    )} */}
                </div>

            ))) : isloaded && <h1 className="no_review_words" >You currently have no any review !</h1>}
            <hr className="line"></hr>
        </div> 
    )
}

export default ReviewByBusiness

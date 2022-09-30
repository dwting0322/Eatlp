import React from 'react'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useParams } from "react-router-dom";
import { getBusinessAllReview } from '../../store/review'
import './Review.css'



function ReviewByBusiness() {

    const dispatch = useDispatch();
    const { id } = useParams()


    const reviewsObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewsObj)
    const filter = reviews.filter(review => review?.business_id === +id)
  

    useEffect(() => {
        dispatch(getBusinessAllReview(id));
    }, [dispatch]);



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
                    <div><i className="fa-solid fa-star"></i> {review.stars} </div>
                    <div> {new Date(review.created_at).toLocaleDateString()} </div>
                    <div className="ReviewSpot_review" > {review.review} </div>
                   
                </div>
           

            ))) : <h1 className="no_review_words" >Currently no any review, want to be the first one?</h1>}
            <hr className="line"></hr>
        </div>
    )
}

export default ReviewByBusiness

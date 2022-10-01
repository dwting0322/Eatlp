import React from 'react';
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getAllReview } from '../../store/review';
import './Review.css'

function ReviewBrower() {

    const dispatch = useDispatch();
    const reviewsObj = useSelector((state) => state.reviews)
    const reviews = Object.values(reviewsObj)
    reviews.reverse();
    // const filterReview = businesses.filter(business => business?.id === reviews?.business_id)

    const user = useSelector((state) => state.session.user)


    useEffect(() => {
        dispatch(getAllReview());
    }, [dispatch]);


    return (
        <div className='review_conatiner'>

            {reviews.map(review => (

                <div key={review.id}>

                    <div className='review_second_container'>
                        <div className='review_profile'>
                            <img className='profile_img_review' src={review?.user?.profile_img} alt="profile image"
                                onError={e => { e.currentTarget.src = "https://s3-media0.fl.yelpcdn.com/photo/u_4AtMdPnNBQgn5fWEyTnw/ss.jpg" }}
                            />
                            <div className='profile_name_review'>{review?.user?.first_name}</div>
                        </div>
                        <NavLink className='business_link_review' to={`/businesses/${review.business_id}`}>
                        <span className='business_name_review'>{review?.business_name}</span>
                        </NavLink>

                        <div className='Stars'> Stars: {review?.stars?.toFixed(1)} </div>

                        <div className='Review'> Review: {review?.review} </div> 
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ReviewBrower

{/* <div>
{spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0}
</div> */}
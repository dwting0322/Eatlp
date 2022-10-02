import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview, editReview, getOneReviewByReviewId } from '../../store/review';
import "./Review.css"
import { Rating } from "react-simple-star-rating";



function ReviewForm({ myReview, formType, showModal, setShowModal, businessId , reviewId}) {

    // console.log("setShowModal***********", setShowModal)

    const history = useHistory();
    const dispatch = useDispatch()

    const [stars, setStars] = useState(myReview?.stars * 20 || "")
    const [review, setReview] = useState(myReview?.review || "")
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    const user = useSelector(state => state.session.user)

    // const reviewsObj = useSelector((state) => state.reviews);
    // const reviews = Object.values(reviewsObj)
    
    // const filter = reviews.filter(review => review?.user_id === user?.id)
    // console.log("filter from component: ", filter)
    // const { reviewId } = useParams()
    // console.log("reviewId", reviewId)
    // console.log("myReview", myReview)
    // const { businessId } = useParams()
    // console.log("businessId", businessId)
    // const reviewsObj = useSelector((state) => state.reviews);
    // const reviews = Object.values(reviewsObj)



    const handleStarRating = (starRating) => {
        setStars(starRating);
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) {
            return alert("Cannot Submit");
        }

        if (!user) alert("Please log in before write a review!")

        const myReviewInfo = {
            ...myReview,
            user_id: user.id,
            business_id: businessId,
            stars: stars / 20,
            review,
        };
        // console.log("myReviewInfo*************", myReviewInfo)

        if (formType === "Post Review") {
            const newReview = await dispatch(createReview(myReviewInfo))
            setShowModal(false)
            history.push(`/businesses/${newReview.business_id}`);

        } else {
            const edittedReview = await dispatch(editReview(myReviewInfo))
            console.log("edittedReview", edittedReview)
            setShowModal(false)

            if (edittedReview && edittedReview.errors) {
                return setValidationErrors(edittedReview.errors);
            }
            history.push(`/businesses/${edittedReview.business_id}`);
        }

        //   history.push(`/reviews/${review.id}`);
    };


    useEffect(async () => {
        if (reviewId) {
            // console.log("reviewId***********", reviewId)
            const ReviewData = await dispatch(getOneReviewByReviewId(reviewId))
            // console.log("ReviewData************", ReviewData)
            setStars(ReviewData.stars * 20)
            setReview(ReviewData.review);

        }
    }, [dispatch, reviewId]);




    useEffect(() => {
        let errors = [];

        // if (stars > 5 || stars < 1) {
        //     errors.push("Stars must be an integer from 1 to 5");
        // }
        if (!stars) {
            errors.push("Stars rating is required");
        }
        if (review.length > 255 || review.length < 10) {
            errors.push("Review number of words must be from 10 to 255");
        }

        setValidationErrors(errors);

    }, [review, stars]);


    if (!user) {
        alert("Please log in/sign up before leave a review!")
        history.push("/login")
    }

    return user && (
        <div className='review_form_container'>
            <form onSubmit={handleSubmit} >
                <h1 className='Update_review'>{formType}:</h1>
                <button className='XXX' onClick={() => { setShowModal(false) }}> X </button>

                {/* <input type="submit" value={formType} placeholder="X"></input> */}

                <ul className="errors_ul">
                    {hasSubmitted && validationErrors.map(error => (
                        <li className='Review_errorsList' key={error}>
                            <i className="fa-solid fa-ban"></i> {error}
                        </li>
                    ))}
                </ul>


                <div className='container_review_rating'>

                    <Rating className='Rating_tag'
                        onClick={handleStarRating}
                        ratingValue={stars}
                        size={50}
                        transition
                        showTooltip
                        tooltipArray={[
                            'Not Good',
                            'Could be better',
                            'Average',
                            'Good',
                            'Great'
                        ]}
                    />

                    {/* <input className="rating_input"
                            type="radio"
                            name="rating"
                            value="5"
                            id="rating5"
                            onClick={(e) => setStars(e.target.value)}
                        />
                        <label for="rating5"  className="fas fa-star"></label>

                        <input className="rating_input"
                            type="radio"
                            name="rating"
                            value="4"
                            id="rating4"
                            onClick={(e) => setStars(e.target.value)}
                        />
                        <label for="rating4"  className="fas fa-star"></label>

                        <input className="rating_input"
                            type="radio"
                            name="rating"
                            value="3"
                            id="rating3"
                            onClick={(e) => setStars(e.target.value)}
                        />
                        <label for="rating3"  className="fas fa-star"></label>

                        <input className="rating_input"
                            type="radio"
                            name="rating"
                            value="2"
                            id="rating2"
                            onClick={(e) => setStars(e.target.value)}
                        />
                        <label for="rating2"  className="fas fa-star"></label>

                        <input className="rating_input"
                            type="radio"
                            name="rating"
                            value="1"
                            id="rating1"
                            onClick={(e) => setStars(e.target.value)}
                        />
                        <label for="rating1"  className="fas fa-star"></label> */}


                    {/* <select className='stars_select'
                        value={stars}
                        onChange={e => setStars(e.target.value)}
                        required>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select> */}
                </div>

                <div className='move_word_up'>
                    <label className='REview_word'>
                        * Review:
                        <textarea className='Review_ReviewForm'
                            type="text"
                            required
                            placeholder="Doesn't look like much when you walk past, but I was practically dying of hunger so I popped in..."
                            value={review}
                            onChange={e => setReview(e.target.value)}
                        />
                    </label>
                </div>
                <div >
                    <input className='Create_a_review_button' type="submit" value={formType} />
                </div>
            </form>
        </div>
    );
}

export default ReviewForm

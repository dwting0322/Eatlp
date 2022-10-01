import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview, editReview, getOneReviewByReviewId } from '../../store/review';
import "./Review.css"



function ReviewForm({ myReview, formType }) {

    const history = useHistory();
    const dispatch = useDispatch()

    const [stars, setStars] = useState(myReview?.stars || "1")
    const [review, setReview] = useState(myReview?.review || "")
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    const { reviewId } = useParams()
    const { businessId } = useParams()

    // const reviewsObj = useSelector((state) => state.reviews);
    // const reviews = Object.values(reviewsObj)

    const user = useSelector(state => state.session.user)






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
            stars,
            review,
        };


        if (formType === "Post Review") {
            const newReview = await dispatch(createReview(myReviewInfo))
            history.push(`/businesses/${newReview.business_id}`);

        } else {
            const edittedReview = await dispatch(editReview(myReviewInfo))
            history.push(`/businesses/${edittedReview.business_id}`);
        }

        //   history.push(`/reviews/${review.id}`);
    };


    useEffect(async () => {
        if (reviewId) {
            const ReviewData = await dispatch(getOneReviewByReviewId(reviewId))

            setStars(ReviewData.stars);
            setReview(ReviewData.review);

        }
    }, [dispatch, reviewId]);




    useEffect(() => {
        let errors = [];

        if (stars > 5 || stars < 1) {
            errors.push("Stars must be an integer from 1 to 5");
        }
        // if (!review.length) {
        //     errors.push("Review text is required");
        // }
        if (review.length > 255 || review.length < 1) {
            errors.push("Review number of words must be from 1 to 255");
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
                <h2>{formType}:</h2>
             

                <ul className="errors_ul">
                    {hasSubmitted && validationErrors.map(error => (
                        <li className='Review_errorsList' key={error}>
                            <i className="fa-solid fa-ban"></i> {error}
                        </li>
                    ))}
                </ul>
                <div>
                    <label>
                        * Stars:
                        <select className='stars_select'
                            value={stars}
                            onChange={e => setStars(e.target.value)}
                            required>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        * Review:
                        <textarea className='Review_ReviewForm'
                            type="text"
                            required
                            placeholder="Please say something..."
                            value={review}
                            onChange={e => setReview(e.target.value)}
                        />
                    </label>
                </div>

                <input className='Create_a_review_button' type="submit" value={formType} />

            </form>
        </div>
    );
}

export default ReviewForm

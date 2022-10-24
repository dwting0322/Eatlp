import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createReview, editReview, getOneReviewByReviewId } from '../../store/review';
import "./Review.css"
// import { Rating } from "react-simple-star-rating";



function ReviewForm({ myReview, formType, showModal, setShowModal, businessId, reviewId }) {
    const history = useHistory();
    const dispatch = useDispatch()

    // console.log("showModal in ReviewForm***********", showModal)
    // if(reviewId){
    //      myReview = dispatch(getOneReviewByReviewId(reviewId))
    // } 

    const [stars, setStars] = useState(myReview?.stars || "")
    const [review, setReview] = useState(myReview?.review || "")
    const [review_img, setReview_img] = useState(myReview?.review_img || "")
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [mouse1, setMouse1] = useState(false)
    const [mouse2, setMouse2] = useState(false)
    const [mouse3, setMouse3] = useState(false)
    const [mouse4, setMouse4] = useState(false)
    const [mouse5, setMouse5] = useState(false)

    const [image, setImage] = useState(false);
    const [imageLoading, setImageLoading] = useState(false);


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

    // const handleStarRating = (starRating) => {
    //     setStars(starRating);
    // };
    // const changeStyle = () => {
    //     setStyle("background-color:gold")
    // }

    const styles = {
        "color": "lightgrey"
    }


    function changingColor() {
        styles.color = "gold"

    }




    const handlebutton = (e) => {
        // e.preventDefault();

        setShowModal(false)
    }



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
            stars: stars,
            review,
            review_img
        };
        // console.log("myReviewInfo*************", myReviewInfo)

        if (formType === "Post Review") {
            const newReview = await dispatch(createReview(myReviewInfo))
            setShowModal(false)
            history.push(`/businesses/${newReview.business_id}`);

        } else {
            const edittedReview = await dispatch(editReview(myReviewInfo))
            // console.log("edittedReview", edittedReview)
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
            setStars(ReviewData.stars)
            setReview(ReviewData.review);
            setReview_img(ReviewData.review_img);

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
            errors.push("Review number of characters must be from 10 to 255");
        }
        

        setValidationErrors(errors);

    }, [review, stars]);



    const handleSubmitImage = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/reviews/upload', {
            method: "POST",
            body: formData,
        });


        if (res.ok) {
            const data = await res.json();
            // console.log("data.url", data.url)
            setReview_img(data.url);
            setImageLoading(false);
            // history.push("/images");
            alert("Successfully uploaded the image.");

        } else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            alert("An error occurred while uploading the image.");

        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }





    if (!user) {
        alert("Please log in/sign up before leave a review!")
        history.push("/login")
    }

    return user && (
        <div className='review_form_container'>
            <form onSubmit={handleSubmit} >
                <h1 className='Update_review'>{formType}:</h1>
                <div className='XXX' onClick={() => setShowModal(false)}> X </div>

                {/* <input type="submit" value={formType} placeholder="X"></input> */}

                <ul className="errors_ul">
                    {hasSubmitted && validationErrors.map(error => (
                        <li className='Review_errorsList' key={error}>
                             {error}
                        </li>
                    ))}
                </ul>


                <div className='container_review_rating'>

                    {/* <Rating className='Rating_tag'
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
                    /> */}
                    <div className='gray_star'>
                        {/* style={{ color: stars >= 1 ? "gold" : 'lightgray' ||  mouse? "gold" : "lightgray"} */}
                        <span className='star1' style={{ color: mouse1 || stars >= 1 ? "gold" : "lightgray" }}
                            onMouseEnter={() => setMouse1(true)}
                            // setColor("gold")
                            // changingColor()
                            // style = {{color:`${color}`}}


                            onMouseLeave={() => setMouse1(false)}
                            onClick={() => {
                                setStars(1)

                            }} > <i className="fa-solid fa-star star_icon icon1" /></span>
                        {/* style={{ color: stars >= 2 ? "gold" : 'lightgray' }} */}
                        <span className='star1' style={{ color: mouse2 || stars >= 2 ? "gold" : "lightgray" }}

                            onMouseEnter={() => {
                                setMouse2(true)
                                setMouse1(true)
                            }}
                            onMouseLeave={() => {
                                setMouse2(false)
                                setMouse1(false)
                            }}
                            onClick={() => {
                                setStars(2)

                            }} > <i className="fa-solid fa-star star_icon" /></span>

                        <span className='star1' style={{ color: mouse3 || stars >= 3 ? "gold" : 'lightgray' }}
                            onMouseEnter={() => {
                                setMouse3(true)
                                setMouse2(true)
                                setMouse1(true)
                            }}
                            onMouseLeave={() => {
                                setMouse3(false)
                                setMouse2(false)
                                setMouse1(false)
                            }}

                            onClick={() => {
                                setStars(3)

                            }} > <i className="fa-solid fa-star star_icon" /></span>

                        <span className='star1' style={{ color: mouse4 || stars >= 4 ? "gold" : 'lightgray' }}
                            onMouseEnter={() => {
                                setMouse4(true)
                                setMouse3(true)
                                setMouse2(true)
                                setMouse1(true)
                            }}
                            onMouseLeave={() => {
                                setMouse4(false)
                                setMouse3(false)
                                setMouse2(false)
                                setMouse1(false)
                            }}

                            onClick={() => {
                                setStars(4)

                            }} > <i className="fa-solid fa-star star_icon" /></span>

                        <span className='star1' style={{ color: mouse5 || stars >= 5 ? "gold" : 'lightgray' }}
                            onMouseEnter={() => {
                                setMouse5(true)
                                setMouse4(true)
                                setMouse3(true)
                                setMouse2(true)
                                setMouse1(true)
                            }}
                            onMouseLeave={() => {
                                setMouse5(false)
                                setMouse4(false)
                                setMouse3(false)
                                setMouse2(false)
                                setMouse1(false)
                            }}

                            onClick={() => {
                                setStars(5)

                            }} > <i className="fa-solid fa-star star_icon" /></span>
                        <span className='star_comment'>
                            <span className='star_comment1'>{stars === 1 && <i className="fa-solid fa-poo" />}</span>
                            <span className='star_comment2'>{stars === 2 && <i className="fa-solid fa-face-sad-cry" />}</span>
                            <span className='star_comment3'>{stars === 3 && <i className="fa-solid fa-face-meh" />}</span>
                            <span className='star_comment4'>{stars === 4 && <i className="fa-solid fa-face-laugh" />}</span>
                            <span className='star_comment5'>{stars === 5 && <i className="fa-solid fa-face-grin-squint" />}</span>
                        </span>
                    </div>
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
                            maxlength="225"
                        />
                    </label>
                </div> 


                <div className='Review_img'>
                    <label >Review Image: </label>
                    <span className='optional'> (Optional)</span>
                    <div className='file_input'
                    >
                        <input className='file_input_review'
                            type="file"
                            accept="image/*"
                            onChange={updateImage}
                            id='upload_file'
                        />
                    </div>
                    <div className='upload_delete_button_div_review'>

                        <button className={`upload_button ${image ? 'upload' : ''}`}
                            onClick={handleSubmitImage}
                            disabled={image === false}
                        > <i className="fa-solid fa-cloud-arrow-up" /> Upload</button>

                        <button className={`upload_button ${image ? 'upload' : ''}`}
                            onClick={() => {
                                setImage(false)
                                setReview_img('')
                                document.getElementById('upload_file').value = null;
                            }}
                            disabled={image === false}
                        > <i className="fa-solid fa-trash-can"></i> Delete</button>
                    </div>
                    {(imageLoading) && <p className='uploading'>Uploading...</p>}
                </div>


                <div >
                    <input className='Create_a_review_button' type="submit" value={formType} />
                </div>
            </form>
        </div>
    );
}

export default ReviewForm

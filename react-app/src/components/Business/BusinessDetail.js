import React, { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, Redirect, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBusiness, getOneBusiness } from '../../store/business';
import './Business.css'
import ReviewByBusiness from '../Review/ReviewByBusiness';
import CreateReviewModal from '../Review/CreateReviewModal';
import LoadingPic from '../../Picture/pizzaLoadingPage.gif'
import GoogleMapReact from 'google-map-react';
require('dotenv').config();


function BusinessDetail() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory()
    const [showModal, setShowModal] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [googleMapAPIKey, setGoogleMapAPIKey] = useState(null);


    const user = useSelector((state) => state.session.user);


    const business = useSelector(state => state.businesses[id])

    const reviewsObj = useSelector((state) => state.reviews);
    const reviews = Object.values(reviewsObj)
    // console.log("reviews***********", reviews)
    // const filter = reviews.filter(review => review?.user_id === user?.id)
    // console.log("filter from component: ", filter)
    // const user = useSelector(state=> state.session.user)

    //    console.log("setShowModal***********", setShowModal)
    // console.log("showModal in BusinessDetail***********", showModal)


    const googleMapKeyHelper = async (business) => {

        if (!business) {
            return <img className='loading_page' src={LoadingPic} alt='loading page' />
        }

        const response = await fetch(`/GOOGLE_MAP_API_KEY`);
        const data = await response.json();
        setGoogleMapAPIKey(data)
        return
    }


    function googleMap(lat, lng, googleMapAPIKey) {
        return googleMapAPIKey && (
            <div style={{ height: '50vh', width: '100%' }}>

                <GoogleMapReact
                    bootstrapURLKeys={{ key: googleMapAPIKey }}
                    defaultCenter={{ lat: lat, lng: lng }}
                    defaultZoom={15}
                    yesIWantToUseGoogleMapApiInternals={true}
                    isMarkerShown={true}
                >
                </GoogleMapReact>
            </div>
        )
    }



    useEffect(() => {
        googleMapKeyHelper(business);
    }, [business]);




    const deletebiz = () => {
        dispatch(deleteBusiness(business.id));
        alert("I have successfully eaten the business for you!!!");
        history.push("/businesses")
    };



    useEffect(() => {
        dispatch(getOneBusiness(id)).then(() => {
            setLoaded(true);

        })
        // helper()

    }, [dispatch, reviewsObj]); // review once review change, it re-run the  dispatch(getOneSpots(spotId))

    // const helper = async () => {
    //     let res = await dispatch(getOneBusiness(id))
    //         setLoaded(true);

    // if(!res.ok){
    //     // const body = await res.json()
    //     history.push("/")
    // }
    // }

    // console.log(spot) 
    // if (!user) {
    //     alert("Please log in/sign up before become a host!")
    //     history.push("/login")
    // }

    // useEffect(() => {
    //     const LoadingTimeOut = setTimeout(() => {

    //         setLoaded(true);

    //     }, 1000);



    //     return () => clearTimeout(LoadingTimeOut);

    // }, []);

    // useEffect(async () => {

    //     // setShowModal(false)

    // }, [showModal]);






    if (!loaded) {
        return <img className='loading_page' src={LoadingPic} alt='loading page' />
        // <>
        //     <h1>Business not found</h1>
        //     <img className='notFount' src={notFound} alt="Restaurant" />
        // </>
    }

    if (!business) {
        alert("Business not found, please search again!!!");
        history.push("/businesses")
    }

    return (
        <div>
            <div>
                <div>
                    <img className='Bis_img' src={business?.preview_img} alt="Restaurant"
                        onError={e => { e.currentTarget.src = "https://st2.depositphotos.com/2805411/8085/i/450/depositphotos_80851650-stock-photo-sketch-design-of-coffee-shop.jpg" }}
                    />
                </div>

                <div className='biz_detail_info_container'>

                    <div className='biz_detail_info_second_container'>
                        <div className='Biz_detail_name'>{business?.name}</div>
                        <div>
                            {business?.avgRating == 0 && <span>No Rating</span>}
                            {business?.avgRating >= 1 && business?.avgRating < 1.5 && (<i className="fa-solid fa-star bizDetail_star" />)}
                            {business?.avgRating >= 1.5 && business?.avgRating < 2 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star-half-stroke bizDetail_star" /></>)}
                            {business?.avgRating >= 2 && business?.avgRating < 2.5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /></>)}
                            {business?.avgRating >= 2.5 && business?.avgRating < 3 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star-half-stroke bizDetail_star" /></>)}
                            {business?.avgRating >= 3 && business?.avgRating < 3.5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /></>)}
                            {business?.avgRating >= 3.5 && business?.avgRating < 4 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star-half-stroke bizDetail_star" /></>)}
                            {business?.avgRating >= 4 && business?.avgRating < 4.5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /></>)}
                            {business?.avgRating >= 4.5 && business?.avgRating < 5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star-half-stroke bizDetail_star" /></>)}
                            {business?.avgRating == 5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /></>)}

                            <span className='total_review'>
                                {business?.countReview ? Number.parseFloat(business?.countReview).toFixed(0) : 0}  reviews
                            </span>
                        </div>
                        {/* <div>Phone Number: {business.phone}</div>
                        <div>Address: {business.address}</div> */}
                        {/* <div>Description: {business.description}</div> */}
                        <div>
                            <span className="claim"><i className="fa-regular fa-circle-check"></i> Claimed </span>
                            <span className="point"> • </span>
                            <span className='Biz_detail_discription'>  {business?.price_range}</span>
                        </div>
                        <div className='open_time_container'>
                            <span className='open'> Open</span>
                            <span className='time'> 10:00 AM - 10:00 PM</span>


                        </div>
                        <span className='edit_delete_biz_detail'>
                            {user?.id === business?.ownerId && (
                                <div className='delete_edit'>
                                    <NavLink className="edit_link_for_business" to={`/businesses/${business?.id}/edit`}><i className="fa-solid fa-pen-to-square"></i> Edit</NavLink>
                                    <button className='delete_bizDetail' onClick={deletebiz}> <i className="fa-solid fa-trash-can"></i> Delete</button>
                                </div>
                            )}
                        </span>
                    </div>
                    <div>
                    </div>
                </div>
                {/* <div className='create_Review_lnik_div'>{user?.id !== business?.ownerId && <NavLink className="create_Review_lnik" to={`/businesses/${business.id}/reviews`}><i className="fa-solid fa-pen-to-square"></i> Post Review </NavLink>}</div> */}
                <div className='create_Review_lnik_div'>{user?.id !== business?.ownerId && !reviews.filter(review => review?.user_id === user?.id).length && loaded && (<CreateReviewModal businessId={business?.id} />)} </div>

            </div>
            <div className='Phone_number_Address'>
                <div>
                    <div className='Overall_rating'>Overall rating : </div>

                    <div className='avg_rating_star_and_word'>
                        {business?.avgRating == 0 && <span>No Rating</span>}
                        {business?.avgRating >= 1 && business?.avgRating < 1.5 && (<i className="fa-solid fa-star bizDetail_star" />)}
                        {business?.avgRating >= 1.5 && business?.avgRating < 2 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star-half-stroke bizDetail_star" /></>)}
                        {business?.avgRating >= 2 && business?.avgRating < 2.5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /></>)}
                        {business?.avgRating >= 2.5 && business?.avgRating < 3 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star-half-stroke bizDetail_star" /></>)}
                        {business?.avgRating >= 3 && business?.avgRating < 3.5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /></>)}
                        {business?.avgRating >= 3.5 && business?.avgRating < 4 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star-half-stroke bizDetail_star" /></>)}
                        {business?.avgRating >= 4 && business?.avgRating < 4.5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /></>)}
                        {business?.avgRating >= 4.5 && business?.avgRating < 5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star-half-stroke bizDetail_star" /></>)}
                        {business?.avgRating == 5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /></>)}

                        <span className='total_avg_review'>(
                            {business?.countReview ? Number.parseFloat(business?.countReview).toFixed(0) : 0}  reviews)
                        </span>
                    </div>

                    <div className='star5_container'>
                        <div className='star5'>5 Stars  </div>
                        <div className='grey'>
                            {business?.reviews?.length ? <div style={{ width: `${business?.reviews?.filter((review) => review.stars === 5).length / business?.reviews.length * 100}%` }} className='star5_bar'></div> : <div className='empty_grey_bar'></div>}
                        </div>
                    </div>

                    <div className='star_container'>
                        <div className='star5'>4 Stars  </div>
                        <div className='grey'>
                            {business?.reviews?.length ? <div style={{ width: `${business?.reviews?.filter((review) => review.stars === 4).length / business?.reviews.length * 100}%` }} className='star4_bar'></div> : <div className='empty_grey_bar'></div>}
                        </div>
                    </div>

                    <div className='star_container'>
                        <div className='star5'>3 Stars  </div>
                        <div className='grey'>
                            {business?.reviews?.length ? <div style={{ width: `${business?.reviews?.filter((review) => review.stars === 3).length / business?.reviews.length * 100}%` }} className='star3_bar'></div> : <div className='empty_grey_bar'></div>}
                        </div>
                    </div>

                    <div className='star_container'>
                        <div className='star5'>2 Stars  </div>
                        <div className='grey'>
                            {business?.reviews?.length ? <div style={{ width: `${business?.reviews?.filter((review) => review.stars === 2).length / business?.reviews.length * 100}%` }} className='star2_bar'></div> : <div className='empty_grey_bar'></div>}
                        </div>
                    </div>

                    <div className='star_container'>
                        <div className='star5'>1 Stars  </div>
                        <div className='grey'>
                            {business?.reviews?.length ? <div style={{ width: `${business?.reviews?.filter((review) => review.stars === 1).length / business?.reviews.length * 100}%` }} className='star1_bar'></div> : <div className='empty_grey_bar'></div>}
                        </div>
                    </div>
                    <ReviewByBusiness showModal={showModal} setShowModal={setShowModal} businessId={business?.id} onHide={() => setShowModal(false)} />
                </div>
                <div className='biz_address_phone_container'>
                    <div className='biz_address'><i className="fa-solid fa-phone-volume" /> Phone Number : {business?.phone} </div>
                    <div className='biz_address'><i className="fa-solid fa-location-dot" /> Address : {business?.address} </div>
                    <div className='biz_address'><i className="fa-solid fa-file-lines" /> Description : {business?.description} </div>


                    {/* <div className='Overall_rating'>Overall rating : </div>

                    <div className='avg_rating_star_and_word'>
                        {business?.avgRating == 0 && <span>No Rating</span>}
                        {business?.avgRating >= 1 && business?.avgRating < 1.5 && (<i className="fa-solid fa-star bizDetail_star" />)}
                        {business?.avgRating >= 1.5 && business?.avgRating < 2 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star-half-stroke bizDetail_star" /></>)}
                        {business?.avgRating >= 2 && business?.avgRating < 2.5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /></>)}
                        {business?.avgRating >= 2.5 && business?.avgRating < 3 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star-half-stroke bizDetail_star" /></>)}
                        {business?.avgRating >= 3 && business?.avgRating < 3.5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /></>)}
                        {business?.avgRating >= 3.5 && business?.avgRating < 4 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star-half-stroke bizDetail_star" /></>)}
                        {business?.avgRating >= 4 && business?.avgRating < 4.5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /></>)}
                        {business?.avgRating >= 4.5 && business?.avgRating < 5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star-half-stroke bizDetail_star" /></>)}
                        {business?.avgRating == 5 && (<><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /><i className="fa-solid fa-star bizDetail_star" /></>)}

                        <span className='total_avg_review'>(
                            {business?.countReview ? Number.parseFloat(business?.countReview).toFixed(0) : 0}  reviews)
                        </span>
                    </div>

                    <div className='star5_container'>
                        <div className='star5'>5 Stars  </div>
                        <div className='grey'>
                            {business?.reviews.length ? <div style={{ width: `${business?.reviews.filter((review) => review.stars === 5).length / business?.reviews.length * 100}%` }} className='star5_bar'></div> : <div className='empty_grey_bar'></div>}
                        </div>
                    </div>

                    <div className='star_container'>
                        <div className='star5'>4 Stars  </div>
                        <div className='grey'>
                            {business?.reviews.length ? <div style={{ width: `${business?.reviews.filter((review) => review.stars === 4).length / business?.reviews.length * 100}%` }} className='star4_bar'></div> : <div className='empty_grey_bar'></div>}
                        </div>
                    </div>

                    <div className='star_container'>
                        <div className='star5'>3 Stars  </div>
                        <div className='grey'>
                            {business?.reviews.length ? <div style={{ width: `${business?.reviews.filter((review) => review.stars === 3).length / business?.reviews.length * 100}%` }} className='star3_bar'></div> : <div className='empty_grey_bar'></div>}
                        </div>
                    </div>

                    <div className='star_container'>
                        <div className='star5'>2 Stars  </div>
                        <div className='grey'>
                            {business?.reviews.length ? <div style={{ width: `${business?.reviews.filter((review) => review.stars === 2).length / business?.reviews.length * 100}%` }} className='star2_bar'></div> : <div className='empty_grey_bar'></div>}
                        </div>
                    </div>

                    <div className='star_container'>
                        <div className='star5'>1 Stars  </div>
                        <div className='grey'>
                            {business?.reviews.length ? <div style={{ width: `${business?.reviews.filter((review) => review.stars === 1).length / business?.reviews.length * 100}%` }} className='star1_bar'></div> : <div className='empty_grey_bar'></div>}
                        </div>
                    </div> */}
                    <div>
                        {business && googleMapKeyHelper && loaded && googleMap(business.lat, business.lng, googleMapAPIKey)}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default BusinessDetail

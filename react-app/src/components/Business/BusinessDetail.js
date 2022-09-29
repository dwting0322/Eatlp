import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useHistory, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBusiness, getOneBusiness } from '../../store/business';
import notFound from '../../Picture/404-error-page-not-found.jpg'
import './Business.css'


function BusinessDetail() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useHistory()

    const user = useSelector((state) => state.session.user);


    const business = useSelector(state => state.businesses[id])
    //   const review = useSelector(state => state.reviews) // wait untiul we have review
    //   console.log("review: ", review)
    // const user = useSelector(state=> state.session.user)

    const deletebiz =  () => {
        dispatch(deleteBusiness(business.id));
        alert("I have successfully eaten the comment for you!!!");
    };


    useEffect(() => {
        dispatch(getOneBusiness(id))
    }, [dispatch,]); // review once review change, it re-run the  dispatch(getOneSpots(spotId))

    // console.log(spot)

    if (!business) {
        return (
            <>
                <h1>Business not found</h1>
                <img className='notFount' src={notFound} alt="Restaurant" />
            </>
        )
    }

    return (
        <div>
            <div>
                <div>
                    <img className='Bis_img' src={business.preview_img} alt="Restaurant" 
                      onError={e => { e.currentTarget.src = "https://st2.depositphotos.com/2805411/8085/i/450/depositphotos_80851650-stock-photo-sketch-design-of-coffee-shop.jpg"}}
                    />
                </div>

                <div>
                    <div>
                        <div>
                       {user.id === business.ownerId && (
                        <div>
                       <NavLink className="" to={`/businesses/${business.id}/edit`}><i className="fa-solid fa-pen-to-square"></i> Edit</NavLink>
                       <button className='' onClick={deletebiz}> <i className="fa-solid fa-trash-can"></i> Delete</button>
                       </div>
                      )}
                      </div>
                        <div>Name: {business.name}</div>
                        <div>Phone Number: {business.phone}</div>
                        <div>Address: {business.address}</div>
                        <div>Description: {business.description}</div>
                        <div>{business.price_range}</div>
                        <div>Open 10:00 AM - 10:00 PM</div>
                    </div>
                    <div>
                        {business.avgRating ? Number.parseFloat(business.avgRating).toFixed(2) : 0} rating
                    </div>
                    <div>
                        {business.countReview ? Number.parseFloat(business.countReview).toFixed(0) : 0} reviews
                    </div>
                    <div>Recommended Reviews</div>
                </div>
            </div>



        </div>
    )
}

export default BusinessDetail

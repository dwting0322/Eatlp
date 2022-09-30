import React from 'react';
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getAllBusiness } from '../../store/business';



function BusinessBrower() {

    const businessObj = useSelector((state) => state.businesses)

    const businesses = Object.values(businessObj)

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllBusiness());
    }, [dispatch]);

    // if (!businesses) return null

    return (
        <>
        <h1 className='Suggested_word'>Suggested Restaurant for you</h1>
        <div className='Biz_Brower_outter'>
           

            {businesses.map(business => (

                <div className='Biz_Brower_container' key={business.id}>

                    <div className='Brower_img'>
                        <NavLink  to={`/businesses/${business.id}`}>
                            <img className='Biz_Restaurant_Img' src={business.preview_img} alt="Restaurant"
                                onError={e => { e.currentTarget.src = "https://st2.depositphotos.com/2805411/8085/i/450/depositphotos_80851650-stock-photo-sketch-design-of-coffee-shop.jpg" }}
                            />
                        </NavLink>
                    </div>
                    <NavLink className='Brower_link' to={`/businesses/${business.id}`}>
                    <div className='Brower_info'>
                        
                        <div className='business_name'>{business.name}</div>
                        <div className='business_phone'>{business.phone}</div>
                        <div className='business_address'>{business.address}</div>
                        <div className='business_description'>{business.description}</div>
                        <div className='business_price_range'>{business.price_range}</div>
                        {/* <div>
                        {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0}
                        </div> */}
                    </div>
                    </NavLink>
                </div>
                
            ))}
           
        </div>
        <h1 className='Recent_word'>Recent Activity</h1>
        </>
    )
    
}

export default BusinessBrower

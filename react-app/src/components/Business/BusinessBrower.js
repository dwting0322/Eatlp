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
        <div className='test'>
            <h1>Suggested Restaurant for you</h1>

        {businesses.map(business => (
            <div key={business.id}>
                <div>
                    <NavLink to={`/businesses/${business.id}`}>
                        <img src={business.preview_img} alt="Restaurant" 
                        onError={e => { e.currentTarget.src = "https://st2.depositphotos.com/2805411/8085/i/450/depositphotos_80851650-stock-photo-sketch-design-of-coffee-shop.jpg"}}
                        />
                    </NavLink>
                </div>

                <div>
                    <div>
                        <div>{business.name}</div>
                        <div>{business.phone}</div>
                        <div>{business.address}</div>
                        <div>{business.description}</div>
                        <div>{business.price_range}</div> 
                    </div>
                    {/* <div>
                      
                        {spot.avgRating ? Number.parseFloat(spot.avgRating).toFixed(2) : 0}
                    </div> */}
                </div>
            </div>
        ))}
    </div>
    )
}

export default BusinessBrower

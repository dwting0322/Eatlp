import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBusiness, editBusiness } from '../../store/business';



function BizForm({ business, formType }) {

    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    //   const [city, setCity] = useState(business.city || "")
    //   const [state, setState] = useState(business.state || "")
    //   const [country, setCountry] = useState(business.country || "")
    //   const [lat, setLat] = useState(spbusinessot.lat || "")
    //   const [lng, setLng] = useState(business.lng || "")
    //   const [zipcode, setzipcode] = useState(business.lng || "")
    const [name, setName] = useState(business?.name || "")
    const [phone, setPhone] = useState(business?.phone || "")
    const [address, setAddress] = useState(business?.address || "")
    const [description, setDescription] = useState(business?.description || "")
    const [price_range, setPrice_range] = useState(business?.price_range || "")
    const [preview_img, setPreview_img] = useState(business?.preview_img || "")
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);



    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) {
            return alert("Cannot Submit");
        }
        if (!user) alert("Please log in/sign up before become a host!")
        

        business = {
            ...business,
            //   city,
            //   state,
            //   country,
            //   lat,
            //   lng,
            address,
            phone,
            name,
            description,
            price_range,
            preview_img,
        };

        if (formType === "Create Business") {
            const newBusiness = await dispatch(createBusiness(business))
            if (newBusiness) history.push(`/businesses/${newBusiness.id}`);

        } else {
           
            dispatch(editBusiness(business))
           
            history.push(`/businesses/${business.id}`);
        }

        //   console.log("spot from SpotForm: ",spot)

        setPreview_img('');
        setAddress('');
        // setCity('');
        // setState('');
        // setCountry('');
        // setLat('');
        // setLng('');
        setName('');
        setDescription('');
        setPhone('');
        setPrice_range('');
        setValidationErrors([]);
        setHasSubmitted(false);
        //   history.push(`/`);

    };

    // useEffect(() => {
    //     dispatch(dispatch(getAllBusiness()))
    // }, [dispatch])


    useEffect(() => {
        let errors = [];
       
        if (address.includes(".") ) {
            errors.push("Street address can't include a period");
        }

        if (address.length < 5 || address.length > 255) {
            errors.push("Street address must be between 5 and 255 characters");
        }

        if (phone.length > 12) {
            errors.push("Phone number must be 10 digit (ex: 123-456-7890)");
        }

        if (!phone.match('[0-9]{3}-[0-9]{3}-[0-9]{4}')) {
            errors.push("Phone number must be 10 valid digit number (ex: 123-456-7890)");
        }

        if (name.length > 50 || name.length < 1) {
            errors.push("Name must be between 1 and 50 characters");
        }   

        if (name === "." ) {
            errors.push("Name can't just be a period");
        }

        if (description.length < 5 || description.length > 500) {
            errors.push("Description must be between 5 and 500 characters");
        }
        
        // if (!city.length) {
        //   errors.push("City is required");
        // }
        // if (!state.length) {
        //   errors.push("State is required");
        // }
        // if (!country.length) {
        //   errors.push("Country is required");
        // }
        // if (!lat) {
        //   errors.push("Latitude is not valid");
        // }
        // if (lat > 90 || lat < -90) {
        //   errors.push("Latitude must between -90 ~ 90");
        // }
        // if (!lng) {
        //   errors.push("Longitude is not valid");
        // }
        // if (lng > 180 || lat < -180) {
        //   errors.push("Longitude must between -180 ~ 180");
        // }

        if (preview_img.length > 500) {
            errors.push("Image's url must less than 500 characters");
        }

        if (
            !preview_img?.includes("jpg") &&
            !preview_img?.includes("jpeg") &&
            !preview_img?.includes("png")
        ) {
            errors.push("Please use jpg, jpeg or png");
        }

        setValidationErrors(errors);

    }, [address, name, phone, description, price_range, preview_img]);

    if (!user){
        alert("Please log in/sign up before become a host!")
        history.push("/login")
    } 


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <ul className="Form_errors">
                        {hasSubmitted &&
                            validationErrors.map((error) => (
                                <li className="Form_list_error" key={error}>
                                    {error}
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="">
                    <label>
                        * Address:
                        <input className=''
                            type="text"
                            placeholder="Address..."
                            required
                            autoFocus
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        />
                    </label>
                </div>

                <div className="">
                    <label className="">
                       * Phone Number:
                        <input
                            className=""
                            type="text"
                            placeholder="Phone Number..."
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </label>
                </div>

                <div className="">
                    <label>
                        * Name:
                        <input className=""
                            type="text"
                            placeholder="Restaurant name..."
                            required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </label>
                </div>

                <div className="Create_spot_Description">
                    <label>
                        * Description:
                        <textarea className='Create_spot_textarea'
                            type="text"
                            placeholder="description..."
                            required
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </label>
                </div>

                <div className="">
                    <label>
                       * Price Range:
                        <select 
                        value={price_range}
                        onChange={e => setPrice_range(e.target.value)}  
                        required>
                            <option value="$">$</option>
                            <option value="$$">$$</option>
                            <option value="$$$">$$$</option>
                            <option value="$$$$">$$$$</option>
                        </select>
                        
                    </label>
                </div>

                <div className="">
                    <label className="label_input">
                        * Preview_img:
                        <input
                            className=""
                            type="text"
                            placeholder="Image url... .jpg / .jpeg / .png"
                            required
                            value={preview_img}
                            onChange={(e) => setPreview_img(e.target.value)}
                        />
                    </label>
                </div>
                <input className="" type="submit" value={formType} />
            </form>

        </div>
    )
}

export default BizForm

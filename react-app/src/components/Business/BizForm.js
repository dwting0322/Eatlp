import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBusiness, editBusiness, getOneBusiness } from '../../store/business';



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
    const [price_range, setPrice_range] = useState(business?.price_range || "$")
    const [preview_img, setPreview_img] = useState(business?.preview_img || "")
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
  

    const {businessId} = useParams()
 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) {
            return alert("Cannot Submit");
        }
        if (!user) alert("Please log in/sign up before become a host!")

        
        const myBusiness = {
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
            const newBusiness = await dispatch(createBusiness(myBusiness))
            if (newBusiness) history.push(`/businesses/${newBusiness.id}`);

        } else {

            dispatch(editBusiness(myBusiness))
            history.push(`/businesses/${myBusiness.id}`);
        }

        
    };

    useEffect(async () => {
        if (businessId) {
         
            const testBusiness = await dispatch(getOneBusiness(businessId))
         
            const bizData = testBusiness.business

            setName(bizData.name);
            setAddress(bizData.address);
            setPhone(bizData.phone);
            setDescription(bizData.description);
            setPrice_range(bizData.price_range);
            setPreview_img(bizData.preview_img);
        }
      }, [dispatch, businessId]);



    useEffect(() => {
        let errors = [];

        if (address.includes(".")) {
            errors.push("Street address can't include a period");
        }

        if (address.length < 5 || address.length > 50) {
            errors.push("Street address must be between 5 and 50 characters");
        }

        if (phone.length > 12) {
            errors.push("Phone number must be 10 digit (ex: 123-456-7890)");
        }

        if (!phone.match('[0-9]{3}-[0-9]{3}-[0-9]{4}')) {
            errors.push("Phone number must be 10 valid digit number (ex: 123-456-7890)");
        }

        if (name.length > 25 || name.length < 3) {
            errors.push("Name must be between 3 and 25 characters");
        }

        if (name === ".") {
            errors.push("Name can't just be a period");
        }

        if (description.length < 5 || description.length > 50) {
            errors.push("Description must be between 5 and 50 characters");
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

    if (!user) {
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
                <div className='fomr_and_pic_container'>

                    <div className="form_container">

                       { formType === "Create Business" && (<>
                            <h1 className="create_form_word">Hello! Let’s start with your business information</h1>
                            <div className='create_form_word2'>We’ll use this information to help you claim your Eatlp page. Your business will come up automatically if it is already listed.</div>
                      </> )} 
                      { formType === "Update Business" && (<div>
                            <h1 className="create_form_word">Hello! Let’s edit with your business information</h1>
                            <div className='create_form_word2'>We’ll use this information to help you claim your Eatlp page. Your business will come up automatically if it is already listed.</div>
                      </div> )} 
                        <div>
                            <label>
                                <div className='name'>* Name :</div>
                                <input className="form_input"
                                    type="text"
                                    placeholder="Business name..."
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="Address_div">
                            <label>
                                <div className='Address'>* Address :</div>
                                <input className='form_input'
                                    type="text"
                                    placeholder="Address..."
                                    required
                                    autoFocus
                                    value={address}
                                    onChange={e => setAddress(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="Phone_div">
                            <label className="Phone">
                                <div>* Phone Number : (ex: 123-456-7890) </div>
                                <input
                                    className="form_input"
                                    type="text"
                                    placeholder="ex: 123-456-7890..."
                                    required
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="Create_spot_Description">
                            <label>
                                <div className='Description'>* Description :</div>
                                <textarea className='Description_textarea'
                                    type="text"
                                    placeholder="Description..."
                                    required
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </label>
                        </div>

                        <div className="">
                            <label>
                                <div className='Price'>* Price Range :</div>
                                <select className='Price_select'
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
                                <div className='Preview_img'>* Preview Image :</div>
                                <input
                                    className="form_input"
                                    type="text"
                                    placeholder="Image url... .jpg / .jpeg / .png"
                                    required
                                    value={preview_img}
                                    onChange={(e) => setPreview_img(e.target.value)}
                                />
                            </label>
                        </div>
                        <input className="submit" type="submit" value={formType} />
                    </div>

                    <div className='img_container'>
                        <div> <img className='img_1' src="https://s3-media0.fl.yelpcdn.com/assets/public/cityscape_300x233_v2.yji-deccc3d10e15b4494be1.svg" /> </div>
                        <div className='pic_and_word_order'>
                            <img className='img_2' src="https://s3-media0.fl.yelpcdn.com/assets/public/default_biz_avatar_68x68_v2@2x.yji-712bb14a8601910d7e50.png" />
                            <div className='pic_name_address_phone'>
                                {/* <input className="pic_input"
                                    type="text"
                                    disabled="disabled"
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                /> */}
                                <div>
                                    {!name && (<div className='name_not_in_pic'>Your Business Name</div>)}
                                    {name && (<div className='name_in_pic'>{name}</div>)}
                                </div>
                                <div>
                                    {!address && (<div className='address_not_in_pic'>Your Business Address</div>)}
                                    {address && (<div className='address_in_pic'>{address}</div>)}
                                </div>
                                <div>
                                    {!phone && (<div className='phone_not_in_pic'>Your Business Number</div>)}
                                    {phone && (<div className='phone_in_pic'>{phone}</div>)}
                                </div>
                            </div>
                        </div>
                        <div> <img className='img_3' src="https://s3-media0.fl.yelpcdn.com/assets/public/searching_on_map_234x177_v2.yji-0b5da3ce1e6a636298be.svg" /> </div>
                    </div>

                </div>
            </form>

        </div>
    )
}

export default BizForm

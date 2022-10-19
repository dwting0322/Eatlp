import React, { useEffect, useState } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUserProfile } from "../../store/profile";
import "./ProfilePage.css"
import { getOwnerBusiness } from "../../store/business";
import LoadingPic from '../../Picture/pizzaLoadingPage.gif'



const ProfilePage = () => {
  const history = useHistory();
  let { userId } = useParams();
  userId = Number(userId);
  const dispatch = useDispatch();
  const [isloaded, setIsloaded] = useState(false)

  const user = useSelector((state) => state.session.user);
  const userBizObj = useSelector((state) => state.businesses);
  let userBiz
  if (userBizObj) userBiz = Object.values(userBizObj)


  const profile = useSelector((state) => state.profile.profile);

  const helper = async () => {
    const userProfile = await dispatch(loadUserProfile(userId));

    const res = await dispatch(getOwnerBusiness())
      .then(() => {
        setIsloaded(true);
      })

  };


  const handleEditProfile = (e, userId) => {
    e.preventDefault();
    history.push(`/profile/edit/${userId}`);
  };




  useEffect(() => {
    helper();
  }, [dispatch, userId]);

  if (!isloaded) {
    return <img className='loading_page' src={LoadingPic} alt='loading page' />
  }

  return isloaded && (
    <div className="Profile_outter_container">
      <div className="Profile_container">
        <div>
          <div>
            <img className="profilePage_img" src={profile?.profile_img}
              onError={e => { e.currentTarget.src = "https://s3-media0.fl.yelpcdn.com/photo/u_4AtMdPnNBQgn5fWEyTnw/ss.jpg" }}
            />
          </div>
          <button onClick={(e) => handleEditProfile(e, profile?.id)} className="Edit_profile">
            <i className="fa-solid fa-pen-to-square"></i> Edit profile
          </button>
        </div>
        <div className="second_container">

          {/* <button onClick={(e) => handleEditProfile(e, profile?.id)} className="Edit_profile">
            <i className="fa-solid fa-pen-to-square"></i> Edit profile
          </button> */}

          <div className="word_container">

            <div className="First">
              First Name:
            </div>
            <div className="First">
              {profile?.first_name}
            </div>
          </div>

          <div className="word_container">
            <div className="Last">
              Last Name:
            </div>
            <div className="Last">
              {profile?.last_name}
            </div>
          </div>

          <div className="word_container">
            <div className="Gender">
              Gender:
            </div>
            {profile?.gender ?
              <div className="Gender">
                {profile?.gender}
              </div> : <div>You have no edit your gender yet</div>}
          </div>

          <div className="word_container">
            <div className="Bio">
              Bio:
            </div>
            {profile?.bio ?
              (<div className="Bio1">{profile?.bio}</div>) : (<div>You have not edit your bio yet</div>)}
          </div>

        </div>
        {/* <button onClick={(e) => handleEditProfile(e, profile?.id)} className="Edit_profile">
          <i className="fa-solid fa-pen-to-square"></i> Edit profile
        </button> */}

      </div>
      <hr className="line1"></hr>
      <div className="business"><i className="fa-solid fa-utensils" /> My Businesses</div>

      {userBiz.length ? <div className="business_img_in_profile_container">
        {userBiz.map(business => (

          <div key={business.id}>
            <NavLink to={`/businesses/${business.id}`}>
              <img className="business_img_in_profile" src={business.preview_img}></img>
            </NavLink>
          </div>

        ))}
      </div> : <div className="no_business">You currently have no any business, want to create one ?
        <NavLink to={`/businesses/new`} className="profile_create_business">
          Create Business
        </NavLink>

      </div>}

    </div>

  );

}

export default ProfilePage;
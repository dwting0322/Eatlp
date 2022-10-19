import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUserProfile } from "../../store/profile";
import "./ProfilePage.css"

const ProfilePage = () => {
  const history = useHistory();
  let { userId } = useParams();
  userId = Number(userId);

  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  // const userBizObj = useSelector((state) => state.businesses);
  // console.log("userBizObj", userBizObj)

  const profile = useSelector((state) => state.profile.profile);



  useEffect(() => {
    dispatch(loadUserProfile(userId));
  }, [dispatch, userId]);

  return (
    <div className="Profile_outter_container">
    <div className="Profile_container">
      <div>
        <img className="profilePage_img" src={profile?.profile_img}
          onError={e => { e.currentTarget.src = "https://s3-media0.fl.yelpcdn.com/photo/u_4AtMdPnNBQgn5fWEyTnw/ss.jpg" }}
        />
      </div>
      <div className="second_container">

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
            <div className="Bio">
              {profile?.bio}
            </div> : <div>You have not edit your bio yet</div>}
        </div>
      
      </div>
      
    </div>
    <hr className="line1"></hr>
    <div className="business"><i className="fa-solid fa-utensils"/> Businesses</div>



    </div>
    
  );

}

export default ProfilePage;
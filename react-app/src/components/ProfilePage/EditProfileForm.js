import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editUserProfile, loadUserProfile } from '../../store/profile';
import "./ProfilePage.css"


function EditProfileForm() {

    const dispatch = useDispatch();
    const history = useHistory();
    let { userId } = useParams();
    userId = Number(userId);
    const profile = useSelector((state) => state.profile.profile);

    const [first_name, setFirst_name] = useState(profile?.first_name || "")
    const [last_name, setLast_name] = useState(profile?.last_name || "")
    const [bio, setBio] = useState(profile?.bio || "");
    const [gender, setGender] = useState(profile?.gender || "");
    const [profile_img, setProfile_img] = useState(profile?.profile_img || "");
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);


    const redirectBack = (e) => {
        e.preventDefault();
        history.push(`/profile/${userId}`);
    };

    useEffect(async () => {

        if (userId) {

            const userProfile = await dispatch(loadUserProfile(userId))
            const userProfileData = userProfile.profile

            setFirst_name(userProfileData.first_name);
            setLast_name(userProfileData.last_name);
            setBio(userProfileData.bio);
            setGender(userProfileData.gender);
            setProfile_img(userProfileData.profile_img);

        }
    }, [dispatch, userId]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true);
        if (validationErrors.length > 0) {
            return alert("Cannot Submit");
        }
        if (!userId) {
            alert("Please log in before see your current profile!")
            history.push("/login")
        }

        let edittedData = {
            first_name,
            last_name,
            bio,
            gender,
            profile_img,
        };

        //    console.log("edittedData", edittedData)

        const edittedProfile = await dispatch(editUserProfile(userId, edittedData)) // updates state.profile.profile
        // console.log("edittedProfile", edittedProfile)
        history.push(`/profile/${userId}`);
    }

    useEffect(() => {
        let errors = [];

        if (first_name?.length > 25) {
            errors.push("FirstName must be between 1 and 25 characters");
        }

        if (last_name?.length > 25) {
            errors.push("LastName must be between 1 and 25 characters");
        }

        if (bio?.length > 255) {
            errors.push("Bio can't over 255 characters");
        }

        if (gender?.length > 25) {
            errors.push("Gender can't over 25 characters");
        }

        if (
            !profile_img?.includes("jpg") &&
            !profile_img?.includes("jpeg") &&
            !profile_img?.includes("png")
        ) {
            errors.push("Please provide validate url form jpg, jpeg or png");
        }

        setValidationErrors(errors);
    }, [profile_img, gender, bio, first_name, last_name]);


    if (!userId) {
        alert("Please log in before see your current profile!")
        history.push("/login")
    }


    return (
        <div>
            <form onSubmit={handleSubmit} >

                <ul className="errors_ul">
                    {hasSubmitted && validationErrors.map(error => (
                        <li className='Review_errorsList' key={error}>
                            {error}
                        </li>
                    ))}
                </ul>
                <div className='edit_profile_container'>
                    <div className="profilePreview">
                        <img className="profilePicEdit" src={profile_img} alt="profile image"
                            onError={e => { e.currentTarget.src = "https://s3-media0.fl.yelpcdn.com/photo/u_4AtMdPnNBQgn5fWEyTnw/ss.jpg" }}
                        ></img>
                        <div className="profilePreviewName">{first_name}</div>
                        <div className="profilePreviewName">{last_name}</div>
                        <div className="profilePreviewBio">"{bio}"</div>
                    </div>
                    <div className='edit_input_container'>
                        <div className='edit_title'>Edit Profile</div>
                        <label>
                            <span className='firstName'>First Name:</span>
                            <input className='edit_input'
                                type="text"
                                placeholder="First Name"
                                value={first_name}
                                onChange={(e) => setFirst_name(e.target.value)}
                                required
                                maxlength="25"
                            />
                        </label>

                        <label>
                            <span className='lastName'>Last Name:</span>
                            <input className='edit_input'
                                type="text"
                                placeholder="Last Name"
                                value={last_name}
                                onChange={(e) => setLast_name(e.target.value)}
                                required
                                maxlength="25"
                            />
                        </label>

                        <label>
                            <span className='edit_Gender'>Gender:</span>
                            <input className='edit_input'
                                type="text"
                                placeholder="Gender"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                maxlength="25"
                            />
                        </label>

                        <label>
                            <span className='edit_Bio'>Bio:</span>
                            <input className='edit_input'
                                type="text"
                                placeholder="Bio"
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                maxlength="225"
                            />
                        </label>

                        <label>
                            <span className='edit_Profile_Image'>Profile Image:</span>
                            <input className='edit_input'
                                type="text"
                                placeholder="Profile Image URL"
                                value={profile_img}
                                onChange={(e) => setProfile_img(e.target.value)}

                            />
                        </label>

                        <div className="editProfileButton">
                            <button className="backButton" onClick={redirectBack}>
                            <i className="fa-solid fa-power-off"></i>  Cancel
                            </button>
                            <button className="editProfileButton" type="submit">
                            <i className="fa-solid fa-pen-to-square pen"></i> Edit Profile
                            </button>
                        </div>

                    </div>
                </div>
            </form>


        </div>
    )
}

export default EditProfileForm

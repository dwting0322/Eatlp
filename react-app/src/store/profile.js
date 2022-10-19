//Types:
const LOAD_USERPROFILE = "userprofile/LOAD_USERPROFILE";
const EDIT_USERPROFILE = "userprofile/EDIT_USERPROFILE";



//Action Creators:
const loadProfile = ( profile) => {
    return {
      type: LOAD_USERPROFILE,
      // business,
      profile,
    };
  };
  
  const editProfile = (profile) => {
    return {
      type: EDIT_USERPROFILE,
      profile,
    };
  };

  
//Thunks:
export const loadUserProfile = (userId) => async (dispatch) => {
    const res = await fetch(`/api/profile/${userId}`);
   
    if (res.ok) {
      const data = await res.json();
     
       const profile = dispatch(loadProfile( data.profile));
  
      return profile
    }
  };
  
  export const editUserProfile = (userId, profile) => async (dispatch) => {
    const response = await fetch(`/api/profile/edit/${userId}`,{
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(profile),
  });
    // console.log("response in thunk", response)
    if (response.ok) {
      const editedUserProfile = await response.json();
    
      const test = dispatch(editProfile(editedUserProfile));
    console.log("test", test)
      return test;

    } else if (response.status < 500) {
      const data = await response.json();
      if (data.errors) {
        return data;
      }
    }  else {
      
      return ["An error occurred. Please try again."];
    }
    return response;
    };
  
  
  //Initial State:
  const initialState = {};
  
  //Reducer:
  const userProfileReducer = (state = initialState, action) => {
    let newState = {};
    switch (action.type) {
      case LOAD_USERPROFILE:{
        newState = { ...state };
        newState.profile = action.profile;
        return newState;
      }

      case EDIT_USERPROFILE:{
        newState = { ...state };
        console.log("action.profile ",action.profile)
        // newState = action.userId;
        newState.profile = action.profile;
        console.log("newState ",newState)
        return newState
      }

      default:
        return state;
    }
  };
  
  export default userProfileReducer;
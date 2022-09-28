//type:
const LOAD_ALL_BUSINESS = "businesses/loadBusiness";
const LOAD_ONE_BUSINESS = "businesses/loadOneBusiness";
const READ_OWNER_BUSINESS = "businesses/readOwnerBusiness";
const ADD_BUSINESS = "businesses/addBusiness";
const UPDATE_BUSINESS = "businesses/updateBusiness";
const DELETE_BUSINESS = "businesses/deleteBusiness";


//action creator
//get all business action
const loadAllBusiness = (business) => {
    return {
        type: LOAD_ALL_BUSINESS,
        business,
    }
};


//get one business action
const loadOneBusiness = (business) => {
    return {
        type: LOAD_ONE_BUSINESS,
        business,
    }
};


//get current owner business action
const readOwnerBusiness = (business) => {
    return {
        type: READ_OWNER_BUSINESS,
        business,
    }
};


// create business action
const addBusiness = (business) => {
    return {
        type: ADD_BUSINESS,
        business,
    }
};


// update business action
const updateABusiness = (business) => {
    return {
        type: UPDATE_BUSINESS,
        business,
    }
};


const deleteABusiness = (business) => {
    return {
        type: DELETE_BUSINESS,
        business,
    }
};


// thunk 
// Get all business 
  export const getAllBusiness = () => async (dispatch) => {
    const response = await fetch(`/api/businesses`);
    if (response.ok) {
      const data = await response.json();
      // console.log("***********THIS IS THE DATA.POSTS *************", data.posts);
      dispatch(loadAllBusiness(data.businesses)); 
      return data;
    }
    return response;
  };

// Get all business of Current User
  export const getOwnerBusiness = () => async (dispatch) => {
    const response = await fetch(`/api/businesses/current`);
    if (response.ok) {
      const data = await response.json();
      dispatch(readOwnerBusiness(data.current_business)); 
      return data;
    }
    return response;
  };

// Get one business by business ID
  export const getOneBusiness = (id) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${id}`);
    if (response.ok) {
      const data = await response.json();
      dispatch(loadOneBusiness(data)); 
      return data;
    }
    return response;
  };

// Create a new business
  export const createBusiness = (newPostInfo) => async (dispatch) => {
    const response = await fetch("/api/businesses/new_business", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newPostInfo),
    });
    if (response.ok) {
      const business = await response.json();
      dispatch(addBusiness(business));
      return business;
    }
    return response;
  };


  // Edit a business
  export const editBusiness = (data) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${data.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const editBusiness = await response.json();
      dispatch(updateABusiness(editBusiness));
      return editBusiness;
    }
    return response;
  };


//Delete Business
  export const deleteBusiness = (businessId) => async (dispatch) => {
    const response = await fetch(`/api/posts/${businessId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(deleteABusiness(businessId));
    }
    return response;
  };



  
//Initial State:
const initialState = {};

//Reducer:
const businessReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {

    case LOAD_ALL_BUSINESS: {
        action.business.forEach((business) => {
        newState[business.id] = business;
        });
        return newState;
    }
   
    case LOAD_ONE_BUSINESS: {
        newState = { ...state };
        newState[action.business.id] = action.business;
        return newState;
    }

    case READ_OWNER_BUSINESS: {
        action.business.forEach((business) => {
        newState[business.id] = business;
        });
        return newState;
    }
    
    case ADD_BUSINESS: {
        newState = { ...state };
        newState[action.post.id] = action.post;
        return newState;
    }

    case UPDATE_POST: {
        newState = { ...state };
        newState[action.post.id] = action.post;
        return newState;
    }

    case DELETE_POST: {
        newState = { ...state };
        delete newState[action.postId];
        return newState;
    }

    default:
        return state;
  }
};

export default businessReducer;
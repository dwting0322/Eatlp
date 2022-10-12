//type:
const LOAD_ALL_BUSINESS = "businesses/loadAllBusiness";
const LOAD_ONE_BUSINESS = "businesses/loadOneBusiness";
const READ_OWNER_BUSINESS = "businesses/readOwnerBusiness";
const ADD_BUSINESS = "businesses/addBusiness";
const UPDATE_BUSINESS = "businesses/updateBusiness";
const DELETE_BUSINESS = "businesses/deleteBusiness";


//action creator
//get all business action
const loadAllBusiness = (businesses) => {
    return {
        type: LOAD_ALL_BUSINESS,
        businesses,
    }
};


//get one business action
const loadOneBusiness = (businesses) => {
    return {
        type: LOAD_ONE_BUSINESS,
        businesses,
    }
};


//get current owner business action
const readOwnerBusiness = (businesses) => {
    return {
        type: READ_OWNER_BUSINESS,
        businesses,
    }
};


// create business action
const addBusiness = (businesses) => {
    return {
        type: ADD_BUSINESS,
        businesses,
    }
};


// update business action
const updateABusiness = (businesses) => {
    return {
        type: UPDATE_BUSINESS,
        businesses,
    }
};


const deleteABusiness = (id) => {
    return {
        type: DELETE_BUSINESS,
        id,
    }
};


// thunk 
// Get all business thunk
  export const getAllBusiness = () => async (dispatch) => {
    const response = await fetch(`/api/businesses`);
    // console.log("***********response *************", response);
    if (response.ok) {
      const data = await response.json();
    //   console.log("***********Get all business DATA *************", data.businesses);
      dispatch(loadAllBusiness(data.businesses)); 
      return data;
    }
    return response;
  };

// Get all business of Current User thunk
  export const getOwnerBusiness = () => async (dispatch) => {
    const response = await fetch(`/api/businesses/current`);
    if (response.ok) {
      const data = await response.json();
      dispatch(readOwnerBusiness(data.current_business)); 
      return data;
    }
    return response;
  };

// Get one business by business ID thunk
  export const getOneBusiness = (id) => async (dispatch) => {
    
    const response = await fetch(`/api/businesses/${id}`);
    // console.log("response*****************", response)
    if (response.ok) {
      const data = await response.json();
      // console.log("data*****************", data)
      dispatch(loadOneBusiness(data.business)); 
      return data;
    }
    return response;
  };

// Create a new business thunk
  export const createBusiness = (newPostInfo) => async (dispatch) => {
    const response = await fetch("/api/businesses/new_business", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(newPostInfo),
    });
  
    if (response.ok) {
      const newBusiness = await response.json();
      dispatch(addBusiness(newBusiness));
      return newBusiness;
    }
    return response;
  };


  // Edit a business thunk
  export const editBusiness = (data) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${data.id}`, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data),
    });
  console.log("response", response)
    if (response.ok) {
      const edittedBusiness = await response.json();

      // console.log("edittedBusiness", edittedBusiness)

      dispatch(updateABusiness(edittedBusiness));
      return edittedBusiness;
    }
    return response;
  };


//Delete Business thunk
  export const deleteBusiness = (businessId) => async (dispatch) => {
    // console.log("businessId", businessId)
    const response = await fetch(`/api/businesses/${businessId}`, {
      method: "DELETE",
    });
    // console.log("response", response)
    if (response.ok) {
      dispatch(deleteABusiness(businessId));
    }
    // return response;
  };



//Initial State:
const initialState = {};

//Reducer:
const businessReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {

    case LOAD_ALL_BUSINESS: {
        action.businesses.forEach((business) => {
        newState[business.id] = business;
        });
        return newState;
    }
   
    case LOAD_ONE_BUSINESS: {
        newState = { ...state };
        newState[action.businesses.id] = action.businesses;
        return newState;
    }

    case READ_OWNER_BUSINESS: {
        action.businesses.forEach((business) => {
        newState[business.id] = business;
        });
        return newState;
    }
    
    case ADD_BUSINESS: {
        newState = { ...state };
        newState[action.businesses.id] = action.businesses;
        return newState;
    }

    case UPDATE_BUSINESS: {
        newState = { ...state };
            // console.log("action.businesses  ", action.businesses)
        newState[action.businesses.id] = action.businesses;
            // console.log("newState from  edit business reducer after ", newState)
        return newState;
    }

    case DELETE_BUSINESS: {
        newState = { ...state };
        delete newState[action.id];
        return newState;
    }

    default:
        return state;
  }
};

export default businessReducer;
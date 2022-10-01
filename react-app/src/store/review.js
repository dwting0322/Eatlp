
//type:
const LOAD_ALL_REVIEW = "review/getAllReview";
const LOAD_ALL_REVIEW_BUSINESS_ID = "review/getAllReviewByBusinessId";
const LOAD_ONE_REVIEW = "review/getOneReview";
// const READ_OWNER_REVIEW = "review/getAllReviewByUser";
const CREATE_REVIEW = "review/createReview";
const UPDATE_REVIEW = "review/updateReview";
const DELETE_REVIEW = "review/deleteReview";



//Action Creators:

//Get all review action
const loadAllReview = (reviews) => {
    return {
    type: LOAD_ALL_REVIEW,
    reviews,
    };
};

//Get all review by business id action
const loadAllReviewByBusinessId = (reviews) => {
    return {
    type: LOAD_ALL_REVIEW_BUSINESS_ID,
    reviews,
    };
};

//Get one review by review ID action
const loadOneReview = (reviews) => {
    return {
        type: LOAD_ONE_REVIEW,
        reviews,
    }
};

// // Get all review of the Current User action
// const ReadOwnerReview = (review) => {
//     return {
//     type: READ_OWNER_REVIEW,
//     review,
//     };
// };


// Create review action
const CreateAReview = (reviews) => {
    return {
    type: CREATE_REVIEW,
    reviews,
    };
};
// Edit review action
const UpdateAReview = (reviews) => {
    return {
    type: UPDATE_REVIEW,
    reviews,
    };
};
// Delete review action
const DeleteAReview = (id) => {
    return {
    type: DELETE_REVIEW,
    id,
    };
};


//thunk:
// Get all review thunk
export const getAllReview = () => async (dispatch) => {
    const response = await fetch(`/api/reviews`);
//   console.log("response", response)
    if (response.ok) {
      const data = await response.json();
      dispatch(loadAllReview(data.reviews));
      return data;
    }
    return response;
  };

// Get all review by business id thunk
export const getBusinessAllReview = (BusinessId) => async (dispatch) => {
    const response = await fetch(`/api/businesses/${BusinessId}/all_review`);
  
    if (response.ok) {
      const data = await response.json();
      dispatch(loadAllReviewByBusinessId(data.reviews));
      return data;
    }
    return response;
  };


  //Gat one review by review id thunk
  export const getOneReviewByReviewId = (id) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${id}`);

    console.log("response", response)

    if (response.ok) {
      const data = await response.json();
      dispatch(loadOneReview(data)); 
      return data;
    }
    return response;
  };



// Create a review for business thunk
export const createReview = (newReviewData) => async (dispatch) => {
    const response = await fetch(
      `/api/businesses/${newReviewData.business_id}/reviews`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReviewData),
      }
    );
    if (response.ok) {
      const newReview = await response.json();
      await dispatch(CreateAReview(newReview));
      return newReview;
    }
    return response;
  };


// Edit a review thunk
export const editReview = (data) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${data.id}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(data),
    });
    if (response.ok) {
        const edittedReview = await response.json();
        dispatch(UpdateAReview(edittedReview));
        return edittedReview;
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


//Delete Business thunk
export const deleteReview = (reviewId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      dispatch(DeleteAReview(reviewId));
    }
    return response;
  };


  
//Initial State:
const initialState = {};

//Reducer:
const reviewReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {

    case LOAD_ALL_REVIEW: {
        action.reviews.forEach((review) => {
        newState[review.id] = review;
        });
        return newState;
    }
   
    case LOAD_ALL_REVIEW_BUSINESS_ID: {
        action.reviews.forEach((review) => {
            newState[review.id] = review;
        });
        return newState;
    }

    case LOAD_ONE_REVIEW: {
        newState = { ...state };
        newState[action.reviews.id] = action.reviews;
        return newState;
    }

    case CREATE_REVIEW: {
        newState = { ...state };
        newState[action.reviews.id] = action.reviews;
        return newState;
    }

    case UPDATE_REVIEW: {
        newState = { ...state };
        newState[action.reviews.id] = action.reviews;
        return newState;
    }

    case DELETE_REVIEW: {
        newState = { ...state };
        delete newState[action.id];
        return newState;
    }

    default:
        return state;
  }
};

export default reviewReducer;
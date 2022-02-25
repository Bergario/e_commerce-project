import * as actionTypes from "../actions/actionTypes";

const initialState = {
  category: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CATEGORY:
      return {
        ...state,
        category: action.category,
      };
    default:
  }
  return state;
};

export default reducer;

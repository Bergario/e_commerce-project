import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  // customerId: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case actionTypes.AUTH_SIGNUP_START:
      return { ...state, loading: true };

    case actionTypes.AUTH_SIGNUP_SUCCESS:
      return { ...state, loading: false };

    case actionTypes.AUTH_SIGNUP_FAIL:
      return { ...state, loading: false, error: action.error };

    case actionTypes.AUTH_START:
      return { ...state, loading: true };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        // customerId: action.customerId,
        loading: false,
      };

    case actionTypes.AUTH_FAIL:
      return { ...state, loading: false, error: action.error };

    case actionTypes.START_LOGOUT:
      return { ...state, loading: true };

    case actionTypes.AUTH_LOGOUT:
      return { ...state, loading: false, token: null, customerId: null };

    // case actionTypes.INIT_TIMEOUT:
    //   return {};

    default:
      break;
  }
  return state;
};

export default reducer;

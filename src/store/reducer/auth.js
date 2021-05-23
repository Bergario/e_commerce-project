const initialState = {
  token: null,
  customerId: null,
};

const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
    case "AUTH_SUCCESS":
      return { ...state, token: action.token, customerId: action.customerId };

    case "AUTH_INITIATE_LOGOUT":
      return { ...state, token: null, customerId: null };

    default:
      break;
  }
  return state;
};

export default reducer;

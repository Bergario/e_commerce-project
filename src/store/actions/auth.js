// import { useDispatch} from 'react-redux'

export const authSuccess = (token, customerId) => {
  console.log(token);
  return {
    type: "AUTH_SUCCESS",
    token,
    customerId,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("customer_token");
    if (!token) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem("customer_id");
      dispatch(authSuccess(token, userId));
    }
  };
};

export const logout = () => {
  localStorage.removeItem("customer_token");
  localStorage.removeItem("customer_id");
  return {
    type: "AUTH_INITIATE_LOGOUT",
  };
};

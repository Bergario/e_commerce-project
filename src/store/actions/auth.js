import * as actions from "./index";
import * as actionTypes from "./actionTypes";

export const authSignupStart = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_START,
  };
};
export const authSignupSuccess = () => {
  return {
    type: actionTypes.AUTH_SIGNUP_SUCCESS,
  };
};
export const authSignupFail = (error) => {
  return {
    type: actionTypes.AUTH_SIGNUP_FAIL,
    error,
  };
};
export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, customerId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    customerId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const authTimeout = (timeout) => {
  setTimeout((dispatch) => {
    dispatch(logout());
  }, timeout);
  return {
    type: actionTypes.INIT_TIMEOUT,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("customer_token");
    if (!token) {
      dispatch(logout());
    } else {
      const expired = new Date(localStorage.getItem("expiredTime"));
      if (expired <= new Date().getTime()) {
        dispatch(logout());
      } else {
        const expiredDate = new Date(new Date().getTime() + 3600000);
        localStorage.setItem("expiredTime", expiredDate);
        const userId = localStorage.getItem("customer_id");
        dispatch(authSuccess(token, userId));
        dispatch(actions.cartLoad(userId));
      }
    }
  };
};

export const logout = () => {
  localStorage.removeItem("customer_token");
  localStorage.removeItem("customer_id");
  localStorage.removeItem("expiredTime");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

import * as actionTypes from "./actionTypes";
import * as actions from "./index";
import axios from "axios";
import cookie from "js-cookie";

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

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};

export const startLogout = () => {
  return {
    type: actionTypes.START_LOGOUT,
  };
};

export const logoutSuccess = () => {
  const token = localStorage.getItem("customer_token");
  if (token) {
    cookie.remove("cartId");
    cookie.remove("token");
  }
  localStorage.removeItem("customer_token");
  localStorage.removeItem("expiredTime");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const logout = () => {
  console.log("test");
  return (dispatch) => {
    dispatch(startLogout());

    axios
      .post(`http://localhost:9000/auth/logout/`, { withCredentials: true })
      .then((res) => {
        dispatch(logoutSuccess);
        dispatch(actions.modalOpen());
      })
      .catch((err) => console.log(err));
  };
};

export const authTimeout = (timeout) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
      console.log("Timeout", timeout);
    }, timeout);
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("customer_token");
    if (!token) {
      dispatch(logoutSuccess());
    } else {
      const expired = new Date(localStorage.getItem("expiredTime"));
      if (expired.getTime() <= new Date().getTime()) {
        dispatch(logoutSuccess());
      } else {
        const expiredDate = new Date(new Date().getTime() + 3600000);
        localStorage.setItem("expiredTime", expiredDate);
        // const userId = localStorage.getItem("customer_id");
        dispatch(authSuccess(token));
        // dispatch(actions.cartLoad(userId));
      }
    }
  };
};

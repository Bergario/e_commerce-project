import axios from "axios";

import * as actionTypes from "./actionTypes";

export const productFecthStart = () => {
  return {
    type: actionTypes.FETCH_PRODUCT_START,
  };
};
export const productFecthSuccess = (product) => {
  return {
    type: actionTypes.FETCH_PRODUCT_SUCCESS,
    product,
  };
};
export const productFecthFail = (error) => {
  return {
    type: actionTypes.FETCH_PRODUCT_FAIL,
    error,
  };
};

export const product = () => {
  return (dispatch) => {
    dispatch(productFecthStart());
    axios
      .get("http://localhost:9000/product/", {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(productFecthSuccess(response.data.product));
      })
      .catch((err) => dispatch(productFecthFail(err)));
  };
};

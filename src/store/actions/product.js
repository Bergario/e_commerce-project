import { commerce } from "../../lib/commerce";

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
    commerce.products
      .list()
      .then((response) => dispatch(productFecthSuccess(response.data)))
      .catch((error) => dispatch(productFecthFail(error)));
  };
};

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

const productSearchSuccess = (product) => {
  return {
    type: actionTypes.PRODUCT_SEARCH,
    product,
  };
};

export const showEditProductForm = (productById) => {
  console.log(productById);
  return {
    type: actionTypes.SHOW_EDIT_PRODUCT,
    productById,
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
        console.log(response.data.product);
        dispatch(productFecthSuccess(response.data.product));
      })
      .catch((err) => dispatch(productFecthFail(err)));
  };
};

export const productSearch = (keyWords) => {
  let idCategory = keyWords.category;
  if (keyWords.category == 0) {
    idCategory = "";
  }
  console.log(idCategory);

  return (dispatch) => {
    axios
      .post("http://localhost:9000/product/search/prod", {
        pencarian: keyWords.pencarian,
        category: idCategory,
        sort: keyWords.sort,
        skip: keyWords.skipPage,
      })
      .then((res) => dispatch(productSearchSuccess(res.data)))
      .catch((err) => dispatch(productFecthFail(err)));
  };
};

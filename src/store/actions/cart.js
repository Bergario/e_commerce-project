import { commerce } from "../../lib/commerce";
import axios from "axios";

import * as actionTypes from "./actionTypes";

export const Cart = (cart) => {
  return {
    type: actionTypes.FETCH_CART_SUCCESS,
    cart,
  };
};

export const cartStart = () => {
  return {
    type: actionTypes.FETCH_CART_START,
  };
};

export const addCartSuccess = (cart) => {
  return {
    type: actionTypes.ADD_CART_SUCCESS,
    cart,
  };
};

export const addCartError = (error) => {
  return {
    type: actionTypes.ADD_CART_ERROR,
    error,
  };
};

export const actionCartStart = () => {
  return {
    type: actionTypes.ACTION_CART_START,
  };
};
export const updateCartSuccess = (cart) => {
  return {
    type: actionTypes.UPDATE_CART_SUCCESS,
    cart,
  };
};

export const updateCartError = (error) => {
  return {
    type: actionTypes.UPDATE_CART_ERROR,
    error,
  };
};

export const deleteCartSuccess = (cart) => {
  return {
    type: actionTypes.DELETE_CART_SUCCESS,
    cart,
  };
};

export const emptyCartSuccess = (cart) => {
  return {
    type: actionTypes.EMPTY_CART_SUCCESS,
    cart,
  };
};

export const fetchCart = () => {
  return (dispatch) => {
    axios
      .get(`http://localhost:9000/cart/`, { withCredentials: true })
      .then((response) => {
        dispatch(Cart(response.data));
      })
      .catch((err) => err);
  };
};

export const cartLoad = (cartId) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:9000/cart/${cartId}`)
      .then((response) => {
        dispatch(fetchCart(cartId));
      })
      .catch((err) => err);
  };
};

export const addCart = (productId) => {
  console.log("productId", productId);
  return (dispatch) => {
    axios
      .post(
        `http://localhost:9000/cart/`,
        { productId },
        { withCredentials: true }
      )
      .then((response) => {
        dispatch(addCartSuccess(response.data));
      })
      .catch((err) => dispatch(addCartError(err.response.data.err)));
  };
};

export const updateCart = (productId, quantity) => {
  console.log("qq", quantity);
  return (dispatch) => {
    dispatch(actionCartStart());
    axios
      .patch(
        `http://localhost:9000/cart/`,
        { productId, quantity },
        { withCredentials: true }
      )
      .then((response) => {
        dispatch(addCartSuccess(response.data));
      })
      .catch((err) => dispatch(updateCartError(err.response.data)));
  };
};

export const deleteCart = (itemId, productId) => {
  console.log(itemId);
  return (dispatch) => {
    dispatch(actionCartStart());
    axios
      .patch(
        `http://localhost:9000/cart/deleteItem`,
        { itemId, productId },
        { withCredentials: true }
      )
      .then((response) => {
        dispatch(deleteCartSuccess(response.data));
      })
      .catch((err) => err);
  };
};

export const emptyCart = () => {
  return (dispatch) => {
    dispatch(actionCartStart());
    const cart = async () =>
      await commerce.cart
        .empty()
        .then((response) => dispatch(emptyCartSuccess(response.cart)))
        .catch((error) => console.log(error));
    cart();
  };
};

import { commerce } from "../../lib/commerce";
import axios from "axios";

import * as actionTypes from "./actionTypes";

export const Cart = (cartId, cart) => {
  return {
    type: actionTypes.FETCH_CART_SUCCESS,
    cartId,
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

export const fetchCart = (cartId) => {
  const cardID = cartId && cartId;
  return (dispatch) => {
    dispatch(cartStart());
    const cart = async () =>
      await commerce.cart
        .retrieve(cardID)
        .then((cart) => dispatch(Cart(cardID, cart)));
    cart();
  };
};

export const cartLoad = (customerId) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:9000/user/cart/${customerId}`)
      .then((response) => {
        const cartID = response.data.meta.cartId;
        dispatch(fetchCart(cartID));
      })
      .catch((err) => err);
  };
};

export const addCart = (productId, quantity) => {
  return (dispatch) => {
    const cart = async () =>
      await commerce.cart
        .add(productId, quantity)
        .then((response) => dispatch(addCartSuccess(response.cart)))
        .catch((error) => console.log(error));
    cart();
  };
};

export const updateCart = (productId, quantity) => {
  return (dispatch) => {
    dispatch(actionCartStart());
    const cart = async () =>
      commerce.cart
        .update(productId, { quantity })
        .then((response) => dispatch(updateCartSuccess(response.cart)))
        .catch((error) => console.log(error));
    cart();
  };
};

export const deleteCart = (productId) => {
  return (dispatch) => {
    dispatch(actionCartStart());
    const cart = async () =>
      await commerce.cart
        .remove(productId)
        .then((response) => dispatch(deleteCartSuccess(response.cart)))
        .catch((error) => console.log(error));
    cart();
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

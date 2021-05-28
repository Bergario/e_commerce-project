import { commerce } from "../../lib/commerce";
import axios from "axios";

import * as actionTypes from "./actionTypes";

export const Cart = (cartId, cart) => {
  return {
    type: actionTypes.FETCH_CART,
    cartId,
    cart,
  };
};

export const fetchCart = (cartId) => {
  return (dispatch) => {
    const cart = async () =>
      await commerce.cart
        .retrieve(cartId)
        .then((cart) => dispatch(Cart(cartId, cart)));
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

export const addCart = () => {};
export const updateCart = () => {};
export const deleteCart = () => {};
export const emptyCart = () => {};

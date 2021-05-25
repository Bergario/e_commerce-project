import { commerce } from "../../lib/commerce";
import axios from "axios";

export const fetchCart = (cartId) => {
  return (dispatch) => {
    const aa = async () =>
      await commerce.cart
        .retrieve(cartId)
        .then((cart) => dispatch(Cart(cartId, cart)));
    aa();
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

export const Cart = (cartId, cart) => {
  return {
    type: "FETCH_CART",
    cartId,
    cart,
  };
};

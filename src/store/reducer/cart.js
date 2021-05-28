import * as actionTypes from "../actions/actionTypes";
import { objectUpdate } from "../../Utils/Utilities";

const initialState = {
  cartId: null,
  cart: [],
};

const fetchCart = (state, action) => {
  return objectUpdate(state, {
    cartId: action.cartId,
    cart: action.cart,
  });
};
const addCart = (state, action) => {
  return objectUpdate(state, {
    cart: action.cart,
  });
};
const updatehCart = (state, action) => {
  return objectUpdate(state, {
    cart: action.cart,
  });
};
const deletehCart = (state, action) => {
  return objectUpdate(state, {
    cart: action.cart,
  });
};
const emptyCart = (state, action) => {
  return objectUpdate(state, {
    cart: action.cart,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CART:
      return fetchCart(state, action);
    case actionTypes.ADD_CART:
      return addCart(state, action);
    case actionTypes.UPDATE_CART:
      return updatehCart(state, action);
    case actionTypes.DELETE_CART:
      return deletehCart(state, action);
    case actionTypes.EMPTY_CART:
      return emptyCart(state, action);

    default:
  }
  return state;
};

export default reducer;

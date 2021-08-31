import * as actionTypes from "../actions/actionTypes";
import { objectUpdate } from "../../Utils/Utilities";

const initialState = {
  // cartId: null,
  cart: [],
  loading: false,
};

const fetchCartStart = (state, action) => {
  return objectUpdate(state, {
    loading: true,
  });
};
const fetchCartSuccess = (state, action) => {
  return objectUpdate(state, {
    cart: action.cart,
    loading: false,
  });
};
const addCart = (state, action) => {
  return objectUpdate(state, {
    cart: action.cart,
    loading: false,
  });
};
const actionhCartStart = (state, action) => {
  return objectUpdate(state, {
    loading: true,
  });
};
const updatehCart = (state, action) => {
  return objectUpdate(state, {
    cart: action.cart,
    loading: false,
  });
};
const deletehCart = (state, action) => {
  return objectUpdate(state, {
    cart: action.cart,
    loading: false,
  });
};
const emptyCart = (state, action) => {
  return objectUpdate(state, {
    cart: action.cart,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_CART_START:
      return actionhCartStart(state, action);
    case actionTypes.FETCH_CART_START:
      return fetchCartStart(state, action);
    case actionTypes.FETCH_CART_SUCCESS:
      return fetchCartSuccess(state, action);
    case actionTypes.ADD_CART_SUCCESS:
      return addCart(state, action);
    case actionTypes.UPDATE_CART_SUCCESS:
      return updatehCart(state, action);
    case actionTypes.DELETE_CART_SUCCESS:
      return deletehCart(state, action);
    case actionTypes.EMPTY_CART_SUCCESS:
      return emptyCart(state, action);

    default:
  }
  return state;
};

export default reducer;

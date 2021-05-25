const initialState = {
  cartId: null,
  cart: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CART":
      return {
        ...state,
        cartId: action.cartId,
        cart: action.cart,
      };

    default:
      break;
  }
  return state;
};

export default reducer;

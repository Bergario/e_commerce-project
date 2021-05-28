import { objectUpdate } from "../../Utils/Utilities";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  product: [],
  loading: false,
  error: null,
};

const fetchProductStart = (state, action) => {
  return objectUpdate(state, {
    loading: true,
  });
};

const fetchProductSuccess = (state, action) => {
  return objectUpdate(state, {
    product: action.product,
    loading: false,
  });
};

const fetchProductFail = (state, action) => {
  return objectUpdate(state, {
    error: action.error,
    loading: false,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PRODUCT_START:
      return fetchProductStart(state, action);
    case actionTypes.FETCH_PRODUCT_SUCCESS:
      return fetchProductSuccess(state, action);
    case actionTypes.FETCH_PRODUCT_FAIL:
      return fetchProductFail(state, action);

    default:
      return state;
  }
};

export default reducer;

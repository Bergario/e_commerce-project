import { objectUpdate } from "../../Utils/Utilities";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  product: [],
  loading: false,
  error: null,
  showEditForm: false,
  productById: {},
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

const productSearch = (state, action) => {
  return objectUpdate(state, {
    product: action.product,
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
    case actionTypes.PRODUCT_SEARCH:
      return productSearch(state, action);
    case actionTypes.SHOW_EDIT_PRODUCT:
      return {
        showEditForm: !state.showEditForm,
        product: state.product,
        productById: action.productById,
      };

    default:
      return state;
  }
};

export default reducer;

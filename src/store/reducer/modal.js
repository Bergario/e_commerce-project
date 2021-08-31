import * as actionTypes from "../actions/actionTypes";

const initialState = {
  modal: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODAL_CLOSE:
      return { modal: false };

    case actionTypes.MODAL_OPEN:
      return { modal: true };

    default:
  }
  return state;
};

export default reducer;

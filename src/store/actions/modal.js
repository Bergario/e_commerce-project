import * as actionTypes from "./actionTypes";

export const modalClose = () => {
  // window.location.reload();
  window.location.replace("http://localhost:3001/");
  return {
    type: actionTypes.MODAL_CLOSE,
  };
};

export const modalOpen = () => {
  return {
    type: actionTypes.MODAL_OPEN,
  };
};

// export const closeModalHandler = () => {
//     return (dispatch) => {

//     }
// }

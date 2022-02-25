import axios from "axios";
import * as actionTypes from "./actionTypes";

const fetchCat = (category) => {
  return {
    type: actionTypes.FETCH_CATEGORY,
    category,
  };
};

export const fetchCategory = () => {
  return (dispatch) =>
    axios
      .get("http://localhost:9000/category/")
      .then((res) => {
        console.log(res.data);
        dispatch(fetchCat(res.data));
      })
      .catch((err) => console.log(err));
};

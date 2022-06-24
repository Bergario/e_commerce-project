import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { TextField } from "@material-ui/core";

import * as actions from "../../../../../store/actions/index";

const SearchInput = ({ root, searchAction, fetchAll }) => {
  const dispatch = useDispatch();
  const [keyWords, setKeyWords] = useState(null);

  // const onFetchProducts = () => {
  //   dispatch(actions.product());
  // };
  // const onProductSearch = (keyWords) => {
  //   dispatch(actions.productSearch(keyWords));
  // };

  const searchHandler = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    setKeyWords(e.target.value);
  };
  console.log(keyWords);

  console.log("aa");

  useEffect(() => {
    let mount = true;
    console.log("trtr");
    keyWords ? searchAction({ pencarian: keyWords }) : fetchAll();
    // keyWords && onFetchProducts();
    return (mount = false);
  }, [keyWords]);

  return (
    <TextField
      id="outlined-basic"
      label="Search"
      variant="outlined"
      size="small"
      value={keyWords}
      classes={{ root }}
      onChange={(e) => searchHandler(e)}
    />
  );
};

export default React.memo(SearchInput);

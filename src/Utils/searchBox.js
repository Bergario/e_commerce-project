import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/index";
import SearchIcon from "@material-ui/icons/Search";
import "./searchBox.css";

const SearchBox = ({ searchHandler, keywords, skipPage }) => {
  const dispatch = useDispatch();

  const onSearchProduct = (keyWords) => {
    dispatch(actions.productSearch(keyWords));
  };
  const onFetchProducts = () => {
    dispatch(actions.product());
  };

  // const searchHandler = useCallback((e) => {
  //   setKeyWords(e.target.value);
  // });

  useEffect(() => {
    !keywords && onFetchProducts();
  }, [keywords]);

  const removeValueHandler = () => {
    // setKeyWords(null);
    document.getElementById("search-input").reset();
  };
  console.log("search");

  return (
    <div class="box">
      <form
        id="search-input"
        name="search"
        style={{ height: " 28px" }}
        spellCheck="false"
        onChange={(e) => searchHandler(e)}
      >
        <input
          type="text"
          class="input"
          name="txt"
          placeholder="search..."
          onmouseout="document.search.txt.value = ''"
        />
        <div class="icon">
          {/* <div> */}
          {keywords && <p onClick={() => removeValueHandler()}>X</p>}
          {/* </div> */}
          <SearchIcon
            onClick={() =>
              keywords &&
              onSearchProduct({
                pencarian: keywords,
                skipPage: skipPage,
              })
            }
            color="action"
            // fontSize="small"
          />
        </div>
      </form>
    </div>
  );
};

export default React.memo(SearchBox);

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../store/actions/index";
import SearchIcon from "@material-ui/icons/Search";
import "./searchBox.css";

const SearchBox = () => {
  const dispatch = useDispatch();

  const onProductSearch = (keyWords) => {
    dispatch(actions.productSearch(keyWords));
  };
  const onFetchProducts = () => {
    dispatch(actions.product());
  };

  const [keyWords, setKeyWords] = useState(null);

  const searchHandler = useCallback((e) => {
    setKeyWords(e.target.value);
  });

  useEffect(() => {
    !keyWords && onFetchProducts();
  }, [keyWords]);

  const removeValueHandler = () => {
    setKeyWords(null);
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
          {keyWords && <p onClick={() => removeValueHandler()}>X</p>}
          {/* </div> */}
          <SearchIcon
            onClick={() => keyWords && onProductSearch({ pencarian: keyWords })}
            color="action"
            // fontSize="small"
          />
        </div>
      </form>
    </div>
  );
};

export default React.memo(SearchBox);

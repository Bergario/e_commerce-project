import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import "./searchBox.css";

const SearchBox = () => {
  return (
    <div class="box">
      <form name="search" style={{ height: " 28px" }} spellCheck="false">
        <input
          type="text"
          class="input"
          name="txt"
          placeholder="search..."
          onmouseout="document.search.txt.value = ''"
        />
        {/* <div class="icon">
          <SearchIcon fontSize="small" style={{ color: "#6c6b6b" }} />
        </div> */}
      </form>
    </div>
  );
};

export default SearchBox;

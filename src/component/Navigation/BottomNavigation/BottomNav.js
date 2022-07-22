import React, { useEffect } from "react";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import PagingComponent from "../../../Utils/Pagination";

const BottomNav = ({ changePage, onFetchProducts, page }) => {
  useEffect(() => {
    console.log("render");
  }, []);

  return (
    <BottomNavigation>
      <PagingComponent
        page={page}
        changePage={changePage}
        // onFetchProducts={onFetchProducts}
      />
    </BottomNavigation>
  );
};

export default React.memo(BottomNav);

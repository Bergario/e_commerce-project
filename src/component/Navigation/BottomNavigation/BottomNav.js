import React, { useState, useCallback } from "react";
import { useSelector } from "react-redux";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import PagingComponent from "../../../Utils/Pagination";

const BottomNav = ({ onFetchProducts }) => {
  const [page, setPage] = useState(1);
  const [skipPage, setSkipPage] = useState(0);

  const { products } = useSelector((state) => ({
    products: state.product.product,
  }));

  const changePage = useCallback(
    (e, value) => {
      e.preventDefault();
      setSkipPage(value * 6 - 6);
      setPage(value);
      onFetchProducts({ skip: value * 6 - 6 });
    },
    [products]
  );

  return (
    <BottomNavigation>
      <PagingComponent
        page={page}
        products={products}
        changePage={changePage}
      />
    </BottomNavigation>
  );
};

export default React.memo(BottomNav);

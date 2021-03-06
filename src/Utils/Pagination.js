import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";

const PageComponent = (props) => {
  const { product } = useSelector((state) => ({
    product: state.product.product,
  }));

  console.log(props.page);

  // Pagination
  const totalProducts = product.length != 0 ? product[0].countProduct : 6;
  let countPage = Math.floor(totalProducts / 6);
  if (totalProducts % 6 !== 0) {
    countPage += 1;
  }

  return totalProducts <= 6 ? null : (
    <Pagination
      defaultPage={1}
      count={countPage}
      page={props.page}
      onChange={props.changePage}
      className={props.paging}
    />
  );
};

export default React.memo(PageComponent);

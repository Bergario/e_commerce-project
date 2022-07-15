import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Grid, Container, Backdrop } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";

import Product from "./product/Product";
import BottomNav from "../Navigation/BottomNavigation/BottomNav";
import useStyles from "./styles";
import Spinner from "../../Utils/Spinner";
import PageComponent from "../../Utils/Pagination";
import * as actions from "../../store/actions/index";

const Products = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [skipPage, setSkipPage] = useState();

  //REDUCER
  const onFetchProducts = (query) => dispatch(actions.product(query));
  const { products, isLoading } = useSelector((state) => ({
    products: state.product.product,
    // isLoading: state.product.loading,
    // error: state.cart.error,
  }));

  useEffect(() => {
    console.log(page);
    console.log(skipPage);
  }, [page]);

  console.log("dfdsdfs", products);

  const Prod = useMemo(
    () => (
      <Grid container justify="left" spacing={2}>
        {products &&
          products.map((product) => {
            console.log("aaa");
            return (
              <Grid item key={product.id} xs={6} sm={4} md={3} lg={2} xl={2}>
                <Product product={product} />
              </Grid>
            );
          })}
      </Grid>
    ),
    [products]
  );

  // if (isLoading) return <Spinner />;
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container>
        {/* <Grid container justify="left" spacing={2}>
          {product.map((product) => {
            return (
              <Grid item key={product.id} xs={6} sm={4} md={3} lg={2} xl={2}>
                <Product product={product} />
              </Grid>
            );
          })}
        </Grid> */}

        {Prod}
        {/* <BottomNav onFetchProducts={onFetchProducts} /> */}
      </Container>
      {/* <PageComponent products={products} changePage={changePage} page={page} /> */}
    </main>
  );
};

export default React.memo(Products);

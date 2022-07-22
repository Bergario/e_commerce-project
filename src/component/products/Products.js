import React, { useState, useMemo, useCallback } from "react";
import { Grid, Container, Backdrop } from "@material-ui/core";
import { useSelector } from "react-redux";

import Product from "./product/Product";
import BottomNav from "../Navigation/BottomNavigation/BottomNav";
import useStyles from "./styles";
import Spinner from "../../Utils/Spinner";
import PageComponent from "../../Utils/Pagination";
import * as actions from "../../store/actions/index";

const Products = ({ onFetchProducts }) => {
  const classes = useStyles();

  const [page, setPage] = useState(1);
  const { products, isLoading } = useSelector((state) => ({
    products: state.product.product,
    // isLoading: state.product.loading,
    // error: state.cart.error,
  }));

  const changePage = useCallback((e, value) => {
    console.log("cyeegg", value);
    setPage(value);
    onFetchProducts({ skip: value * 6 - 6 });
  }, []);

  console.log("dfdsdfs", page);

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
      </Container>
      {/* <BottomNav
        page={page}
        changePage={changePage}
        onFetchProducts={onFetchProducts}
      /> */}
      {/* <PageComponent products={products} changePage={changePage} page={page} /> */}
    </main>
  );
};

export default React.memo(Products);

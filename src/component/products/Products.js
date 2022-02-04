import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Grid, Container, Backdrop } from "@material-ui/core";
import { useSelector } from "react-redux";

import Product from "./product/Product";
import useStyles from "./styles";
import Spinner from "../../Utils/Spinner";

const Products = () => {
  const classes = useStyles();

  //REDUCER
  const { products, isLoading } = useSelector((state) => ({
    products: state.product.product,
    // isLoading: state.product.loading,
    // error: state.cart.error,
  }));

  console.log("dfdsdfs");

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
    </main>
  );
};

export default React.memo(Products);

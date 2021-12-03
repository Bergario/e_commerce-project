import React, { useState } from "react";
import { Grid, Container, Backdrop } from "@material-ui/core";
import { useSelector } from "react-redux";

import Product from "./product/Product";
import useStyles from "./styles";
import Spinner from "../../Utils/Spinner";

const Products = () => {
  //REDUCER
  const { product, isLoading, error } = useSelector((state) => ({
    product: state.product.product,
    isLoading: state.product.loading,
    error: state.cart.error,
  }));

  const classes = useStyles();

  if (isLoading) return <Spinner />;
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Container>
        <Grid container justify="left" spacing={2}>
          {product.map((product) => {
            return (
              <Grid item key={product.id} xs={6} sm={4} md={3} lg={2} xl={2}>
                <Product product={product} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </main>
  );
};

export default Products;

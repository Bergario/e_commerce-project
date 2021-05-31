import React from "react";
import { Grid } from "@material-ui/core";
import { useSelector } from "react-redux";

import Product from "./product/Product";
import useStyles from "./styles";
import Spinner from "../../Utils/Spinner";

const Products = () => {
  //REDUCER
  const { product, isLoading } = useSelector((state) => ({
    product: state.product.product,
    isLoading: state.product.loading,
  }));

  const classes = useStyles();

  if (isLoading) return <Spinner />;
  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      <Grid container justify="left" spacing={4}>
        {product.map((product) => {
          return (
            <Grid item key={product.id} xs={6} sm={4} md={3} lg={2}>
              <Product product={product} />
            </Grid>
          );
        })}
      </Grid>
    </main>
  );
};

export default Products;

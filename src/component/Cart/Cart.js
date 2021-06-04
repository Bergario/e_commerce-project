import React, { useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@material-ui/core";

import CartItem from "./CartItem/CartItem";
import * as actions from "../../store/actions/index";
import Spinner from "../../Utils/Spinner";

const Cart = ({ cartProduct, onUpdateQuantity, onRemoveFromCart }) => {
  const products = cartProduct.line_items;

  const classes = useStyles();
  const dispatch = useDispatch();

  //REDUCER
  const { onLoading } = useSelector((state) => ({
    onLoading: state.cart.loading,
  }));

  //REDUX ACTIONS
  const onEmptyCart = () => dispatch(actions.emptyCart);

  const EmptyCart = () => {
    return (
      <Typography>
        Keranjang Kosong! <Link to="/">Silahkan pilih barang..</Link>
      </Typography>
    );
  };

  console.log(cartProduct);

  const FilledCart = () => {
    return (
      <Grid item className={classes.boxTable} container xxs={12} sm={12}>
        <TableContainer component={Paper}>
          <TableContainer className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nama Product</TableCell>
                <TableCell align="center">Qty</TableCell>
                <TableCell align="right">Harga</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products &&
                products.map((product) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemoveFromCart={onRemoveFromCart}
                  />
                ))}
              <TableRow>
                <TableCell component="th" scope="row">
                  {onLoading && <CircularProgress />}
                </TableCell>
                <TableCell align="left">
                  <Typography variant="h6">SUBTOTAL</Typography>
                </TableCell>
                <TableCell align="right">
                  Rp. {cartProduct.subtotal.formatted}
                </TableCell>
              </TableRow>
            </TableBody>
          </TableContainer>
        </TableContainer>

        <div className={classes.button}>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
              onClick={() => dispatch(onEmptyCart())}
            >
              Empty Cart
            </Button>
            <Button
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
              component={Link}
              to="/checkout"
            >
              Checkout
            </Button>
          </div>
        </div>
      </Grid>
    );
  };

  if (!cartProduct.line_items) return <Spinner />;
  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} variant="h4">
        Your Shopping Cart
      </Typography>
      {!cartProduct.line_items ? (
        <Spinner />
      ) : !cartProduct.line_items.length ? (
        <EmptyCart />
      ) : (
        <FilledCart />
      )}
    </Container>
  );
};

export default Cart;

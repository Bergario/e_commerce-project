import React, { useMemo, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import { Link } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Toolbar,
  useTheme,
  useMediaQuery,
} from "@material-ui/core";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CartItem from "./CartItem/CartItem";
import CartItemMobile from "./CartItem/CartItemMobile";
import * as actions from "../../store/actions/index";
import Spinner from "../../Utils/Spinner";
import { priceFormat } from "../../Utils/Utilities";
import { AnimationDiv } from "../../Utils/animation";

const Cart = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.only("xs"));

  //REDUCER
  const { onLoading, isAuth, error, cartProduct } = useSelector((state) => ({
    onLoading: state.cart.loading,
    isAuth: state.auth.token !== null,
    error: state.cart.error,
    cartProduct: state.cart.cart,
  }));

  const products = cartProduct.line_items;

  const [open, setOpen] = useState(error !== null);

  //REDUX ACTIONS
  const onEmptyCart = () => dispatch(actions.emptyCart);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const EmptyCart = () => {
    return (
      <AnimationDiv>
        <Typography className={classes.emptycart}>
          Keranjang Kosong! <Link to="/">Silahkan pilih barang..</Link>
        </Typography>
      </AnimationDiv>
    );
  };

  const FilledCart = useMemo(() => {
    return (
      <Grid
        item
        className={classes.boxTable}
        container
        xxs={12}
        sm={12}
        md={12}
        lg={12}
      >
        <TableContainer
          className={classes.table}
          aria-label="simple table"
          component={Paper}
        >
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell></TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="right">Harga</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.map((product) => (
                <CartItem key={product.id} products={product} />
              ))}
            <TableRow>
              <TableCell component="th" scope="row">
                {onLoading && <CircularProgress />}
              </TableCell>
              <TableCell></TableCell>
              <TableCell align="center">
                <Typography className={classes.subtotal}>
                  Total Harga
                </Typography>
              </TableCell>
              <TableCell className={classes.subtotal} align="right">
                {priceFormat(cartProduct.total_price)}
              </TableCell>
            </TableRow>
          </TableBody>
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
  });

  const filledCartMobile = useMemo(() => {
    return (
      <React.Fragment>
        {products &&
          products.map((product) => (
            <CartItemMobile key={product.id} products={product} />
          ))}
        <Toolbar className={classes.navBottom}>
          <Grid>
            <Typography className={classes.total}>Total Harga</Typography>
            <Typography className={classes.total}>
              {priceFormat(cartProduct ? cartProduct.total_price : 0)}
            </Typography>
          </Grid>
          <Grid>
            <Button
              component={Link}
              to={isAuth ? "/checkout" : "/auth/login"}
              color="primary"
              type="button"
              size="small"
              variant="contained"
            >
              {isAuth ? "beli" : "login untuk Beli"}
            </Button>
          </Grid>
        </Toolbar>
      </React.Fragment>
    );
  }, []);

  if (!cartProduct.line_items) return <Spinner />;
  return (
    <Container className={classes.root}>
      <div className={classes.toolbar} />
      <Typography className={classes.title}>Your Shopping Cart</Typography>
      {!cartProduct.line_items ? (
        <Spinner />
      ) : !cartProduct.line_items.length ? (
        <EmptyCart />
      ) : isMatch ? (
        filledCartMobile
      ) : (
        FilledCart
      )}
      <Snackbar
        className={classes.snackbar}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert
          onClose={handleClose}
          elevation={6}
          variant="filled"
          severity="warning"
        >
          Stok tidak cukup
        </MuiAlert>
      </Snackbar>
    </Container>
  );
};

export default Cart;

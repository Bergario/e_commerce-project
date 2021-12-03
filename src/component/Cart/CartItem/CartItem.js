import React from "react";

import useStyles from "./styles";
import {
  TableCell,
  TableRow,
  Button,
  IconButton,
  Grid,
  Typography,
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";

import * as actions from "../../../store/actions/";
import { priceFormat } from "../../../Utils/Utilities";

const CartItem = React.memo(({ products }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //REDUX
  const onUpdateQuantity = (productId, qty) =>
    dispatch(actions.updateCart(productId, qty));
  const onRemoveFromCart = (itemId, productId) =>
    dispatch(actions.deleteCart(itemId, productId));

  //REDUCER
  const { cartId } = useSelector((state) => ({
    cartId: state.cart.cartId,
  }));
  const { product, quantity, _id } = products;
  console.log(product);

  return (
    <TableRow key={_id}>
      <TableCell component="td" scope="row">
        <Grid className={classes.product}>
          <img
            className={classes.img}
            // src={`${product.product.productImage}`}
            src={`http://localhost:9000/images/${product.productImage}`}
            alt=""
          />
          <p className={classes.productName}>{product.name}</p>
        </Grid>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => onRemoveFromCart(_id, product._id)}>
          <DeleteForever />
        </IconButton>
      </TableCell>
      <TableCell align="center">
        <Button
          onClick={() => onUpdateQuantity(product._id, -1)}
          type="button"
          size="small"
          color="secondary"
        >
          -
        </Button>
        {quantity}
        <Button
          onClick={() => onUpdateQuantity(product._id, 1)}
          type="button"
          size="small"
          color="secondary"
        >
          +
        </Button>
      </TableCell>
      <TableCell align="right">
        {priceFormat(product.price * quantity)}
      </TableCell>
    </TableRow>
  );
});

export default CartItem;

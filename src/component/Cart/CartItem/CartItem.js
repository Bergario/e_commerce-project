import React from "react";

import useStyles from "./styles";
import {
  TableCell,
  TableRow,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";
import { DeleteForever } from "@material-ui/icons";

const CartItem = ({ product, onUpdateQuantity, onRemoveFromCart }) => {
  const classes = useStyles();

  return (
    <TableRow key={product.id}>
      <TableCell component="th" scope="row">
        <img className={classes.img} src={product.media.source} alt="" />
        <p className={classes.productName}>{product.name}</p>
      </TableCell>
      <TableCell align="center">
        <IconButton
          onClick={() => onRemoveFromCart(product.id, product.quantity)}>
          <DeleteForever />
        </IconButton>
        <Button
          onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}
          type="button"
          size="small"
          color="secondary">
          -
        </Button>
        {product.quantity}
        <Button
          onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}
          type="button"
          size="small"
          color="secondary">
          +
        </Button>
      </TableCell>
      <TableCell align="right">Rp. {product.line_total.formatted}</TableCell>
    </TableRow>
  );
};

export default CartItem;

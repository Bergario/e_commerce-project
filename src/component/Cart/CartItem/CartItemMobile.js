import React from "react";
import { useDispatch } from "react-redux";
import { DeleteForever, Add, Remove } from "@material-ui/icons";
import { Typography, Grid, CardMedia, IconButton } from "@material-ui/core";

import useStyles from "../styles";
import * as actions from "../../../store/actions/index";
import { priceFormat } from "../../../Utils/Utilities";

const CartItemMobile = ({ products }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //REDUX
  const onUpdateQuantity = (productId, qty) =>
    dispatch(actions.updateCart(productId, qty));
  const onRemoveFromCart = (itemId) => dispatch(actions.deleteCart(itemId));

  const { product, quantity, _id } = products;

  return (
    <Grid className={classes.orderItemBox}>
      <div className={classes.orderItemDetail}>
        <div className={classes.itemContentCol}>
          <div style={{ display: "flex" }}>
            <div>
              <CardMedia
                className={classes.imgOrder}
                image={`http://localhost:9000/images/${product.productImage}`}
              />
            </div>
            <div style={{ width: "100%", padding: "10px" }}>
              <Grid>
                <h4 style={{ marginBottom: "5px" }}>{product.name}</h4>
              </Grid>
            </div>
          </div>
        </div>
        <Grid className={classes.priceDetail}>
          <Grid>
            <Typography variant="body2">
              {priceFormat(product.price * quantity)}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <IconButton onClick={() => onRemoveFromCart(_id)}>
        <DeleteForever style={{ marginRight: "15px" }} />
      </IconButton>
      <IconButton
        onClick={() => onUpdateQuantity(product._id, -1)}
        className={classes.quantityButton}>
        <Remove fontSize="small" />
      </IconButton>
      <span className={classes.quantity}>{quantity}</span>
      <IconButton
        onClick={() => onUpdateQuantity(product._id, +1)}
        className={classes.quantityButton}>
        <Add fontSize="small" />
      </IconButton>
    </Grid>
  );
};

export default CartItemMobile;

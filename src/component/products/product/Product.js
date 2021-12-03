import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Backdrop,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import * as actions from "../../../store/actions/index";
import { priceFormat } from "../../../Utils/Utilities";
import DetailProduct from "../detailProduct/detailProduct";

const Product = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //REDUX
  const onAddToCart = (productId) => dispatch(actions.addCart(productId));

  const [open, setOpen] = useState(false);
  const handleToggle = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.productImage}
        title={product.name}
        onClick={() => handleToggle()}
      />
      <CardContent>
        {/* <div className={classes.cardContent}> */}
        <Typography className={classes.title} gutterBottom>
          {product.name}
        </Typography>
        <Typography className={classes.price} variant="subtitle2">
          {priceFormat(product.price)}
        </Typography>
        {/* </div> */}
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          className={classes.description}
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label="Add to cart"
          onClick={() => onAddToCart(product.id)}
        >
          <AddShoppingCart fontSize="small" />
        </IconButton>
      </CardActions>
      <DetailProduct product={product} open={open} handleClose={handleClose} />
    </Card>
  );
};

export default Product;

import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useDispatch } from "react-redux";

import useStyles from "./styles";
import * as actions from "../../../store/actions/index";

const Product = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  //REDUX
  const onAddToCart = (productId, qty) =>
    dispatch(actions.addCart(productId, qty));

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        {/* <div className={classes.cardContent}> */}
        <Typography variant="h6" gutterBottom>
          {product.name}
        </Typography>
        <Typography variant="subtitle2">
          Rp. {product.price.formatted}
        </Typography>
        {/* </div> */}
        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          variant="body2"
          color="textSecondary"
        />
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton
          aria-label="Add to cart"
          onClick={() => onAddToCart(product.id, 1)}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Product;

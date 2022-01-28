import React, { useState, lazy, useMemo, useCallback } from "react";
import {
  Card,
  // CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Backdrop,
} from "@material-ui/core";
import { AddShoppingCart } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import useStyles from "./styles";
import * as actions from "../../../store/actions/index";
import { priceFormat } from "../../../Utils/Utilities";
import DetailProduct from "../detailProduct/detailProduct";
import { AnimationDiv, AnimationP } from "../../../Utils/animation";

const CardMedia = lazy(() =>
  import("@material-ui/core").then((mod) => ({ default: mod.CardMedia }))
);

const Product = ({ product }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const handleClose = useCallback(() => setOpen(false), []);
  const handleToggle = useCallback(() => setOpen(true), []);

  //REDUX
  const onAddToCart = useCallback(
    (productId) => dispatch(actions.addCart(productId)),
    []
  );

  const LazyImage = useMemo(() => {
    return (
      <div>
        <LazyLoadImage
          effect="blur"
          src={product.productImage}
          alt={product.name}
          className={classes.media}
          wrapperClassName={classes.lazyImg}
          onClick={() => handleToggle()}
        />
      </div>
    );
  }, []);

  console.log("product rendering");

  return (
    <Card className={classes.root}>
      {/* // <Card> */}
      {/* <AnimationDiv
        // whileHover={{ scale: 1.07 }}
        transition={{ duration: 0.5 }}
        classes={classes.animDiv}
      > */}

      {/* <CardMedia
        className={classes.media}
        // image={product.productImage}
        title={product.name}
        onClick={() => handleToggle()}
      /> */}
      {LazyImage}

      {/* </AnimationDiv> */}
      <CardContent>
        {/* <AnimationP classes={classes.animP}> */}
        <Typography className={classes.title} gutterBottom>
          {product.name}
        </Typography>

        <Typography className={classes.price} variant="subtitle2">
          {priceFormat(product.price)}
        </Typography>

        <Typography
          dangerouslySetInnerHTML={{ __html: product.description }}
          className={classes.description}
          color="textSecondary"
        />
        {/* </AnimationP> */}
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

export default React.memo(Product);

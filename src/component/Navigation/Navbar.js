import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import useStyles from "./styles";

import logo from "../../assets/logo.png";
import AccountNav from "./AccountNav";

const NavBar = () => {
  const classes = useStyles();
  const Location = useLocation();

  const { cart } = useSelector((state) => ({
    cart: state.cart.cart,
  }));

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            className={classes.title}
            color="inherit"
          >
            <img
              src={logo}
              alt="product.js"
              height="25px"
              className={classes.image}
            />
            Ripai Shop
          </Typography>
          <div className={classes.grow} />
          <div className={classes.menuButton}>
            {Location.pathname === "/" && (
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Show cart item"
                color="inherit"
              >
                <Badge badgeContent={cart.total_unique_item} color="secondary">
                  <ShoppingCart color="action" />
                </Badge>
              </IconButton>
            )}
          </div>
          <AccountNav />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default React.memo(NavBar);

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

import useStyles from "./styles";

import logo from "../../assets/logo.png";
import AccountNav from "./AccountNav";

const NavBar = ({ totalItems }) => {
  const classes = useStyles();
  const Location = useLocation();

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
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart />
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

export default NavBar;

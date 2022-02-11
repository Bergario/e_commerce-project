import React, { useCallback, useMemo } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import useStyles from "./styles";

import logo from "../../assets/logo.png";
import AccountNav from "./AccountNav";
import MenuToggle from "./SideBar/menuToggle";
import SideBar from "./SideBar/sideBar";

const NavBar = () => {
  const classes = useStyles();
  const Location = useLocation();

  const { cart, isAuth } = useCallback(
    useSelector((state) => ({
      cart: state.cart.cart,
      isAuth: state.auth.token !== null,
    })),
    []
  );

  const NavMenu = useMemo(() => <AccountNav isAuth={isAuth} />, [isAuth]);

  console.log("Nav rendering...");

  return (
    <>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <SideBar />
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
          {NavMenu}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default React.memo(NavBar);

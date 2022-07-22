import React, { useCallback, useMemo, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
} from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import useStyles from "./styles";

import logo from "../../assets/logo.png";
import AccountNav from "./AccountNav";
import SideBar from "./SideBar/sideBar";
import SearchBox from "../../Utils/searchBox";
import BottomNav from "./BottomNavigation/BottomNav";
import * as actions from "../../store/actions/index";

const NavBar = ({ children }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const Location = useLocation();

  const [page, setPage] = useState(1);
  const [keywords, setKeywords] = useState("");
  const [skipPage, setSkipPage] = useState(0);

  const onSearchProduct = (keywords) =>
    dispatch(actions.productSearch(keywords));

  const { cart, isAuth } = useSelector((state) => ({
    cart: state.cart.cart,
    isAuth: state.auth.token !== null,
  }));

  const searchHandler = useCallback((e) => {
    setKeywords(e.target.value);
  });

  const changePage = useCallback((e, value) => {
    console.log("cyeegg", value);
    setPage(value);
    onSearchProduct({ pencarian: keywords, skipPage: value * 6 - 6 });
    setSkipPage(value * 6 - 6);
  }, []);

  const NavMenu = useMemo(() => <AccountNav isAuth={isAuth} />, [isAuth]);

  console.log("Nav rendering...", isAuth);

  return (
    <>
      <AppBar
        position="fixed"
        className={classes.appBar}
        color="inherit"
        // style={{ paddingRight: "0 !important" }}
      >
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
          <SearchBox
            searchHandler={searchHandler}
            keywords={keywords}
            skipPage={skipPage}
          />
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
      {children}
      <BottomNav changePage={changePage} page={page} />
    </>
  );
};

export default React.memo(NavBar);

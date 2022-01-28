import React, {
  useState,
  useEffect,
  Suspense,
  lazy,
  useCallback,
  useMemo,
} from "react";
import { commerce } from "./lib/commerce";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Navbar from "./component/Navigation/Navbar";
import Products from "./component/products/Products";
import Cart from "./component/Cart/Cart";
import Dashboard from "./component/Admin/dashboard/Dashboard";
import PaymentDetail from "./component/Payment/paymentDetail";
import Checkout from "./component/CheckoutForm/Checkout/Checkout";
import Orders from "./component/Order/Orders";
import Auth from "./component/Auth/Auth";

import { Switch, Route, Redirect, useLocation } from "react-router-dom";
import * as actions from "./store/actions/index";

const App = () => {
  //REDUX
  const dispatch = useDispatch();

  const location = useLocation();
  console.log("dadass", location);

  const onAuthCheckState = useCallback(
    () => dispatch(actions.authCheckState),
    []
  );
  const onProductFetch = useCallback(() => dispatch(actions.product), []);
  const onFetchCart = useCallback(() => dispatch(actions.fetchCart()), []);
  const onAuthTimeout = useCallback(
    (timeout) => dispatch(actions.authTimeout(timeout)),
    []
  );

  const { isAuth } = useSelector((state) => ({
    isAuth: state.auth.token !== null,
  }));

  // const Navbar = lazy(() => import("./component/Navigation/Navbar"));
  // const Products = lazy(() => import("./component/products/Products"));
  // const Dashboard = lazy(() => import("./component/Admin/dashboard/Dashboard"));
  // const PaymentDetail = lazy(() => import("./component/Payment/paymentDetail"));
  // const Orders = lazy(() => import("./component/Order/Orders"));
  // const Checkout = lazy(() =>
  //   import("./component/CheckoutForm/Checkout/Checkout")
  // );
  // const Cart = lazy(() => import("./component/Cart/Cart"));
  // const Auth = lazy(() => import("./component/Auth/Auth"));

  useEffect(() => {
    dispatch(onProductFetch());
  }, []);

  useEffect(() => {
    // setTimeout(() => {
    //   onFetchCart();
    // }, 2000);
    onFetchCart();
  }, [isAuth]);

  useEffect(() => {
    const expired = new Date(localStorage.getItem("expiredTime")).getTime();
    expired && onAuthTimeout(expired - new Date().getTime());
    dispatch(onAuthCheckState());
  }, [location.pathname]);

  let routes = useMemo(
    () => (
      <Switch>
        <Route exact path="/" component={() => <Products />} />
        <Route path="/cart" component={() => <Cart />} />
        <Route path="/admin" component={Dashboard} />
        <Route path="/status?order_id=:id" component={PaymentDetail} />
        <Route path="/status" component={PaymentDetail} />
        <Route path={"/auth/login"} component={() => <Auth />} />
        <Route path={"/auth/signup"} component={() => <Auth />} />
        <Route path={"/order"} component={() => <Orders />} />
        <Redirect to="/" />
      </Switch>
    ),
    []
  );

  if (isAuth) {
    routes = (
      <Switch>
        <Route exact path="/" component={() => <Products />} />
        <Route path="/order" component={() => <Orders />} />
        <Route
          path="/status?order_id=:id"
          component={() => <PaymentDetail />}
        />
        <Route path="/status" component={PaymentDetail} />
        <Route path="/cart" component={() => <Cart />} />
        <Route path="/checkout" component={() => <Checkout />} />
        <Route path="/admin" component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Navbar />
      {/* <Suspense fallback={<div></div>}>{routes}</Suspense> */}
      {routes}
    </div>
  );
};

export default App;

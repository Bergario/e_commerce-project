import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./component/Navigation/Navbar";
import { commerce } from "./lib/commerce";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Products from "./component/products/Products";
import Cart from "./component/Cart/Cart";
import Dashboard from "./component/Admin/dashboard/Dashboard";
import PaymentDetail from "./component/Payment/paymentDetail";

import { Switch, Route, Redirect } from "react-router-dom";
import Checkout from "./component/CheckoutForm/Checkout/Checkout";
import Auth from "./component/Auth/Auth";
import * as actions from "./store/actions/index";
import Orders from "./component/Order/Orders";

const App = () => {
  //REDUX
  const dispatch = useDispatch();

  const onAuthCheckState = () => dispatch(actions.authCheckState);
  const onProductFetch = () => dispatch(actions.product);
  const onFetchCart = () => dispatch(actions.fetchCart());
  const onAuthTimeout = (timeout) => dispatch(actions.authTimeout(timeout));

  const { isAuth, cartId, cart } = useSelector((state) => ({
    isAuth: state.auth.token !== null,
    cartId: state.cart.cartId,
    cart: state.cart.cart,
  }));

  console.log(isAuth);

  const [carti, setCart] = useState([]);

  useEffect(() => {
    dispatch(onProductFetch());
  }, []);

  useEffect(() => {
    dispatch(onAuthCheckState());
    onFetchCart();
    const expired = new Date(localStorage.getItem("expiredTime")).getTime();
    expired && onAuthTimeout(expired - new Date().getTime());
  }, [isAuth]);

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  let routes = (
    <Switch>
      <Route exact path="/" component={() => <Products />} />
      <Route path="/cart" component={() => <Cart cartProduct={cart} />} />
      <Route path="/admin" component={Dashboard} />
      <Route path="/status?order_id=:id" component={PaymentDetail} />
      <Route path="/status" component={PaymentDetail} />
      <Route path={"/auth/login"} component={() => <Auth />} />
      <Route path={"/auth/signup"} component={() => <Auth />} />
      <Route path={"/order"} component={() => <Orders />} />
      <Redirect to="/" />
    </Switch>
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
        <Route path="/cart" component={() => <Cart cartProduct={cart} />} />
        <Route path="/checkout" component={() => <Checkout cart={cart} />} />
        <Route path="/admin" component={Dashboard} />
        <Redirect to="/" />
      </Switch>
    );
  }
  // ?order_id=:id&status_code=:code&transaction_status=:status
  return (
    <div>
      <Navbar totalItems={cart && cart.total_unique_item} />
      {routes}
    </div>
  );
};

export default App;

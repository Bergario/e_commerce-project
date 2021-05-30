import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./component/Navigation/Navbar";
import { commerce } from "./lib/commerce";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import Products from "./component/products/Products";
import Cart from "./component/Cart/Cart";

import { Switch, Route, Redirect } from "react-router-dom";
import Checkout from "./component/CheckoutForm/Checkout/Checkout";
import Auth from "./component/Auth/Auth";
import * as actions from "./store/actions/index";

const App = () => {
  //REDUX
  const dispatch = useDispatch();

  const onAuthCheckState = () => dispatch(actions.authCheckState);
  const onProductFetch = () => dispatch(actions.product);
  const onFetchCart = (cartId) => dispatch(actions.fetchCart(cartId));

  const { isAuth, cartId, cart } = useSelector((state) => ({
    isAuth: state.auth.token !== null,
    cartId: state.cart.cartId,
    cart: state.cart.cart,
  }));

  const [carti, setCart] = useState([]);

  useEffect(() => {
    dispatch(onProductFetch());
    dispatch(onAuthCheckState());
  }, []);

  useEffect(() => {
    onFetchCart(cartId);
  }, [isAuth, cartId]);

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  let routes = <Route path="/auth" component={() => <Auth />} />;

  if (isAuth) {
    routes = (
      <Route path="/checkout" component={() => <Checkout cart={cart} />} />
    );
  }
  return (
    <div>
      <Navbar totalItems={cart && cart.total_unique_items} />
      <Switch>
        <Route exact path="/" component={() => <Products />} />
        <Route path="/cart" component={() => <Cart cartProduct={cart} />} />
        {routes}
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;

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
  const onFetchCart = () => dispatch(actions.fetchCart);

  const { isAuth, cartId, cart } = useSelector((state) => ({
    isAuth: state.auth.token !== null,
    cartId: state.cart.cartId,
    cart: state.cart.cart,
  }));

  console.log(cart);

  const [carti, setCart] = useState([]);

  const addToCartHanlder = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const updateQuantityHandler = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const removeFromCartHandler = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const emptyCartHandler = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  useEffect(() => {
    dispatch(onFetchCart());
    dispatch(onProductFetch());
    dispatch(onAuthCheckState());
  }, []);

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
        <Route
          exact
          path="/"
          component={() => <Products onAddToCart={addToCartHanlder} />}
        />
        <Route
          path="/cart"
          component={() => (
            <Cart
              cartProduct={cart}
              onUpdateQuantity={updateQuantityHandler}
              onRemoveFromCart={removeFromCartHandler}
              onEmptyCart={emptyCartHandler}
            />
          )}
        />
        {routes}
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;

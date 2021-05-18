import React, { useState, useEffect, useCallback } from "react";
import Navbar from "./component/Navigation/Navbar";
import { commerce } from "./lib/commerce";

import Products from "./component/products/Products";
import Cart from "./component/Cart/Cart";

import { Switch, Route } from "react-router-dom";
import Checkout from "./component/CheckoutForm/Checkout/Checkout";
import Login from "./component/Auth/Login";

const App = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchcart = async () => {
    setCart(await commerce.cart.retrieve());
  };

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
    fetchProducts();
    fetchcart();
  }, []);

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart);
  };

  console.log(products);

  return (
    <div>
      <Navbar totalItems={cart.total_unique_items} />
      <Switch>
        <Route
          exact
          path="/"
          component={() => (
            <Products product={products} onAddToCart={addToCartHanlder} />
          )}
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
        <Route path="/checkout" component={() => <Checkout cart={cart} />} />
        <Route path="/login" component={() => <Login />} />
      </Switch>
      {/* <Products product={products} onAddToCart={addToCartHanlder} /> */}
    </div>
  );
};

export default App;

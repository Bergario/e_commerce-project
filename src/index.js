import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";

import App from "./App";
import authReducer from "./store/reducer/auth";
import cartReducer from "./store/reducer/cart";
import productReducer from "./store/reducer/product";
import modalReducer from "./store/reducer/modal";
import categoryReducer from "./store/reducer/category";
import Modal from "./Utils/modal";
import "./index.css";

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  product: productReducer,
  modal: modalReducer,
  category: categoryReducer,
});

const logger = (store) => {
  return (next) => {
    return (action) => {
      const result = next(action);
      return result;
    };
  };
};

console.log("index");

// const composeEnchancers =
//   process.env.NODE_ENV === "development"
//     ? window._REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Modal />
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

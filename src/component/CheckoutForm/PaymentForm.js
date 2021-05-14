import React from "react";
import { Typoghrapy, Button, Divider } from "@material-ui/core";
import {
  ElementProps,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStrip } from "@stripe/stripe-js";
import Review from "./Review";

const PaymentForm = ({ checkoutToken }) => {
  return (
    <div>
      <Review checkoutToken={checkoutToken} />
    </div>
  );
};

export default PaymentForm;

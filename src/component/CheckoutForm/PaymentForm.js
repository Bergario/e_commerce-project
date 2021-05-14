import React from "react";
import { Typography, Button, Divider } from "@material-ui/core";
import {
  Elements,
  CardElement,
  ElementsConsumer,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Review from "./Review";

const PaymentForm = ({ checkoutToken, backStep }) => {
  const stripePromise = loadStripe("...");
  console.log(stripePromise);

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant="h6" gutterBottom style={{ margin: "20px 0" }}>
        {" "}
        payment
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => {
            return (
              <form>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <Button variant="outline" onClick={backStep}>
                    Back
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disable={!stripe}
                    color="primary">
                    Pay
                  </Button>
                </div>
              </form>
            );
          }}
        </ElementsConsumer>
      </Elements>
    </>
  );
};

export default PaymentForm;

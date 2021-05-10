import React, { useState, useEffect } from "react";
import { commerce } from "../../../lib/commerce";
import useStyles from "./styles";

import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  CircularProgress,
  Divider,
  Button,
} from "@material-ui/core";
import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";

const steps = ["Shippping Address", "Payment Detail"];

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [checkoutToken, setCheckoutToken] = useState({});

  const classes = useStyles();

  useEffect(() => {
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        setCheckoutToken(token);
        console.log(token);
      } catch (err) {
        console.log(err);
      }
    };
    generateToken();
  }, [cart]);

  const nextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const backStep = () => {
    setActiveStep((prevState) => prevState - 1);
  };

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

  console.log(shippingData);

  const Form = !activeStep ? (
    <AddressForm next={next} />
  ) : (
    <PaymentForm checkoutToken={checkoutToken} backStep={backStep} />
  );

  return (
    <div className={classes.form}>
      <main>
        <Paper>
          <Typography variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep}>
            {steps.map((step) => (
              <Step key={step} className={classes.step}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? null : Form}
        </Paper>
      </main>
    </div>
  );
};

export default Checkout;

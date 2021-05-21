import React, { useState, useEffect, useCallback } from "react";
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
import { validationHandler } from "../../../Utils/Utilities";
import axios from "axios";

const steps = ["Shippping Address", "Payment Detail"];

const Checkout = ({ cart }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  const [checkoutToken, setCheckoutToken] = useState({});
  const [isValid, setIsValid] = useState();

  const classes = useStyles();

  useEffect(() => {
    let isMounted = true;
    const generateToken = async () => {
      try {
        const token = await commerce.checkout.generateToken(cart.id, {
          type: "cart",
        });
        isMounted && setCheckoutToken(token);
        console.log(token);
      } catch (err) {
        console.log(err);
      }
    };
    generateToken();
    return () => (isMounted = false);
  }, [cart]);

  const paymentHandler = (customerData) => {
    axios
      .post("http://localhost:9000/snap", customerData)
      .then((res) => {
        const url = res.data.redirect_url;
        window.location.replace(url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const nextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const backStep = () => {
    setActiveStep((prevState) => prevState - 1);
  };
  // console.log(Object.keys(isValid).length);

  console.log("validate", isValid);
  const next = useCallback(
    (data) => {
      // console.log(validationHandler(data));
      validationHandler(data);
      setIsValid(validationHandler(data));

      // setShippingData(data);
      // nextStep();
    },
    [validationHandler]
  );

  const Form = !activeStep ? (
    <AddressForm next={next} isValid={isValid} />
  ) : (
    <PaymentForm
      checkoutToken={checkoutToken}
      backStep={backStep}
      shippingData={shippingData}
      onPaymentHandler={paymentHandler}
    />
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
          {activeStep === steps.length ? null : checkoutToken && Form}
        </Paper>
      </main>
    </div>
  );
};

export default Checkout;

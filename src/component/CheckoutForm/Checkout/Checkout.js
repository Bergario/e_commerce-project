import React, { useState, useEffect } from "react";
<<<<<<< HEAD
=======
import { commerce } from "../../../lib/commerce";
>>>>>>> 2fd443e17637755331a7728027ce9a0a6032c1dc
import useStyles from "./styles";
import { commerce } from "../../../lib/commerce";

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
<<<<<<< HEAD
        const ongkir = 5000;
        setCheckoutToken(token, ongkir);
        console.log(checkoutToken);
=======
        setCheckoutToken(token);
        console.log(token);
>>>>>>> 2fd443e17637755331a7728027ce9a0a6032c1dc
      } catch (err) {
        console.log(err);
      }
    };
    generateToken();
<<<<<<< HEAD
  }, []);
=======
  }, [cart]);
>>>>>>> 2fd443e17637755331a7728027ce9a0a6032c1dc

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
          {activeStep === steps.length ? null : checkoutToken && Form}
        </Paper>
      </main>
    </div>
  );
};

export default Checkout;

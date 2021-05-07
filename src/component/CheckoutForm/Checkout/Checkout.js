import React, { useState } from "react";
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

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});

  const classes = useStyles();

  const Form = !activeStep ? <AddressForm /> : <PaymentForm />;

  const nextStep = () => {
    setActiveStep((prevState) => prevState + 1);
  };

  const next = (data) => {
    setShippingData(data);
    nextStep();
  };

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

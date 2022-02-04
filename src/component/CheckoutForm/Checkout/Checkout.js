import React, { useState, useCallback } from "react";
import cookie from "js-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import {
  Paper,
  Stepper,
  Step,
  StepLabel,
  Typography,
  Container,
} from "@material-ui/core";

import AddressForm from "../AddressForm";
import PaymentForm from "../PaymentForm";
import { validationHandler } from "../../../Utils/Utilities";
import useStyles from "./styles";

const steps = ["Shippping Address", "Payment Detail"];

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingData, setShippingData] = useState({});
  // const [checkoutToken, setCheckoutToken] = useState({});
  const [isValid, setIsValid] = useState();

  const classes = useStyles();
  const { checkoutCart } = useSelector((state) => ({
    checkoutCart: state.cart.cart,
  }));
  console.log(activeStep);

  // useEffect(() => {
  //   let isMounted = true;
  //   const generateToken = async () => {
  //     try {
  //       const token = await commerce.checkout.generateToken(cart.id, {
  //         type: "cart",
  //       });
  //       isMounted && setCheckoutToken(token);
  //       console.log(token);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   generateToken();
  //   return () => (isMounted = false);
  // }, [cart]);

  const paymentHandler = (e, customerData) => {
    e.preventDefault();
    const token = cookie.get("token");

    axios
      .post("http://localhost:9000/snap", customerData, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);

        const url = res.data.redirect_url;
        window.location.replace(url);
        console.log(url);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const nextStep = () => {
    setActiveStep((prevState) => prevState + 1);
    console.log(activeStep);
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

      setShippingData(data);
      nextStep();
    },
    [validationHandler]
  );

  const Form = !activeStep ? (
    <AddressForm next={next} isValid={isValid} />
  ) : (
    <PaymentForm
      checkoutCart={checkoutCart}
      backStep={backStep}
      shippingData={shippingData}
      onPaymentHandler={paymentHandler}
    />
  );

  return (
    <Container className={classes.form}>
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
          {activeStep === steps.length ? null : checkoutCart && Form}
        </Paper>
      </main>
    </Container>
  );
};

export default Checkout;

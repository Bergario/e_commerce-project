import React from "react";
import FormInput from "../CheckoutForm/FormInput";

const Login = () => {
  return (
    <>
      <FormInput
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <FormInput
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
    </>
  );
};

export default Login;

import React from "react";
import { Grid } from "@material-ui/core";
import FormInput from "../CheckoutForm/FormInput";

const SignUp = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormInput
            autoComplete="fname"
            name="name"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="Name"
            autoFocus
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
        </Grid>
        <Grid item xs={12}>
          <FormInput
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
        </Grid>
        <Grid item xs={12}></Grid>
      </Grid>
    </>
  );
};

export default SignUp;

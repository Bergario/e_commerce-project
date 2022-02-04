import React from "react";
import { Grid, Button, Link } from "@material-ui/core";
import FormInput from "../CheckoutForm/FormInput";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";

const SignUp = ({ error }) => {
  const classes = useStyles();
  const history = useHistory();
  console.log("test");
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
            error={error && error.email}
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
          <Grid></Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Sign Up
        </Button>
        <Grid container>
          <Grid item>
            <Link onClick={() => history.push("/auth/login")} variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(SignUp);

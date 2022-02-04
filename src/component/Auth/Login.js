import React from "react";
import FormInput from "../CheckoutForm/FormInput";
import { Grid, Button, Link } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import useStyles from "./styles";

const Login = ({ error }) => {
  const classes = useStyles();
  const history = useHistory();
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
        error={error && error.email}
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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Sign in
      </Button>
      <Grid container>
        <Grid item>
          <Link onClick={() => history.push("/auth/signup")} variant="body2">
            Don't have an account? Sign Up
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(Login);

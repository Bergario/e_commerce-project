import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  Button,
  Grid,
  CssBaseline,
  FormControlLabel,
  Link,
  Box,
  Typography,
  Container,
  Avatar,
  Checkbox,
} from "@material-ui/core";
import { LockOutlined, Copyright } from "@material-ui/icons";
import useStyles from "./styles";
import axios from "axios";

import { commerce } from "../../lib/commerce";
import Login from "./Login";
import SignUp from "./SignUp";

const Auth = () => {
  const method = useForm();
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);

  const changeLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onLogin = async (data) => {
    console.log(data);
    try {
      await axios
        .post("http://localhost:9000/auth/commerce", data)
        .then((response) => console.log(response));
    } catch (err) {
      console.log(err.message);
    }
    console.log("asu");
  };

  const onSignup = (data) => {
    try {
      axios
        .post("http://localhost:9000/auth/signup", data)
        .then((response) => console.log(response.data));
    } catch (error) {
      return error;
    }
  };

  const token = async () => {};

  useEffect(() => {
    // token();
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isLogin ? " Sign in" : "Sign up"}
        </Typography>
        <FormProvider {...method}>
          <form
            className={classes.form}
            onSubmit={method.handleSubmit((data) => onSignup(data))}
          >
            {/* FORM LOGIN & SIGNUP */}
            {isLogin ? <Login /> : <SignUp />}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isLogin ? " Sign in" : "Sign up"}
            </Button>
            <Grid container>
              <Grid item>
                <Link onClick={changeLoginHandler} variant="body2">
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Sudah punya akun? Masuk"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default Auth;

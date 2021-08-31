import React, { useEffect, useState, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Route } from "react-router-dom";
import { LockOutlined, Copyright } from "@material-ui/icons";
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
import useStyles from "./styles";

import { commerce } from "../../lib/commerce";
import Login from "./Login";
import SignUp from "./SignUp";
import Snackbar from "../Snackbar/Snackbar";
import * as actions from "../../store/actions/";
import Spinner from "../../Utils/Spinner";

const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const method = useForm();
  const classes = useStyles();
  const [singupError, setSingupError] = useState();
  const [loginError, setLoginError] = useState();
  const path = history.location.pathname;

  //REDUX
  const onAuthSignupStart = () => dispatch(actions.authSignupStart());
  const onAuthSignupSuccess = () => dispatch(actions.authSignupSuccess());
  const onAuthSignupFail = (error) => dispatch(actions.authSignupFail(error));
  const onAuthStart = () => dispatch(actions.authStart);
  const onAuthSuccess = (token, customerId) =>
    dispatch(actions.authSuccess(token, customerId));
  const onAuthFail = (error) => dispatch(actions.authFail(error));

  //REDUCER
  const { isLoading, error } = useSelector((state) => ({
    isLoading: state.auth.loading,
    error: state.auth.error,
  }));

  const onLogin = async (data) => {
    try {
      dispatch(onAuthStart());
      await axios
        .post("http://localhost:9000/auth/login", data, {
          withCredentials: true,
        })
        .then((response) => {
          const token = response.data.token;
          const expiredDate = new Date(new Date().getTime() + 3600000);
          localStorage.setItem("expiredTime", expiredDate);
          // localStorage.setItem("customer_id", user.customer_id);
          localStorage.setItem("customer_token", token);
          dispatch(onAuthSuccess(token));
          history.push("/");
        });
    } catch (error) {
      const err = error.response.data.errors;
      setLoginError(err);
      dispatch(onAuthFail(err));
    }
  };

  const onSignup = (data) => {
    // const carId = await commerce.cart.refresh().then((cart) => cart.id);
    // const dataUser = { ...data, meta: carId };
    axios
      .post("http://localhost:9000/auth/signup", data, {
        withCredentials: true,
      })
      .then((response) => {
        dispatch(onAuthSignupStart());
        console.log(response);
        dispatch(onAuthSignupSuccess());
      })
      .catch((error) => {
        const err = error.response.data.errors;
        console.log(err);
        setSingupError("Jancok");
        dispatch(onAuthSignupFail(err));
      });
  };

  const signup = useMemo(() => {
    return <SignUp error={singupError} />;
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          {path === "/auth/login" ? " Sign in" : "Sign up"}
        </Typography>
        {/* <Snackbar error={error} /> */}
        <FormProvider {...method}>
          <form
            className={classes.form}
            onSubmit={method.handleSubmit((data) =>
              path === "/auth/login" ? onLogin(data) : onSignup(data)
            )}>
            {/* FORM LOGIN & SIGNUP */}

            <Route
              path="/auth/login"
              component={() => <Login error={loginError} />}
            />
            <Route path="/auth/signup" component={() => signup} />
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

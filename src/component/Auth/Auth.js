import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
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
import * as actions from "../../store/actions/";

const Auth = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const method = useForm();
  const classes = useStyles();
  const [isLogin, setIsLogin] = useState(true);
  const [cart, setCart] = useState([]);

  //REDUX
  const onAuthSignupStart = () => dispatch(actions.authSignupStart());
  const onAuthSignupSuccess = () => dispatch(actions.authSignupSuccess());
  const onAuthSignupFail = (error) => dispatch(actions.authSignupFail(error));
  const onAuthStart = () => dispatch(actions.authStart);
  const onAuthSuccess = (token, customerId) =>
    dispatch(actions.authSuccess(token, customerId));
  const onAuthFail = (error) => dispatch(actions.authFail(error));

  const changeLoginHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const verifyLogin = async (token) => {
    try {
      axios
        .get(`http://localhost:9000/auth/commerce/${token}`)
        .then((response) => {
          const user = response.data;
          const expiredDate = new Date(new Date().getTime() + 3600000);
          localStorage.setItem("expiredTime", expiredDate);
          localStorage.setItem("customer_id", user.customer_id);
          localStorage.setItem("customer_token", user.jwt);
          dispatch(onAuthSuccess(user.jwt, user.customer_id));
          history.push("/");
        });
    } catch (err) {
      dispatch(onAuthFail(err));
    }
  };

  const onLogin = async (data) => {
    try {
      dispatch(onAuthStart());
      await axios
        .post("http://localhost:9000/auth/login", data)
        .then((response) => {
          const token = response.data.token;
          verifyLogin(token);
        });
    } catch (err) {
      console.log(err.message);
    }
    console.log("asu");
  };

  const onSignup = async (data) => {
    const carId = await commerce.cart.refresh().then((cart) => cart.id);
    const dataUser = { ...data, meta: carId };

    try {
      dispatch(onAuthSignupStart());
      axios
        .post("http://localhost:9000/auth/signup", dataUser)
        .then((response) => {
          response.status !== 204 && setIsLogin(true);
          console.log(response);
          dispatch(onAuthSignupSuccess());
        });
    } catch (error) {
      dispatch(onAuthSignupFail(error));
    }
  };

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
            onSubmit={method.handleSubmit((data) =>
              isLogin ? onLogin(data) : onSignup(data)
            )}
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

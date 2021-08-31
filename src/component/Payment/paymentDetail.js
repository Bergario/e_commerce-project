import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Grid, Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import gambar from "../../assets/bank logo/bca.png";

// const bca = require("../../assets/bank logo/bca.png");

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "100px auto",
    textAlign: "center",
  },
  paymentBox: {
    border: "3px solid #9bb8bd",
    padding: "2px",
    display: "flex",
    justifyContent: "space-around",
    alignItems: " center",
    maxWidth: "500px",
    margin: "auto",
  },
  logo: {
    height: "60px",
    width: "80px",
  },
}));

const PaymentDetail = () => {
  const classes = useStyles();
  const history = useHistory();

  const [transaction, setTransaction] = useState();

  const query = () => new URLSearchParams(history.location.search);
  const q = query();
  const id = q.get("order_id");

  console.log("status", transaction);

  useEffect(() => {
    console.log("2");
    let isMounted = true;
    axios
      .get("http://localhost:9000/testApi/" + id, {
        withCredentials: true,
      })
      .then((response) => isMounted && setTransaction(response))
      .catch((err) => console.log(err));

    return () => (isMounted = false);
  }, [id]);

  if (!transaction) return null;
  const { order_id, va_numbers } = transaction.data;
  return (
    <Container>
      <Grid className={classes.root}>
        <h3>Menunggu pembayaran</h3>
        <p>Order ID : {transaction && order_id}</p>
        <Grid className={classes.paymentBox}>
          <Grid>
            <img
              src={`${va_numbers[0].bank}.png`}
              alt="bc"
              className={classes.logo}
            />
          </Grid>
          <Grid>
            <p>virtual account</p>
            <h2>{transaction && va_numbers[0].va_number}</h2>
          </Grid>
          <Grid>
            <button>salin</button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PaymentDetail;

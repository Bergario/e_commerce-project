import React, { useEffect, useState } from "react";
import { Typography, Button, Container, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import axios from "axios";

import OrderItem from "./OrderItem/OrderItem";
import useStyle from "./styles";

const Orders = () => {
  const classes = useStyle();
  const history = useHistory();

  const [order, setOrder] = useState();

  const button = ["Semua", "Berlangsung", "Berhasil", "Tidak Berhasil"];

  const query = () => new URLSearchParams(history.location.search);
  const q = query();
  const id = q.get("order_id");

  console.log("status", order);

  useEffect(() => {
    console.log("2");
    let isMounted = true;
    axios
      .get("http://localhost:9000/order/", {
        withCredentials: true,
      })
      .then((response) => isMounted && setOrder(response.data))
      .catch((err) => console.log(err));

    return () => (isMounted = false);
  }, []);

  return (
    <Container maxWidth="lg">
      <div className={classes.toolbar}>
        <Typography variant="h5">Daftar Transaksi</Typography>
        <div className={classes.order}>
          <Grid
            item
            sm={12}
            style={{ display: "flex" }}
            alignItems="center"
            justify="flex-start"
          >
            <Typography variant="h6" style={{ display: "inline-block" }}>
              Status
            </Typography>
            {button.map((btn) => {
              return (
                <Button
                  key={btn}
                  className={classes.button}
                  variant="outlined"
                  color="primary"
                  size="medium"
                >
                  <span className={classes.buttonText}>{btn}</span>
                </Button>
              );
            })}
          </Grid>
          {order &&
            order.map((orders) => {
              return <OrderItem orderId={orders._id} />;
            })}
        </div>
      </div>
    </Container>
  );
};

export default Orders;

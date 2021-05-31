import React from "react";
import { Typography, Button, Container } from "@material-ui/core";

import OrderItem from "./OrderItem/OrderItem";
import useStyle from "./styles";

const Orders = () => {
  const classes = useStyle();

  const button = ["Semua", "Berlangsung", "Berhasil", "Tidak Berhasil"];
  return (
    <main>
      <div className={classes.toolbar}>
        <Typography variant="h5">Daftar Transaksi</Typography>
        <div className={classes.order}>
          <Typography variant="h6" style={{ display: "inline-block" }}>
            Status
          </Typography>
          {button.map((btn) => {
            return (
              <Button
                className={classes.button}
                variant="outlined"
                color="secondary"
                size="medium"
              >
                {btn}
              </Button>
            );
          })}
          <OrderItem />
        </div>
      </div>
    </main>
  );
};

export default Orders;

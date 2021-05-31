import React from "react";
import { Grid, Typography } from "@material-ui/core";

import useStyle from "../styles";

const OrderItem = () => {
  const classes = useStyle();
  return (
    <Grid spacing={4} className={classes.orderItemBox}>
      <Grid>
        <Typography variant="subtitle2" style={{ display: "inline-block" }}>
          Belanja 29 Mei 2021
        </Typography>
        <span className={classes.labelStatus}>selesai</span>
      </Grid>
      <div className={classes.orderItemDetail}>
        <div className={classes.itemContentCol}>
          <div style={{ display: "flex" }}>
            <div>
              <img
                className={classes.imgOrder}
                src="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2021/3/1/7c795e57-e204-404d-b166-b92cd6298d10.jpg"
              />
            </div>
            <div style={{ width: "100%" }}>
              <div>
                <h4>Laptop Dewa</h4>
              </div>
              <div>
                <p>Judul belum ada</p>
              </div>
            </div>
          </div>
        </div>
        <Grid>test</Grid>
      </div>
    </Grid>
  );
};

export default OrderItem;

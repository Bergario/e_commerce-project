import React from "react";
import { Grid, Typography, CardMedia, Button } from "@material-ui/core";
import { LocalMall } from "@material-ui/icons/";
import { Link } from "react-router-dom";

import useStyle from "../styles";

const OrderItem = (props) => {
  const classes = useStyle();
  console.log("prop", props);

  return (
    <Grid className={classes.orderItemBox}>
      <Grid align-items="center" style={{ display: "flex" }}>
        <LocalMall fontSize="small" style={{ marginRight: "5px" }} />
        <Typography variant="subtitle2" style={{ display: "inline-block" }}>
          Belanja 29 Mei 2021
        </Typography>
        <span className={classes.labelStatus}>selesai</span>
      </Grid>
      <div className={classes.orderItemDetail}>
        <div className={classes.itemContentCol}>
          <div style={{ display: "flex" }}>
            <div>
              <CardMedia
                className={classes.imgOrder}
                image="https://ecs7-p.tokopedia.net/img/cache/200-square/VqbcmM/2021/3/1/7c795e57-e204-404d-b166-b92cd6298d10.jpg"
              />
            </div>
            <div style={{ width: "100%", padding: "10px" }}>
              <Grid>
                <h4 style={{ marginBottom: "5px" }}>Laptop Dewa</h4>
              </Grid>
              <Grid>
                <Typography variant="caption">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Asperiores ea eligendi cumque illo atque nesciunt deserunt
                  sequi eveniet earum similique itaque repellendus consectetur
                </Typography>
              </Grid>
            </div>
          </div>
        </div>
        <Grid className={classes.priceDetail}>
          <Grid>
            <Typography variant="body2">Total Belanja</Typography>
          </Grid>
          <Grid>
            <Typography variant="body2">Rp 50.000</Typography>
          </Grid>
        </Grid>
      </div>
      <Button
        className={classes.buttonDetailTransaksi}
        to={"/status?order_id=" + props.orderId}
        component={Link}
      >
        Lihat Detail Transaksi
      </Button>
    </Grid>
  );
};

export default OrderItem;

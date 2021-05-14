import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ checkoutToken }) => {
  const products = checkoutToken.live.line_items;
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {products.map((product) => (
          <ListItem style={{ padding: "10px" }} key={product.name}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${product.quantity}`}
            />
            <Typography>{`Rp. ${product.line_total.formatted}`}</Typography>
          </ListItem>
        ))}
        <hr />
        <ListItem style={{ padding: "10px" }}>
          <ListItemText primary="Total" />
          <Typography
            variant="subtitle1"
            style={{ fontWeight: "700" }}
          >{`Rp. ${checkoutToken.live.subtotal.formatted}`}</Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;

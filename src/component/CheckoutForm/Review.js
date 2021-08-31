import React from "react";
import { Typography, List, ListItem, ListItemText } from "@material-ui/core";

const Review = ({ checkoutCart }) => {
  const products = checkoutCart.line_items;
  console.log("review", checkoutCart);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order Summary
      </Typography>
      <List disablePadding>
        {products.map(({ product, _id, quantity }) => (
          <ListItem style={{ padding: "10px" }} key={_id}>
            <ListItemText
              primary={product.name}
              secondary={`Quantity: ${quantity}`}
            />
            <Typography>{`Rp. ${product.price}`}</Typography>
          </ListItem>
        ))}
        <ListItem style={{ padding: "10px" }}>
          <ListItemText primary="Ongkos kirim" />
          <Typography>{`Rp. ${checkoutCart.ongkir}`}</Typography>
        </ListItem>
        <hr />
        <ListItem style={{ padding: "10px" }}>
          <ListItemText primary="Total Harga" />
          <Typography
            variant="subtitle1"
            style={{
              fontWeight: "700",
            }}>{`Rp. ${checkoutCart.total_price}`}</Typography>
        </ListItem>
      </List>
    </>
  );
};

export default Review;

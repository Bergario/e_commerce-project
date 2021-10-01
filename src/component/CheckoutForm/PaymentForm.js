import React from "react";
import { Button, Divider, Container } from "@material-ui/core";

import Review from "./Review";

const PaymentForm = ({
  checkoutCart,
  backStep,
  shippingData,
  onPaymentHandler,
}) => {
  console.log("de", checkoutCart);
  const itemDetails = checkoutCart.line_items.map(({ product, quantity }) => {
    return {
      product_id: product._id,
      price: product.price,
      quantity,
      name: product.name,
    };
  });

  const ongkir = shippingData.ongkir;
  const total_price = checkoutCart.total_price + shippingData.ongkir;
  itemDetails.push({ name: "ongkir", quantity: 1, price: ongkir });

  const dataCustomer = {
    // order_id: checkoutCart.id,
    gross_amount: total_price,
    itemDetails,
    first_name: shippingData.name,
    phone: shippingData.telepon,
    address: shippingData.address,
    city: shippingData.kabupaten,
    provinces: shippingData.provinsi,
    ongkir,
  };

  return (
    <Container>
      <Review checkoutCart={{ ...checkoutCart, total_price, ongkir }} />
      {/* <Divider /> */}
      <form onSubmit={(event) => onPaymentHandler(event, dataCustomer)}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 10px",
          }}
        >
          {/* <Button variant="outline" onClick={() => backStep()}> */}
          <Button variant="contained" onClick={() => backStep()}>
            back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Pay
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default PaymentForm;

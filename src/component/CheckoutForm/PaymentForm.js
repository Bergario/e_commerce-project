import React from "react";
import { Button, Divider } from "@material-ui/core";

import Review from "./Review";

const PaymentForm = ({
  checkoutToken,
  backStep,
  shippingData,
  onPaymentHandler,
}) => {
  const itemDetails = checkoutToken.live.line_items.map((product) => {
    return {
      id: product.id,
      price: product.price.raw,
      quantity: product.quantity,
      name: product.product_name,
    };
  });
  console.log(itemDetails);

  const dataCustomer = {
    order_id: checkoutToken.id,
    gross_amount: checkoutToken.live.subtotal.raw,
    itemDetails,
    first_name: shippingData.name,
    email: shippingData.email,
    phone: shippingData.telepon,
    address: shippingData.address,
    city: shippingData.kabupaten,
    provinces: shippingData.provinsi,
    postal_code: shippingData.kode_pos,
  };

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <form onSubmit={() => onPaymentHandler(dataCustomer)}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outline" onClick={() => backStep()}>
            Back
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Pay
          </Button>
        </div>
      </form>
    </>
  );
};

export default PaymentForm;

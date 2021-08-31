import React from "react";
import { useSelector } from "react-redux";
import {
  Link,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Title from "../Title";
import ActionMenu from "./actionMenu";

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  img: {
    width: "50px",
    marginRight: theme.spacing(3),
  },
  product: {
    display: "flex",
    alignItems: "center",
  },
}));

const ListProduct = () => {
  const classes = useStyles();

  const { products } = useSelector((state) => ({
    products: state.product.product,
  }));

  return (
    <React.Fragment>
      <Title>Daftar Product</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Harga</TableCell>
            <TableCell>Stok</TableCell>
            <TableCell>Kategori</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Grid className={classes.product}>
                  <img
                    className={classes.img}
                    src={product.productImage}
                    alt=""
                  />
                  {product.name}
                </Grid>
              </TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell align="right">
                <ActionMenu />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ListProduct;

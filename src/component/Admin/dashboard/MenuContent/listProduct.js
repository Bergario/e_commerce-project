import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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
import { priceFormat } from "../../../../Utils/Utilities";

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
  tableRow: {
    "& td": {
      fontSize: "12px",
      fontWeight: 600,
    },
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
            <TableRow className={classes.tableRow} key={product.id}>
              <TableCell>
                <Grid className={classes.product}>
                  <div>
                    <img
                      className={classes.img}
                      src={product.productImage[0]}
                      alt=""
                    />
                  </div>
                  {product.name}
                </Grid>
              </TableCell>
              <TableCell>{priceFormat(product.price)}</TableCell>
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
          See more products
        </Link>
      </div>
    </React.Fragment>
  );
};

export default ListProduct;

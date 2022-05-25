import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Link,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Popover,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Title from "../Title";
import ActionMenu from "./actionMenu";
import { priceFormat } from "../../../../Utils/Utilities";
import * as actions from "../../../../store/actions/index";

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

  const dispatch = useDispatch();

  // const onProductFetch = () => dispatch(actions.product);

  // useEffect(() => {
  //   onProductFetch();
  // }, []);

  return (
    <React.Fragment>
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
          {products &&
            products.map((product) => (
              <TableRow className={classes.tableRow} key={product.id}>
                <TableCell>
                  <Grid className={classes.product}>
                    <div>
                      <img
                        className={classes.img}
                        src={product.productImage[0]}
                        alt={product.name}
                      />
                    </div>
                    {product.name}
                  </Grid>
                </TableCell>
                <TableCell>{priceFormat(product.price)}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.category.name}</TableCell>
                <TableCell align="right">
                  <ActionMenu product={product} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <div>See more products</div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(ListProduct);

import React, { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  Paper,
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import * as actions from "../../../../../store/actions/index";

// import Title from "../Title";
import AddProductForm from "./FormProduct/addProductForm";
import EditProductForm from "./FormProduct/editProductForm";
import ListProduct from "./listProduct";
import Title from "../../Title";
import SearchBar from "../Search/searchBar";
import Pagination from "@material-ui/lab/Pagination";

const StyledOptionMenu = withStyles({
  MuiOutlinedInputRoot: "10px",
})((props) => {
  <TextField {...props}></TextField>;
});

const useStyles = makeStyles((theme) => ({
  addIcon: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "flex-end",
    whiteSpace: "nowrap",
    minWidth: "520px",
  },
  container: {
    minHeight: "300px",
  },
  test: {
    "& .MuiOutlinedInput-root": { marginRight: "10px" },
    width: "20ch",
  },
  icon: {
    transform: "translateY(-4px)",
  },
  root: {
    "& .MuiOutlinedInput-root": { marginRight: "10px" },
  },
  paging: {
    display: "flex",
    justifyContent: "center",
    padding: "10px",
  },
}));

function Product({ css }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  //Redux
  const { editFormHandler, category, products } = useSelector((state) => ({
    editFormHandler: state.product.showEditForm,
    category: state.category.category,
    products: state.product.product,
  }));

  const [showForm, setShowForm] = useState(false);
  const [page, setPage] = useState(1);
  const [skipPage, setSkipPage] = useState(0);

  //REDUX
  const onEditFormHandler = () => {
    dispatch(actions.showEditProductForm());
  };
  const onFetchProducts = () => {
    dispatch(actions.product());
  };
  const onProductSearch = (keyWords) => {
    dispatch(actions.productSearch(keyWords));
  };
  console.log("KENOPO");

  const showHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  const change = (e, value) => {
    setPage(value);
    setSkipPage(value * 5 - 5);
  };

  // Pagination
  const totalProducts = products.length != 0 ? products[0].countProduct : 5;
  let countPage = Math.floor(totalProducts / 5);
  if (totalProducts % 5 !== 0) {
    countPage += 1;
  }

  console.log("parent", editFormHandler, category, showForm);

  const AddProductDialog = useCallback(
    () => (
      <Dialog
        maxWidth="sm"
        open={showForm}
        onClose={showHandler}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
          <AddProductForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => showHandler()} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    ),
    [showForm]
  );

  const EditProductDialog = useCallback(
    () => (
      <Dialog
        maxWidth="sm"
        open={editFormHandler}
        onClose={onEditFormHandler}
        aria-labelledby="max-width-dialog-title"
      >
        <DialogContent>
          <EditProductForm />
        </DialogContent>
        <DialogActions>
          <Button onClick={onEditFormHandler} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    ),
    [editFormHandler]
  );

  return (
    <React.Fragment>
      <Title>Daftar Product</Title>
      <SearchBar
        showHandler={showHandler}
        showForm={showForm}
        fetchAll={onFetchProducts}
        searchAction={(keyword) => onProductSearch(keyword)}
        skipPage={skipPage}
      />
      <Paper classes={css.paper}>
        <Grid className={classes.container}>
          <AddProductDialog />
          <EditProductDialog />
          <ListProduct products={products} />
          {totalProducts >= 10 && (
            <Pagination
              className={classes.paging}
              count={countPage}
              page={page}
              onChange={change}
            />
          )}
        </Grid>
      </Paper>
    </React.Fragment>
  );
}

export default React.memo(Product);

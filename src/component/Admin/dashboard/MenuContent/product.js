import React, { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Grid,
  Fab,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import * as actions from "../../../../store/actions/index";

// import Title from "../Title";
import AddProductForm from "./FormProduct/addProductForm";
import EditProductForm from "./FormProduct/editProduct";
import ListProduct from "./listProduct";

const useStyles = makeStyles((theme) => ({
  addIcon: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "flex-end",
  },
  container: {
    minHeight: "300px",
  },
}));

export default function Product() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { editFormHandler } = useSelector((state) => ({
    editFormHandler: state.product.showEditForm,
  }));

  const [showForm, setShowForm] = useState(false);

  //REDUX
  const onEditFormHandler = () => {
    dispatch(actions.showEditProductForm());
  };

  const showHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  console.log("parent");

  const AddProduct = () => (
    <Grid className={classes.addIcon}>
      <Fab color="primary" size="medium" onClick={showHandler}>
        {showForm ? <RemoveIcon /> : <AddIcon />}
      </Fab>
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
    </Grid>
  );

  const EditProduct = useCallback(
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
      <Grid className={classes.container}>
        <AddProduct />
        <EditProduct />
        <ListProduct />
      </Grid>
    </React.Fragment>
  );
}

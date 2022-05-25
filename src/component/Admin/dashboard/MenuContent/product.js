import React, { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  Grid,
  Fab,
  Button,
  Dialog,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import * as actions from "../../../../store/actions/index";

// import Title from "../Title";
import AddProductForm from "./FormProduct/addProductForm";
import EditProductForm from "./FormProduct/editProductForm";
import ListProduct from "./listProduct";
import Title from "../Title";

const useStyles = makeStyles((theme) => ({
  addIcon: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "flex-end",
  },
  container: {
    minHeight: "300px",
  },
  test: {
    width: "25ch",
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
  const MenuCategory = () => (
    <TextField
      id="outlined-select-currency"
      select
      label="category"
      // value={currency}
      // onChange={handleChange}
      // helperText="Please select your currency"
      variant="outlined"
      size="small"
      SelectProps={{
        native: true,
      }}
      className={classes.test}
    >
      <option key="tesdt" value="test">
        Jambu
      </option>
      <option key="tesdt" value="test">
        Apel
      </option>
      <option key="tesdt" value="test">
        Mangga
      </option>
    </TextField>
  );

  const AddProduct = () => (
    <Grid className={classes.addIcon}>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        size="small"
      />
      <MenuCategory />
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
        <Title>Daftar Product</Title>
        <AddProduct />
        <EditProduct />
        <ListProduct />
      </Grid>
    </React.Fragment>
  );
}

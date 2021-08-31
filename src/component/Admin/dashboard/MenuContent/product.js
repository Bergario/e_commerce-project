import React, { useState } from "react";

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

// import Title from "../Title";
import AddProductform from "./addProductForm";
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
  const [showForm, setShowForm] = useState(false);

  const showHandler = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <Grid className={classes.container}>
        <Grid className={classes.addIcon}>
          <Fab color="primary" size="medium" onClick={showHandler}>
            {showForm ? <RemoveIcon /> : <AddIcon />}
          </Fab>
          <Dialog
            maxWidth="sm"
            open={showForm}
            onClose={showHandler}
            aria-labelledby="max-width-dialog-title">
            <DialogContent>
              <AddProductform />
            </DialogContent>
            <DialogActions>
              <Button onClick={showHandler} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
        <ListProduct />
      </Grid>
    </React.Fragment>
  );
}

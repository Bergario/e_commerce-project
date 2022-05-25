import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  Link,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Fab,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  TextField,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import Title from "../Title";
import FormInput from "../../../CheckoutForm/FormInput";
import ActionMenu from "./actionMenu";

// Generate Order Data

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  addIcon: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
  },
  container: {
    minHeight: "300px",
  },
}));

const Category = React.memo(() => {
  const classes = useStyles();
  const method = useForm();
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState();

  useEffect(() => {
    let isMounted = true;
    axios
      .get("http://localhost:9000/category/")
      .then((response) => {
        isMounted && setCategory(response.data);
      })
      .catch((err) => console.log(err));

    return () => (isMounted = false);
  }, []);

  const showHandler = useCallback(() => {
    setShowForm((prevState) => !prevState);
  }, []);

  const uploadCategoryHandler = useCallback(
    (data) => {
      axios
        .post("http://localhost:9000/category/", data)
        .then((response) => {
          method.reset();
          console.log(response);
        })
        .catch((err) => console.log(err));
    },
    [method]
  );
  console.log("category");
  return (
    <React.Fragment>
      <Grid className={classes.container}>
        <Title>Daftar Kategori</Title>
        <Grid className={classes.addIcon}>
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            size="small"
          />
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
              <FormProvider {...method}>
                <form
                  id="product-form"
                  className={classes.form}
                  onSubmit={method.handleSubmit((data) =>
                    uploadCategoryHandler(data)
                  )}
                >
                  <Title>Tambah category</Title>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <FormInput
                        required
                        fullWidth
                        id="category"
                        label="Kategori"
                        name="category"
                        autoComplete="category"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormInput
                        fullWidth
                        id="outlined-textarea"
                        label="Deskripsi (optional)"
                        name="description"
                        autoComplete="description"
                        multiline
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button type="submit" variant="contained" color="primary">
                        save
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </FormProvider>
            </DialogContent>
            <DialogActions>
              <Button onClick={showHandler} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>CATEGORY</TableCell>
              <TableCell>DESCRIPTION</TableCell>
              <TableCell align="right">ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {category &&
              category.map((row) => (
                <TableRow key={row.category_id}>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.description}</TableCell>
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
      </Grid>
    </React.Fragment>
  );
});

export default Category;

import React, { useState, useEffect, useCallback } from "react";
import { useForm, FormProvider } from "react-hook-form";
import axios from "axios";

import { Grid, Button } from "@material-ui/core";
import FormInput from "../../../../../CheckoutForm/FormInput";
import Title from "../../../Title";

const AddCategoryForm = ({ classes }) => {
  const method = useForm();

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
  return (
    <FormProvider {...method}>
      <form
        id="product-form"
        className={classes.form}
        onSubmit={method.handleSubmit((data) => uploadCategoryHandler(data))}
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
  );
};

export default AddCategoryForm;

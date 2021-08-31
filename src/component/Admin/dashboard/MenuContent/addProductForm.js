import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm, FormProvider } from "react-hook-form";
import { Grid, Button, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import cookie from "js-cookie";

import Title from "../Title";
import FormInput from "../../../CheckoutForm/FormInput";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
}));

const AddProductForm = () => {
  const method = useForm();
  const classes = useStyles();

  const [selectedFile, setSelectedFile] = useState();
  const [category, setCategory] = useState();

  const fileSelectedHandler = (e) => {
    setSelectedFile(e.target.files[0]);
  };

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

  const uploadProductHandler = (data) => {
    const token = cookie.get("token");

    const dataProduct = new FormData();
    dataProduct.append("productImage", selectedFile);
    for (const key in data) {
      dataProduct.append(key, data[key]);
    }

    axios
      .post("http://localhost:9000/product/", dataProduct, {
        headers: `Bearer ${token}`,
      })
      .then((response) => {
        method.reset();
        document.getElementById("product-form").reset();
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  return (
    <FormProvider {...method}>
      <form
        id="product-form"
        className={classes.form}
        onSubmit={method.handleSubmit((data) => uploadProductHandler(data))}>
        <Title>Tambah product</Title>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormInput
              required
              fullWidth
              id="productName"
              label="Nama product"
              name="name"
              autoComplete="productName"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              required
              fullWidth
              id="price"
              label="Harga"
              name="price"
              autoComplete="price"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              required
              fullWidth
              id="stock"
              label="Stok"
              name="stock"
              autoComplete="stock"
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              fullWidth
              id="tag"
              label="Tag"
              name="tag"
              autoComplete="tag"
              // multiline
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              fullWidth
              id="description"
              label="Deskripsi"
              name="description"
              // multiline
              autoFocus
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              fullWidth
              id="category"
              label="Kategori"
              select
              name="category"
              autoComplete="category"
              autoFocus>
              <MenuItem value="">-</MenuItem>
              {category &&
                category.map((res) => {
                  return (
                    <MenuItem key={res.category_id} value={res.category_id}>
                      {res.category}
                    </MenuItem>
                  );
                })}
            </FormInput>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button component="label" variant="contained">
              Upload gambar
              <input
                name="productImage"
                type="file"
                hidden
                onChange={fileSelectedHandler}
              />
            </Button>
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

export default AddProductForm;

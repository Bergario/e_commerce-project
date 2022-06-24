import React, { useState, useEffect } from "react";
import axios from "axios";
import Compressor from "compressorjs";
import { useForm, FormProvider } from "react-hook-form";
import { Grid, Button, MenuItem } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import cookie from "js-cookie";

import Title from "../../../Title";
import FormInput from "../../../../../CheckoutForm/FormInput";
import PreviewImage from "./ImagePreview";
import useStyles from "./styles";

const AddProductForm = () => {
  const method = useForm();
  const classes = useStyles();

  const [selectedFile, setSelectedFile] = useState([]);
  const [category, setCategory] = useState();
  const [tags, setTags] = useState([]);

  const fileSelectedHandler = (e) => {
    const imageFiles = e.target.files;
    for (let i = 0; i <= imageFiles.length - 1; i++) {
      new Compressor(imageFiles[i], {
        quality: 0.6,
        success: (imgFile) =>
          setSelectedFile((prevFile) => [...prevFile, imgFile]),
      });
    }
  };

  const deleteImageHandler = (img, index) => {
    console.log("new image", index);
    selectedFile.splice(index, 1);
    setSelectedFile([...selectedFile]);
  };

  const addTagsHandler = (e) => {
    e.preventDefault();
    const tag = e.target.form[3].value;
    const whiteSpace = "^\\s+$";
    if (!tag.match(whiteSpace) && tag.length !== 0) {
      setTags([...tags, tag]);
    }
    e.target.form[3].value = "";
  };

  const removeTagsHandler = (index) => {
    tags.splice(index, 1);
    setTags([...tags]);
  };

  const uploadProductHandler = (data) => {
    const token = cookie.get("token");

    const dataProduct = new FormData();

    //Input images array to form data
    selectedFile.map((imageFile) => {
      dataProduct.append("productImage", imageFile);
    });

    //Input tags array to form data
    tags.map((tag) => {
      dataProduct.append("tags", tag);
    });

    //input data from table to form data
    for (const key in data) {
      dataProduct.append(key, data[key]);
    }
    console.log(data);
    axios
      .post("http://localhost:9000/product/", dataProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        method.reset();
        setSelectedFile([]);
        setTags([]);
        setCategory();
        // document.getElementById("product-form").reset();
        console.log(response.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  const AddImageButton = () => (
    <Button component="label" variant="contained" className={classes.imgButton}>
      <input
        name="productImage"
        type="file"
        hidden
        multiple
        onChange={fileSelectedHandler}
      />
      <div className={classes.AddImage}>
        <img className={classes.img} src="../../noProduct.jpg" />
      </div>
    </Button>
  );

  const ListTags = () =>
    tags &&
    tags.map((tag, i) => (
      <li key={i} className={classes.listTags}>
        <span>{tag}</span>
        <CancelIcon
          onClick={() => removeTagsHandler(i)}
          className={classes.closeIcon}
        />
      </li>
    ));

  useEffect(() => {
    let isMounted = true;
    axios
      .get("http://localhost:9000/category/")
      .then((response) => {
        isMounted && setCategory(response.data);
      })
      .catch((err) => console.log(err));

    return () => (isMounted = false);
  }, [tags]);

  return (
    <FormProvider {...method}>
      <form
        id="product-form"
        className={classes.form}
        onSubmit={method.handleSubmit((data) => uploadProductHandler(data))}
      >
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
            <ul className={classes.ul}>
              <ListTags />
            </ul>
            <input placeholder="Tags" className={classes.inputTags} />
            {/* <FormInput
              fullWidth
              id="tags"
              label="Tags"
              name="tag"
              autoComplete="tag"
              multiline
              autoFocus
              onKeyUp={addTagsHandler}
            /> */}
            <button
              className={classes.addTagsButton}
              onClick={(e) => addTagsHandler(e)}
            >
              Add
            </button>
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
              autoFocus
            >
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
          <Grid className={classes.overflowImage}>
            {!selectedFile.length ||
              selectedFile.map((img, i) => {
                return (
                  <PreviewImage
                    img={img}
                    ndex={i}
                    onDeleteImage={(img, i) => deleteImageHandler(img, i)}
                  />
                );
              })}
            {selectedFile.length < 4 && <AddImageButton img={null} />}
            {/* {<AddImageButton img={selectedFile} />} */}
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

export default React.memo(AddProductForm);

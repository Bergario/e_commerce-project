import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Compressor from "compressorjs";
import { useForm, FormProvider } from "react-hook-form";
import {
  Grid,
  Button,
  MenuItem,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import cookie from "js-cookie";

import Title from "../../../Title";
import FormInput from "../../../../../CheckoutForm/FormInput";
import PreviewImage from "./ImagePreview";

import * as actions from "../../../../../../store/actions/index";
import useStyles from "./styles";

const EditProductForm = () => {
  const { product, editFormHandler } = useSelector((state) => ({
    product: state.product.productById,
    editFormHandler: state.product.showEditForm,
  }));

  //   REDUX
  const dispatch = useDispatch();
  const onEditFormHandler = () => {
    dispatch(actions.showEditProductForm());
  };

  const method = useForm();
  const classes = useStyles();

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState([]);
  const [oldFile, setOldFile] = useState([]);
  const [category, setCategory] = useState();
  const [tags, setTags] = useState([]);

  console.log("start rendering", product);

  useEffect(() => {
    console.log("useEffect");
    setSelectedCategory(product.category.category_id);
    setTags([...product.tags]);

    const images = product.productImage;

    images.map((image) => {
      setOldFile((prevFile) => [...prevFile, image]);
    });
  }, [product]);

  const fileSelectedHandler = useCallback(
    (e) => {
      const imageFiles = e.target.files;
      console.log(imageFiles);
      for (let i = 0; i <= imageFiles.length - 1; i++) {
        new Compressor(imageFiles[i], {
          quality: 0.6,
          success: (imgFile) =>
            setSelectedFile((prevFile) => [...prevFile, imgFile]),
        });
      }
    },
    [selectedFile]
  );
  const deleteImageHandler = (img, index) => {
    if (typeof img == "string") {
      console.log("old Image", index);
      oldFile.splice(index, 1);
      setOldFile([...oldFile]);
    } else {
      console.log("new image", index);
      selectedFile.splice(index, 1);
      setSelectedFile([...selectedFile]);
    }
  };

  const categoryChangeHandler = useCallback((cat) => {
    console.log(cat);
    setSelectedCategory(cat);
  }, []);

  const addTagsHandler = useCallback(
    (e) => {
      e.preventDefault();
      const tag = e.target.form[3].value;
      const whiteSpace = "^\\s+$";
      if (!tag.match(whiteSpace) && tag.length !== 0) {
        setTags([...tags, tag]);
      }
      e.target.form[3].value = "";
    },
    [tags]
  );

  const removeTagsHandler = useCallback(
    (index) => {
      tags.splice(index, 1);
      setTags([...tags]);
    },
    [tags]
  );

  const uploadProductHandler = (data) => {
    const token = cookie.get("token");

    const dataProduct = new FormData();

    // Input product ID
    dataProduct.append("productId", product.id);

    //Input new images array to form data
    selectedFile.map((imageFile) => {
      dataProduct.append("productImage", imageFile);
    });

    //Input old images array to form data
    oldFile.map((imageFile) => {
      dataProduct.append("oldProductImage", imageFile);
    });

    //Input tags array to form data
    tags.map((tag) => {
      dataProduct.append("tags", tag);
    });

    // Input Category to form data
    dataProduct.append("category", selectedCategory);

    //input data from table to form data
    for (const key in data) {
      dataProduct.append(key, data[key]);
    }
    console.log(data);
    axios
      .patch("http://localhost:9000/product/", dataProduct, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        method.reset();
        setSelectedFile([]);
        setTags([]);
        setCategory();
        onEditFormHandler();
        // document.getElementById("product-form").reset();
        console.log(response.data);
      })
      .catch((err) => console.log(err.response.data));
  };

  const AddImageButton = useCallback(
    () => (
      <Button
        component="label"
        variant="contained"
        className={classes.imgButton}
      >
        <input
          name="productImage"
          type="file"
          hidden
          multiple
          onChange={fileSelectedHandler}
        />
        <div className={classes.AddImage}>
          <img className={classes.img} src="../../Add_product.png" />
        </div>
      </Button>
    ),
    []
  );

  const ListTags = () =>
    tags &&
    tags.map(
      (tag, i) => (
        <li key={i} className={classes.listTags}>
          <span>{tag}</span>
          <CancelIcon
            onClick={() => removeTagsHandler(i)}
            className={classes.closeIcon}
          />
        </li>
      ),
      []
    );

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
        // onSubmit={method.handleSubmit((data) => console.log(data))}
      >
        <Title>Edit product</Title>

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
              defaultValue={product.name}
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
              defaultValue={product.price}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              className={classes.input}
              required
              fullWidth
              id="stock"
              label="Stok"
              name="stock"
              autoComplete="stock"
              autoFocus
              defaultValue={product.stock}
            />
          </Grid>
          <Grid item xs={12}>
            <ul className={classes.ul}>
              <ListTags />
            </ul>
            <input placeholder="Tags" className={classes.inputTags} />
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
              defaultValue={product.description}
            />
          </Grid>
          <Grid item xs={12}>
            <FormInput
              fullWidth
              id="category"
              label="Kategori"
              select
              name=""
              autoComplete="category"
              value={selectedCategory}
            >
              {category &&
                category.map((res) => (
                  <MenuItem
                    onClick={() => categoryChangeHandler(res.category_id)}
                    key={res.category_id}
                    value={res.category_id}
                  >
                    {res.category}
                  </MenuItem>
                ))}
            </FormInput>
          </Grid>
          <Grid className={classes.overflowImage}>
            {/* <Grid item xs={12} sm={12}> */}
            {!oldFile.length ||
              oldFile.map((img, i) => {
                return (
                  <PreviewImage
                    img={img}
                    index={i}
                    onDeleteImage={(img, i) => deleteImageHandler(img, i)}
                  />
                );
              })}
            {!selectedFile.length ||
              selectedFile.map((img, i) => {
                return (
                  <PreviewImage
                    img={img}
                    index={i}
                    onDeleteImage={(img, i) => deleteImageHandler(img, i)}
                  />
                );
              })}
            {!(oldFile.length == 0 && selectedFile.length == 0) ? (
              selectedFile.length + oldFile.length < 5 && <AddImageButton />
            ) : (
              <AddImageButton />
            )}
            {/* </Grid> */}
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

export default React.memo(EditProductForm);

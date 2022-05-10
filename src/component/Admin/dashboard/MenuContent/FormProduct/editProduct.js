import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Compressor from "compressorjs";
import { useForm, FormProvider } from "react-hook-form";
import { Grid, Button, MenuItem, IconButton, Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import cookie from "js-cookie";

import Title from "../../Title";
import FormInput from "../../../../CheckoutForm/FormInput";
import ActionImage from "./actionImage";
import PreviewImage from "./ImagePreview";

import * as actions from "../../../../../store/actions/index";
import { PanoramaFishEyeRounded } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  input: {
    color: "red",
    fontFamily: "system-ui !important",
  },
  img: {
    height: "100px",
    // display: "block",
    // "&:hover": {
    //   transition: 0.5,
    //   opacity: 0.2,
    // },
  },
  AddImage: {
    height: "100px",
    overflow: "hidden",
  },
  imgButton: {
    // color: "transparent",
    backgroundColor: "transparent",
    borderColor: "transparent",
    padding: 0,
    marginRight: "17px",
    position: "absolute",
  },
  ul: {
    listStyleType: "none",
    display: "flex",
  },
  listTags: {
    marginRight: "10px",
    marginBottom: "10px",
    backgroundColor: "#425be5",
    color: "#fff",
    padding: "3px",
    borderRadius: "5px",
    fontSize: "11px",
  },
  closeIcon: {
    fontSize: "0.7rem ",
    cursor: "pointer",
    verticalAlign: "text-bottom",
    marginLeft: "2px",
  },
  addTagsButton: {
    backgroundColor: "#425be5",
    border: "none",
    borderRadius: "3px",
    color: "#fff",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#3651e3",
    },
  },
  inputTags: {
    width: "100%",
    boxSizing: " border-box",
    border: "none",
    paddingBottom: "5px",
    borderBottom: "1px solid #949494",
    "&:focus-visible": {
      outline: "none",
    },
    "&:hover": {
      borderBottom: "2px solid #141313",
    },
    "&:focus": {
      borderBottom: "2px solid #4c5dbd",
    },
  },
  actionImage: {
    position: "absolute",
    bottom: "75%",
    left: "80%",
  },
  overflowImage: {
    overflow: "auto",
    whiteSpace: "nowrap",
    position: "sticky",
    width: "100%",
  },
  //   }
}));

const EditProductForm = () => {
  const { product } = useSelector((state) => ({
    product: state.product.productById,
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

  console.log("start rendering");
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

  // const PreviewImage = useCallback(
  //   ({ img, index }) => (
  //     <div style={{ marginRight: "10px", display: "inline-block" }}>
  //       <div
  //         style={{ position: "relative" }}
  //         onMouseEnter={() => handleOpenMenuAction(index)}
  //         onMouseLeave={() => handleCloseMenuAction()}
  //       >
  //         <img
  //           className={classes.img}
  //           src={typeof img == "string" ? img : URL.createObjectURL(img)}
  //           style={{ opacity: showMenuAction == index && "0.7" }}
  //         />
  //         {/* <ActionImage showMenuAction={showMenuAction} index={index} /> */}
  //         <MoreHorizIcon
  //           aria-hiddden={false}
  //           color="action"
  //           style={{
  //             position: "absolute",
  //             right: "5%",
  //             display: showMenuAction == index || "none",
  //             cursor: "pointer",
  //           }}
  //         />
  //       </div>
  //     </div>
  //   ),
  //   []
  // );

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
    [product]
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
                return <PreviewImage img={img} index={i} />;
              })}
            {!selectedFile.length ||
              selectedFile.map((img, i) => {
                return <PreviewImage img={img} index={i} />;
              })}
            {selectedFile.length + oldFile.length < 4 && <AddImageButton />}
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

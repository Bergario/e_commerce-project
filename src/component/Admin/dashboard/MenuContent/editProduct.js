import React, { useState, useEffect } from "react";
import axios from "axios";
import Compressor from "compressorjs";
import { useForm, FormProvider } from "react-hook-form";
import { Grid, Button, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelIcon from "@material-ui/icons/Cancel";
import cookie from "js-cookie";

import Title from "../Title";
import FormInput from "../../../CheckoutForm/FormInput";

const useStyles = makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  img: {
    maxWidth: "100%",
    height: "100px",
  },
  imgButton: {
    color: "transparent",
    backgroundColor: "transparent",
    borderColor: "transparent",
    padding: 0,
    marginRight: "30px",
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
}));

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

  const AddImageButton = ({ img }) => (
    <Button component="label" variant="contained" className={classes.imgButton}>
      <input
        name="productImage"
        type="file"
        hidden
        multiple
        onChange={fileSelectedHandler}
      />
      <img
        className={classes.img}
        src={!img ? "../../noProduct.jpg" : URL.createObjectURL(img)}
      />
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

  const ListCategory = () =>
    category &&
    category.map((res) => (
      <MenuItem key={res.category_id} value={res.category_id}>
        {res.category}
      </MenuItem>
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
              <ListCategory />
            </FormInput>
          </Grid>
          <Grid item xs={12} sm={12}>
            {!selectedFile.length ||
              selectedFile.map((img) => {
                return <AddImageButton img={img} />;
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

export default AddProductForm;

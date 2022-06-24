import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import SearchInput from "./searchInput";
import { CustomButton } from "../../../../../Utils/customButton";

const useStyles = makeStyles((theme) => ({
  addIcon: {
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "flex-end",
    whiteSpace: "nowrap",
    minWidth: "520px",
  },
  test: {
    "& .MuiOutlinedInput-root": { marginRight: "10px" },
    width: "20ch",
  },
  root: {
    "& .MuiOutlinedInput-root": { marginRight: "10px" },
  },
}));

const SearchBar = ({ showHandler, showForm, searchAction, fetchAll }) => {
  const classes = useStyles();
  const [keyWords, setKeyWords] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { category } = useSelector((state) => ({
    category: state.category.category,
  }));

  useEffect(() => {
    let mount = true;
    console.log("trtr");
    keyWords ? searchAction({ pencarian: keyWords }) : fetchAll();
    return () => (mount = false);
  }, [keyWords]);

  const searchHandler = (e) => {
    e.preventDefault();
    setKeyWords(e.target.value);
  };

  const categoryHandler = useCallback(
    (value) => {
      console.log(value);
      setSelectedCategory(value);
    },
    [selectedCategory]
  );

  const MenuCategory = (props) => (
    <TextField
      // onChange={() => props.onCategoryHandler("test")}
      id="outlined-select-currency"
      select
      label={props.label}
      // value={keyWords}
      // onChange={handleChange}
      // helperText="Please select your currency"
      variant="outlined"
      size="small"
      SelectProps={{
        native: true,
      }}
      className={classes.test}
    >
      {props.menu &&
        props.menu.map((menu) => (
          <option
            onClick={() => props.onCategoryHandler(menu.category_id)}
            key={menu.category}
            value={menu.category_id}
          >
            {menu.category}
          </option>
        ))}
    </TextField>
  );

  return (
    <Grid className={classes.addIcon}>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        size="small"
        value={keyWords}
        className={classes.root}
        onChange={(e) => searchHandler(e)}
      />
      <MenuCategory
        label="Category"
        menu={category}
        onCategoryHandler={categoryHandler}
      />
      <MenuCategory
        label="Price"
        menu={[{ category: "High to Low" }, { category: "Low to High" }]}
      />
      <CustomButton
        // className={classes.icon}
        color="primary"
        variant="contained"
        size="medium"
        onClick={showHandler}
      >
        {showForm ? <RemoveIcon /> : <AddIcon />}
        Add Product
      </CustomButton>
    </Grid>
  );
};

export default SearchBar;

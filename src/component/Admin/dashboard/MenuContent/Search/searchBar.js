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

const SearchBar = ({
  showHandler,
  showForm,
  searchAction,
  fetchAll,
  skipPage,
}) => {
  const classes = useStyles();
  const [keyWords, setKeyWords] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortPrice, setSortPrice] = useState(1);

  const { category } = useSelector((state) => ({
    category: state.category.category,
  }));

  useEffect(() => {
    let mount = true;
    console.log("trtr");
    // keyWords
    //   ?
    searchAction({
      pencarian: keyWords,
      category: selectedCategory,
      sort: sortPrice,
      skipPage,
    });
    // : fetchAll();
    return () => (mount = false);
  }, [keyWords, selectedCategory, sortPrice, skipPage]);

  const searchHandler = (e) => {
    e.preventDefault();
    setKeyWords(e.target.value);
  };

  const categoryHandler = useCallback((e) => {
    setSelectedCategory(e.target.value);
  }, []);

  const changePriceHandler = (e) => {
    console.log(e.target.value);
    setSortPrice(e.target.value);
  };

  console.log(selectedCategory);
  const MenuOptions = (props) => (
    <TextField
      onChange={(e) => props.onChangeHandler(e)}
      id="outlined-select-currency"
      select
      label={props.label}
      value={props.keyword}
      // onChange={handleChange}
      // helperText="Please select your currency"
      variant="outlined"
      size="small"
      SelectProps={{
        native: true,
      }}
      className={classes.test}
    >
      {props.optionAll && <option value="0">All</option>}
      {props.menu &&
        props.menu.map((menu) => (
          <option key={menu.category} value={menu.category_id}>
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
      <MenuOptions
        label="Category"
        menu={category}
        onChangeHandler={categoryHandler}
        optionAll="All"
        keyword={selectedCategory}
      />
      <MenuOptions
        label="Price"
        menu={[
          { category: "High to Low", category_id: -1 },
          { category: "Low to High", category_id: 1 },
        ]}
        onChangeHandler={changePriceHandler}
        keyword={sortPrice}
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

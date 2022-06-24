import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Table,
  Link,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Dialog,
  DialogActions,
  Button,
  DialogContent,
  TextField,
  Paper,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

import Title from "../../Title";
import ActionMenu from "../actionMenu";
import { CustomButton } from "../../../../../Utils/customButton";
import AddCategoryForm from "./FormCategory/AddCategoryForm";
import SearchInput from "../Search/searchInput";

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
    justifyContent: "flex-end",
    minWidth: "430px",
  },
  container: {
    minHeight: "300px",
  },
  root: {
    "& .MuiOutlinedInput-root": { marginRight: "10px" },
    "& .MuiButton-root": { textTransform: "lowercase" },
  },
  icon: {},
}));

const Category = React.memo(({ css }) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState();

  const onSearchCategory = (keyword) => {
    axios
      .post("http://localhost:9000/category/search", {
        category: keyword.pencarian,
      })
      .then((response) => {
        console.log(response);
        setCategory(response.data);
      })
      .catch((err) => console.log(err));
  };

  const fetchCategory = () => {
    axios
      .get("http://localhost:9000/category/")
      .then((response) => {
        setCategory(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    let isMounted = true;

    isMounted && fetchCategory();

    return () => (isMounted = false);
  }, []);

  const showHandler = useCallback(() => {
    setShowForm((prevState) => !prevState);
  }, []);

  console.log("category", category);
  return (
    <React.Fragment>
      <Title>Daftar Kategori</Title>
      <Grid className={classes.addIcon}>
        {/* <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          classes={{ root: classes.root }}
        /> */}
        <SearchInput
          root={classes.root}
          searchAction={(keyword) => onSearchCategory(keyword)}
          fetchAll={fetchCategory}
        />
        <CustomButton
          // classes={{ root: classes.root }}
          variant="contained"
          color="primary"
          // size="medium"
          onClick={showHandler}
        >
          {showForm ? <RemoveIcon /> : <AddIcon />}
          Add Category
        </CustomButton>
      </Grid>
      <Paper classes={css.paper}>
        <Grid className={classes.container}>
          <Dialog
            maxWidth="sm"
            open={showForm}
            onClose={showHandler}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogContent>
              //FORM CATEGORY
              <AddCategoryForm classes={classes} />
            </DialogContent>
            <DialogActions>
              <Button onClick={showHandler} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>

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
      </Paper>
    </React.Fragment>
  );
});

export default React.memo(Category);

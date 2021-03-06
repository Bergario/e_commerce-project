import React from "react";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import * as actions from "../../../../store/actions/index";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));

const useStyles = makeStyles(() => ({
  details: {
    fontSize: "12px",
    color: "#797c7c",
    fontWeight: 600,
  },
  edit: {
    fontSize: "12px",
    color: "#d18c36",
    fontWeight: 600,
  },
  delete: {
    fontSize: "12px",
    color: "red",
    fontWeight: 600,
  },
}));

export default function CustomizedMenus({ product }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  //REDUX
  const onEditFormHandler = (product) => {
    dispatch(actions.showEditProductForm(product));
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem className={classes.details}>Details</MenuItem>
        <MenuItem
          className={classes.edit}
          onClick={() => onEditFormHandler(product)}
        >
          Edit
        </MenuItem>
        <MenuItem className={classes.delete} onClick={handleClose}>
          Delete
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

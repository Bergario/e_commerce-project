import React from "react";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    backgroundColor: "transparent",
  },
})((props) => (
  <Menu
    // elevation={0}
    // getContentAnchorEl={null}
    // anchorOrigin={{
    //   vertical: "center",
    //   horizontal: "center",
    // }}
    // transformOrigin={{
    //   vertical: "top",
    //   horizontal: "center",
    // }}
    style={{ top: "10px" }}
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
  actionPapper: {},
}));

export default function CustomizedMenus({ showMenuAction, index }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  const dispatch = useDispatch();

  //REDUX
  //   const onEditFormHandler = (product) => {
  //     dispatch(actions.showEditProductForm(product));
  //     setAnchorEl(null);
  //   };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  console.log(showMenuAction, index);

  return (
    <>
      {/* <IconButton> */}
      <MoreHorizIcon
        aria-hiddden={false}
        color="action"
        onClick={handleClick}
        style={{
          position: "absolute",
          right: "5%",
          display: showMenuAction == index || "none",
          cursor: "pointer",
        }}
      />
      {/* </IconButton> */}
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        // open="true"
        onClose={handleClose}
        className={classes.actionPapper}
      >
        <MenuItem className={classes.details}>Details</MenuItem>
        <MenuItem
          className={classes.edit}
          //   onClick={() => onEditFormHandler(product)}
        >
          Edit
        </MenuItem>
        <MenuItem className={classes.delete} onClick={handleClose}>
          Delete
        </MenuItem>
      </StyledMenu>
    </>
  );
}

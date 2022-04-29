import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Popover from "@material-ui/core/Popover";

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

const CustomizedMenus = ({ children, anchor }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(anchor);

  useEffect(() => {
    setAnchorEl(anchorEl);
  }, [anchor]);

  console.log(anchor);
  const handleOpen = () => {
    setAnchorEl(anchor);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  //   console.log(open);

  return (
    <div>
      {children}
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        anchorEl={anchorEl}
        // keepMounted
        disableRestoreFocus
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        // onMouseLeave={handleClose}
      >
        <MenuItem className={classes.details}>Details</MenuItem>
        <MenuItem className={classes.edit}>Edit</MenuItem>
        <MenuItem className={classes.delete} onClick={handleClose}>
          Delete
        </MenuItem>
      </Popover>
    </div>
  );
};

export default React.memo(CustomizedMenus);

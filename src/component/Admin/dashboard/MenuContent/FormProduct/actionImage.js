import React, { useRef } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { DeleteForever, Edit } from "@material-ui/icons";

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
    style={{ left: "50px", top: "0px" }}
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

export default function CustomizedMenus({ showMenuAction, index, divRef }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const classes = useStyles();
  // const divRef = useRef();

  const handleClick = (event) => {
    console.log(divRef);
    setAnchorEl(divRef);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
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
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className={classes.actionPapper}
      >
        <MenuItem className={classes.edit}>
          <Edit />
        </MenuItem>
        <MenuItem className={classes.delete} onClick={handleClose}>
          <DeleteForever />
        </MenuItem>
      </StyledMenu>
    </React.Fragment>
  );
}

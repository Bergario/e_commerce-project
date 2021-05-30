import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/actions/index";

const AccountNav = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();
  const dispatch = useDispatch();

  //REDUX
  const onLogout = () => {
    dispatch(actions.logout);
  };

  const { isAuth } = useSelector((state) => ({
    isAuth: state.auth.token !== null,
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let menuItem = (
    <MenuItem component={Link} to="/auth" onClick={handleClose}>
      Login
    </MenuItem>
  );

  if (isAuth)
    menuItem = [
      <MenuItem key="1" onClick={handleClose}>
        Profile
      </MenuItem>,
      <MenuItem key="2" onClick={handleClose}>
        My order
      </MenuItem>,
      <MenuItem key="3" onClick={() => onLogout()}>
        Logout
      </MenuItem>,
    ];

  return (
    <div>
      <IconButton
        aria-label="Show cart item"
        color="inherit"
        onClick={handleClick}>
        <AccountCircle />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        style={{ top: "30px" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}>
        {menuItem}
      </Menu>
    </div>
  );
};

export default AccountNav;

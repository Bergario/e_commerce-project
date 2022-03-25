import React, { useState, useCallback, useMemo } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/actions/index";

const AccountNav = ({ isAuth }) => {
  console.log("accNav rendering...");
  const [anchorEl, setAnchorEl] = useState(null);

  const dispatch = useDispatch();

  const handleClick = useCallback(
    (event) => {
      setAnchorEl(event.currentTarget);
    },
    [anchorEl]
  );

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, [anchorEl]);

  //REDUX
  const onLogout = useCallback(() => {
    console.log("test");
    handleClose();
    return dispatch(actions.logout);
  }, [handleClose]);

  // const { isAuth } = useCallback(
  //   useSelector((state) => ({
  //     isAuth: state.auth.token !== null,
  //   })),
  //   [useSelector]
  // );
  console.log(isAuth);

  let menuItem = useMemo(() => {
    return (
      <MenuItem component={Link} to="/auth/login" onClick={handleClose}>
        Login
      </MenuItem>
    );
  }, []);

  if (isAuth)
    menuItem = [
      <MenuItem key="1" onClick={handleClose}>
        Profile
      </MenuItem>,
      <MenuItem key="2" component={Link} to="/order" onClick={handleClose}>
        My order
      </MenuItem>,
      <MenuItem key="3" onClick={() => dispatch(onLogout())}>
        Logout
      </MenuItem>,
    ];

  return (
    <div>
      <IconButton
        aria-label="Show cart item"
        color="inherit"
        onClick={handleClick}
      >
        <AccountCircle color="action" />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        style={{ top: "30px" }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItem}
      </Menu>
    </div>
  );
};

export default React.memo(AccountNav);

import React, { useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function CustomizedSnackbars({ error }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    error && setOpen(true);
  }, [error]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      {open && (
        <Alert onClose={handleClose} severity={error && "error"}>
          {error && error.email}
        </Alert>
      )}
    </div>
  );
}

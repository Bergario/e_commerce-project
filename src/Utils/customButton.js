import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

export const CustomButton = withStyles({
  root: {
    textTransform: "none",
    height: "40px",
    fontFamily: "system-ui",
  },
})(Button);

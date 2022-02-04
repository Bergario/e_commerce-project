import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    minHeight: "286.5px",
  },

  media: {
    // height: 0,
    // paddingTop: "56.25%",
    cursor: "pointer",
    display: "block",
    margin: "0 auto",
    maxWidth: "100%",
    minHeight: "160px",
    maxHeight: "165px",
  },
  lazyImg: {
    display: "block !important",
  },

  // cardContent: {
  //   display: "flex",
  //   justifyContent: "space-between",
  // },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "Lora",
    fontSize: "0.9rem",
    color: "#272728cc",
    fontWeight: "600",
  },
  price: {
    fontSize: "0.95rem",
    fontWeight: "600",
    color: "#302f38",
  },
  description: {
    fontSize: "0.75rem",
    marginTop: theme.spacing(0),
  },
  // animDiv: {
  //   backgroundColor: "#c7c7c7",
  //   width: "100%",
  //   height: "50px",
  // },
  // animP: {
  //   width: "100px",
  //   height: "5px",
  //   backgroundColor: "#c7c7c7",
  // },
}));

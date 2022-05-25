import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  form: {
    marginTop: theme.spacing(1),
  },
  input: {
    color: "red",
    fontFamily: "system-ui !important",
  },
  img: {
    height: "100px",
    // display: "block",
    // "&:hover": {
    //   transition: 0.5,
    //   opacity: 0.2,
    // },
  },
  AddImage: {
    height: "100px",
    overflow: "hidden",
  },
  imgButton: {
    // color: "transparent",
    backgroundColor: "transparent",
    borderColor: "transparent",
    padding: 0,
    marginRight: "17px",
    position: "absolute",
  },
  ul: {
    listStyleType: "none",
    display: "flex",
  },
  listTags: {
    marginRight: "10px",
    marginBottom: "10px",
    backgroundColor: "#425be5",
    color: "#fff",
    padding: "3px",
    borderRadius: "5px",
    fontSize: "11px",
  },
  closeIcon: {
    fontSize: "0.7rem ",
    cursor: "pointer",
    verticalAlign: "text-bottom",
    marginLeft: "2px",
  },
  addTagsButton: {
    backgroundColor: "#425be5",
    border: "none",
    borderRadius: "3px",
    color: "#fff",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#3651e3",
    },
  },
  inputTags: {
    width: "100%",
    boxSizing: " border-box",
    border: "none",
    paddingBottom: "5px",
    borderBottom: "1px solid #949494",
    "&:focus-visible": {
      outline: "none",
    },
    "&:hover": {
      borderBottom: "2px solid #141313",
    },
    "&:focus": {
      borderBottom: "2px solid #4c5dbd",
    },
  },
  actionImage: {
    position: "absolute",
    bottom: "75%",
    left: "80%",
  },
  overflowImage: {
    overflow: "auto",
    whiteSpace: "nowrap",
    position: "sticky",
    width: "100%",
    minHeight: "100px",
  },
}));

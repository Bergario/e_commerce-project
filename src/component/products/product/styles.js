import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    // maxWidth: "100%",
  },

  media: {
    height: 0,
    paddingTop: "56.25%",
    cursor: "pointer",
  },

  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
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
}));

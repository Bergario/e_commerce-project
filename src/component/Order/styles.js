import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: {
    marginTop: "100px",
  },
  order: {
    margin: "20px auto",
    width: "80%",
    padding: "20px",
    border: "1px solid #eeee",
    borderRadius: "20px",
    minHeight: " 300px",
  },
  button: {
    margin: theme.spacing(1),
    [theme.breakpoints.down("sm")]: {
      minWidth: 32,
      paddingLeft: 8,
      paddingRight: 8,
      borderRadius: 20,
      color: "forestgreen",
    },
  },
  buttonText: {
    [theme.breakpoints.down("sm")]: {
      textTransform: "initial",
    },
  },
  orderItemBox: {
    border: "1px solid #f3f3f3dd",
    padding: "10px",
    borderRadius: "10px",
    marginTop: "10px",
    boxShadow: "4px 5px 10px #eeee",
    color: "#585353",
  },
  labelStatus: {
    padding: "3px",
    borderRadius: "5px",
    background: "#e1f3e1",
    color: "green",
    marginLeft: "10px",
    padding: "3px 10px",
  },
  orderItemDetail: {
    display: "flex",
  },
  imgOrder: {
    width: "100px",
    height: "100px",
    margin: "10px",
  },
  itemContentCol: {
    width: "calc(100% - 180px)",
    borderRight: "1px solid #eeee",
  },
  priceDetail: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    margin: "10px auto",
  },
  buttonDetailTransaksi: {
    textTransform: "initial",
    width: "100%",
    justifyContent: "center",
    color: "forestgreen",
    fontWeight: "700",
  },
}));
